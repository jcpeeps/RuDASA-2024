//This is the main API endpoint for handling user authentication and signup:
// - Interfaces with Google Sheets to record user information on signup.
// - Checks the Google Sheets 'Users' worksheet to verify whether a user
//   is registered or not.

import { google } from "googleapis";
import { boolean } from "yup";
const bcrypt = require("bcrypt");
const debugOutput = process && process.env.NODE_ENV === "development"; //ONLY SHOW DEBUG INFO ON DEVELOPMENT BUILD
import { transporter, mailerAddress } from '../../config/mailer';

/* Request format:
 Login:
 {
     "type": "login",
     "data": {
         "email": "email@email.com",
         "password": "password1"
     }
 }

 Sign up:
 {
     "type": "signup",
     "data": {
         "email": "email@email.com",
         "password": "password1",
         "fullName": "Some Full Name",
         ...
     }
 }
*/
/* Response format:
  {
    "status": "success",
    "data": {
        "email": "yourEmail@email.com",
        "fullName": "Some Full Name"
    }
  }
*/

export default async function handler(req, res)
{
    if(req.method !== "POST") //Invalid request
    {
        return res.status(405).send({
            status: "error",
            code: "notPost",
            message:"Only POST requests allowed"
        });
    }

    try {
        if(debugOutput)
        {
            console.log("RECEIVED IN SHEETS.JS:");
            console.log(req.body);
        }

        if(!("type" in req.body)) { //Invalid request
            return res.status(400).json({
                status: "error",
                code: "missingType",
                message: "Request must specify the 'type' parameter"
            });
        }

        //===== PREPARE AUTH =====
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
            },
            scopes: [ "https://www.googleapis.com/auth/spreadsheets" ]
        });

        const sheets = google.sheets({
            auth,
            version: "v4"
        });

        const SALT_ROUNDS = 10; //Exponential, number of rounds to use when generating salts
        // const APIKEY_GEN_CONFIG = { method: "string", length: 32 };


        //===== DETERMINE + HANDLE REQUEST TYPE =====
        switch(req.body.type) {
            case "login":
                return await handleLogin(req, req.body.data);
            case "signup":
                return await handleSignup(req, req.body.data);
            case "checkUser":
                return await handleCheckUser(req, req.body.data.email);
            default:
                return res.status(400).json({
                    status: "error",
                    code: "invalidType",
                    message: "Invalid request type"
                });
        }

        //DEPRECATED: Left here for extensibility later on
        async function validateApiKey(email, ip, key) {
            bcrypt.genSalt(SALT_ROUNDS, async (err, salt) => {
                bcrypt.hash((key + process.env.PEPPER), salt, async (err, apiKeyHash) => {

                    //== CHECK FOR KEY HASH IN DB ==
                    const response = await sheets.spreadsheets.values.get({
                        spreadsheetId: process.env.GOOGLE_SHEET_ID,
                        range: "Users!A:A" // Access the entire Users sheet
                    });

                    // See [https://developers.google.com/sheets/api/guides/concepts] for range notation
                });
            });
        }
        
        //Executes an *atomic* Sheets query and returns its result
        //?'s in q are replaced with the fields
        //  q:      "=IF(ISERROR(MATCH(?,Users!A1:A,0)),FALSE, TRUE)"
        //  fields: ["email@email.com"]
        //  row:    "A" //Where to append the query
        async function query(q, fields, row) { //IMPORTANT

            for (let field of fields)
            {
                //Remove all (") and (?) to prevent injection attacks
                const sanitizedField = field.replace(/["?]/g, '');
                //Insert fields into query
                q = q.replace(/\?/, '"' + sanitizedField + '"');
            }

            //== GENERATE QUERY CELL ==
            const response = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                includeValuesInResponse: true,
                range: "Aggregation!" + row + ":" + row,
                valueInputOption: "USER_ENTERED",
                requestBody: { values: [[ q ]] }
            });

            //== CLEAR CELL ==
            try {
                const clearResponse = await sheets.spreadsheets.values.clear({
                    spreadsheetId: process.env.GOOGLE_SHEET_ID,
                    range: response.data.updates.updatedRange,
                    requestBody: {}
                });
            } catch {}

            //== RETURN ==
            try {
                return response.data.updates.updatedData.values[0][0];
            } catch { return null; }
        }

        //Checks if the specified email address is already in the database
        async function checkEmailInDatabase(email) {
            const q = "=IF(ISERROR(MATCH(?,Users!A1:A,0)),FALSE, TRUE)";
            let emailFound = await query(q, [email], "A");
            switch(emailFound) {
                case "TRUE":    return true;
                case "FALSE":   return false;
                default:        return null;
            }
        }

        //Gets the password hash for a specified user, null if not found
        async function getUserPassHash(email) {
            //TODO: Look into sorting sheet by email for faster lookup [https://stackoverflow.com/a/64080877]
            const q = "=IFNA(VLOOKUP(?, Users!A2:B, 2, false), \"!~FAIL~!\")";
            let result = await query(q, [email], "B");
            return (result=="!~FAIL~!"?null:result);
            //result:
            //  $2b$10$asdf...    -> if success
            //  null              -> if not found
        }

        //====== HANDLE LOGIN =====
        async function handleLogin(req, data) {
            if("email" in data && "password" in data)
            {
                //== GET PASSWORD HASH FOR USER ==
                const userHash = await getUserPassHash(data.email);

                //== CHECK PASSWORD ==
                let validPass = "invalidUser";
                if(userHash !== null)
                {
                    // See [https://www.npmjs.com/package/bcrypt]
                    validPass = (await bcrypt.compare(data.password + process.env.PEPPER, userHash))?"success":"invalidPass";
                }

                //== RESPOND ==
                if(validPass == "success") {
                    //== LOGIN SUCCESS ==
                    return res.status(200).json({
                        status: "success",
                        code: "loginSuccess",
                        message: "Login successful",
                        data: {}
                    });
                }
                else if(validPass == "invalidPass") {
                    //== LOGIN FAILED, INCORRECT PASSWORD ==
                    return res.status(200).json({
                        status: "error",
                        code: "invalidPass",
                        message: "An incorrect password was supplied",
                        data: {}
                    });
                }
                else if(validPass == "invalidUser") {
                    //== LOGIN FAILED, USER DOES NOT EXIST ==
                    return res.status(200).json({
                        status: "error",
                        code: "invalidUser",
                        message: "The specified user does not exist",
                        data: {}
                    });
                }
            }

            //== LOGIN FAILED, BAD REQUEST ==
            return res.status(400).json({
                status: "error",
                code: "invalidLogin",
                message: "Invalid login request, must contain both an email and a password",
                data: {}
            });
        }

        //====== HANDLE CHECK USER =====
        //Returns whether the specified user exists
        async function handleCheckUser(req, email) {
            //== CHECK EMAIL EXISTS ==
            const emailExists = await checkEmailInDatabase(email);

            if(emailExists == null) {
                return res.status(400).json({
                    status: "error",
                    code: "dbConnFailed",
                    message: "There was an error processing your request",
                    data: {}
                });
            }

            return res.status(400).json({
                status: "success",
                code: emailExists ? "userExists" : "userNotFound",
                message: emailExists ? "That email belongs to a registered user" : "No existing user has that email",
                data: {
                    email: email,
                    userExists: !!emailExists
                }
            });
        }

        //===== HANDLE SIGNUP =====
        async function handleSignup(req, data) {
            //Check all required fields have been provided in the request
            const REQUIRED_FIELDS = [
                "email",
                "password",
                "firstName",
                "surname",
                "signUpReason",
                "cellNo",
                "country",
                "province",
                "address1",
                "workPlace",
                "district",
                "privacyPolicy"
            ];

            let allFieldsProvided = true;
            for (let f of REQUIRED_FIELDS)
            {
                if(!(f in data) || toString(data[f]).trim() === "")
                {
                    allFieldsProvided = false;
                    if(debugOutput) { console.log(f + " NOT PROVIDED"); }
                    else { break; }
                }
            }

            if(allFieldsProvided) {

                //== CHECK EMAIL NOT TAKEN ==
                const emailExists = await checkEmailInDatabase(data.email);

                if(emailExists == null) {
                    return res.status(400).json({
                        status: "error",
                        code: "dbConnFailed",
                        message: "There was an error processing your request",
                        data: {}
                    });
                }
                if(emailExists) {
                    return res.status(400).json({
                        status: "error",
                        code: "emailTaken",
                        message: "That email already belongs to a registered user",
                        data: {}
                    });
                }

                //== CHECK T&C's ACCEPTED ==//
                if(data["privacyPolicy"] !== true)
                {
                    return res.status(400).json({
                        status: "error",
                        code: "policyRejected",
                        message: "You must accept our value statement and code of conduct to sign up",
                        data: {}
                    });
                }

                //== HASH PASSWORD ==
                bcrypt.genSalt(SALT_ROUNDS, async (err, salt) => {
                    bcrypt.hash((data.password + process.env.PEPPER), salt, async (err, passHash) => {

                        // The values that will be passed into each column in the new row
                        const newRowData = [
                            //General
                            data.email,
                            passHash,
                            data.firstName,
                            data.surname,

                            data.signUpReason,
                            data.cellNo,
                            data.workNo,

                            //Address
                            data.country,
                            data.province,
                            data.address1,
                            data.address2,
                            data.address3,
                            data.workPlace,
                            data.district,

                            //Role
                            data.jobDescription,
                            data.employmentArea,
                            data.workArea,
                            data.professionalNumber,

                            //Club
                            data.clubName,
                            data.uniName,
                            data.externalSupport,
                            data.contactName,
                            data.contactRole,
                            data.contactNo,
                            data.contactEmail,
                            data.supportName,
                            data.privacyPolicy
                        ]

                        //TODO: Handle error response
                        const response = await sheets.spreadsheets.values.append({
                            spreadsheetId: process.env.GOOGLE_SHEET_ID,
                            range: "Users!A2:B2", //First row is the attribute titles
                            valueInputOption: "RAW", //Ensure the data does not get misinterpreted as formulae or anything else
                            requestBody: { values: [ newRowData ] }
                        });

                        //==SEND NOTIFICATION + WELCOME EMAILS==//
                        sendRudasaNotificationEmail(data);
                        sendSignupEmail(data.email, data.signUpReason);


                        //== SIGNUP SUCCESSFUL ==//
                        return res.status(200).json({
                            status: "success",
                            code: "signupSuccess",
                            message: "User successfully added to the database",
                            data: {}
                        });
                    });
                });
            }
            else
            {
                //== SIGNUP FAILED, INVALID REQUEST ==//
                return res.status(400).json({
                    status: "error",
                    code: "invalidSignup",
                    message: "Invalid signup, some required fields were empty",
                    data: {}
                });
            }

        }

        //===== HANDLE LOGOUT =====
        async function handleLogout(data) {
            removeUserSession(data.email);
        }

    }
    catch (e) {
        return res.status(500).send({
            status: "error",
            code: "servErr",
            message: debugOutput? (e.message ?? "Internal Server Error") : "Internal Server Error (details suppressed)",
            data: {}
        });
    }

    //Sends the notification to Rudasa that a new person has signed up
    async function sendRudasaNotificationEmail(data)
    {
        try
        {
            var mailOptions = {
                from: mailerAddress,
                to: process.env.RUDASA_NOTIFICATION_EMAIL,
                subject: "New member signup",
                text: `
                A new member signed up on the site!\n
                Name:\n
                ${data.firstName} ${data.surname}\n
                Email:\n
                ${data.email}\n
                Cell No.:\n
                ${data.cellNo}\n
                Signup Reason:\n
                ${data.signUpReason}
                `,
                html: `
                <!doctype html>
                <html lang="en">
                    <head>
                        <meta name="format-detection" content="email=no"/>
                    </head>
                    <body>
                        <div style="margin: auto; width: 300px; padding: 30px; background-color: white; border: 2px solid #3CD28A; border-radius: 5px">

                            <a href="https://rudasa.org.za">
                                <img src="https://rudasa.org.za/icons/logo.png" style="display: block; margin: auto; width: 200px" alt="RUDASA Logo" />
                            </a>

                            <h1 style="text-align: center">A new member signed up on the site!</h1>

                            <p>
                                <b>Full name:</b><br />
                                <i>${data.firstName} ${data.surname}</i><br />
                                <b>Email:</b><br />
                                <i>${data.email}</i><br />
                                <b>Cell No.:</b><br />
                                <i>${data.cellNo}</i><br />
                                <b>Signup Reason:</b><br />
                                <i>${data.signUpReason}</i><br />
                            </p>

                        </div>
                    </body>
                </html>
                `,
            };

            await transporter.sendMail(mailOptions);

            //== MAIL SENT SUCCESSFULLY ==//
            return {
                status: "success",
                code: "notificationEmailSuccess",
                message: "The notification email was successfully sent",
                data: {}
            };
        }
        catch (e)
        {
            console.log(e);
            return {
                status: "error",
                code: "notificationEmailErr",
                message: debugOutput? (e.message ?? "Notification email failed to send") : "Internal Server Error (details suppressed)",
                data: {}
            };
        }
    }

    async function sendSignupEmail(toEmail, signUpReason)
    {
        try
        {
            var mailOptions = {
                from: mailerAddress,
                to: toEmail.trim(),
                subject: "Welcome to RuDASA!",
                text: `
Welcome to RuDASA!

We are thrilled that you have decided to join our mission of improving the health and well-being of rural communities.

As a member of our organization, you will have access to a wealth of resources and information designed to aid you in all your rural health endeavours:
    ∙ Access to the Google Group Forum which receives daily updates. This is our primary form of communication with members.
    ∙ Access to a provincial Whatsapp Group.
    ∙ Access to the RuDASA Learning Portal [https://rudasa.org.za/portal], filled with useful content covering a wide range of health-related topics.
    ${ signUpReason == "rhc" ?
        `∙ As a registered Rural Health Club student you will be linked to our student reps and student-exclusive Facebook page.` : ""
    }
    ${ signUpReason == "onboarding" ?
        `∙ We'll connect you to our Onboarding for Community Service social media groups (programme runs from January to March).` : ""
    }

Thank you for your support and for being a part of our mission to support the health and vitality of rural communities. We look forward to working with you!

Best,
RuDASA Team


Check out our socials:
    > Facebook: https://www.facebook.com/ruraldoctors
    > Twitter: https://twitter.com/doctors_rural
    > Instagram: https://www.instagram.com/ruraldoctorssa

As a requirement of the POPI Act we are informing you that your contact details will be on the social media groups. Occasionally we share your contact details with other RuDASA members, or in response to requests from our rural partners (RuReSA, RuNurSA, and PACASA) for a contact for a specific rural health issue. We will not give out contact details to people who are not part of these organisations without getting your permission first.

For anymore assistance please contact the Office Co-ordinator at info@rudasa.org.za
                `,
                html: `
                <!doctype html>
                <html lang="en">
                    <head>
                    </head>
                    <body>
                        <div style="margin: auto; width: 300px; padding: 30px; background-color: white; border: 2px solid #3CD28A; border-radius: 5px">

                            <a href="https://rudasa.org.za">
                                <img src="https://rudasa.org.za/icons/logo.png" style="display: block; margin: auto; width: 200px" alt="RuDASA Logo" />
                            </a>

                            <h1 style="text-align: center">Welcome to RuDASA!</h1>

                            <p>
                                We are thrilled that you have decided to join our mission of improving the health and well-being of rural communities.
                            <p>

                            <p>
                                As a member of our organization, you will have access to a wealth of resources and information designed to aid you in all your rural health endeavours:
                                <ul style="padding: 0px; margin: 0px;">
                                    <li> Access to the <i>Google Group Forum</i> which receives daily updates. This is our primary form of communication with members. </li>
                                    <li> Access to a provincial Whatsapp Group. </li>
                                    <li> Access to the RuDASA <a href="https://rudasa.org.za/portal">Learning Portal</a>, filled with useful content covering a wide range of health-related topics.</li>
                                    ${ signUpReason == "rhc" ?
                                        `<li> As a registered <i>Rural Health Club</i> student you will be linked to our student reps and student-exclusive Facebook page. </li>` : ""
                                    }
                                    ${ signUpReason == "onboarding" ?
                                        `<li> We'll connect you to our <i>Onboarding for Community Service</i> social media groups (programme runs from January to March). </li>` : ""
                                    }
                                </ul>
                            </p>


                            <p>
                                Thank you for your support and for being a part of our mission to support the health and vitality of rural communities. We look forward to working with you!
                            </p>

                            <br />

                            Best,<br />
                            <i>RuDASA Team</i>
                            <p><br />

                            <table style="border: none;">
                                <tr>
                                    <td>
                                        <a href="https://www.facebook.com/ruraldoctors">
                                            <img src="https://rudasa.org.za/icons/facebook_small.png" style="display: block; margin: auto; width: 40px" alt="Facebook" />
                                        </a>
                                    </td>
                                    <td>
                                        <a href="https://twitter.com/doctors_rural">
                                            <img src="https://rudasa.org.za/icons/twitter_small.png" style="display: block; margin: auto; width: 40px" alt="Twitter" />
                                        </a>
                                    </td>
                                    <td>
                                        <a href="https://www.instagram.com/ruraldoctorssa">
                                            <img src="https://rudasa.org.za/icons/instagram_small.png" style="display: block; margin: auto; width: 40px" alt="Instagram" />
                                        </a>
                                    </td>
                                <tr>
                            </table>

                            <br />
                            <i style="font-size: 8px; color: grey;">
                            As a requirement of the POPI Act we are informing you that your contact details will be on the social media groups. Occasionally we share your contact details with other RuDASA members, or in response to requests from our rural partners (RuReSA, RuNurSA, and PACASA) for a contact for a specific rural health issue. We will not give out contact details to people who are not part of these organisations without getting your permission first.<br/>

                            For anymore assistance please contact the Office Co-ordinator at info@rudasa.org.za
                            </i>


                        </div>
                    </body>
                </html>
                `,
            };

            await transporter.sendMail(mailOptions);

            //== MAIL SENT SUCCESSFULLY ==//
            return {
                status: "success",
                code: "signupEmailSuccess",
                message: "The signup email was successfully sent",
                data: {}
            };
        }
        catch (e)
        {
            console.log(e);
            return {
                status: "error",
                code: "signupEmailErr",
                message: debugOutput? (e.message ?? "Signup email failed to send") : "Internal Server Error (details suppressed)",
                data: {}
            };
        }
    }
}