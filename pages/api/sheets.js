import {NextApiRequest, NextApiResponse} from "next";
import {google} from "googleapis";
import generateApiKey from "generate-api-key";
import requestIp from 'request-ip'
import { faBriefcaseClock } from "@fortawesome/free-solid-svg-icons";
const bcrypt = require("bcrypt");

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
         "password": "password1"
     }
 }

 Logout:
 {
    "type": "logout",
    "data": {
        "email": "email@email.com",
        "apiKey": "a1b2c3d4e5f6g7h8i9j0"
    }
 }
*/
/* Response format:
  {
    "status": "success",
    "data": {
        "email": "yourEmail@email.com"
        "apiKey": "yourApiKeyHere"
    }
  }
*/

var loginSessions = [];

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
            scopes: [
                // "https://www.googleapis.com/auth/drive",
                // "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/spreadsheets"
            ]
        });

        const sheets = google.sheets({
            auth,
            version: "v4"
        });

        const SALT_ROUNDS = 10; //Exponential, number of rounds to use when generating salts
        const APIKEY_GEN_CONFIG = { method: "string", length: 32 };
        const clientIp = requestIp.getClientIp(req);


        //===== DETERMINE + HANDLE REQUEST TYPE =====
        switch(req.body.type) {
            case "login":
                return await handleLogin(req.body.data);
            case "signup":
                return await handleSignup(req.body.data);
            default:
                return res.status(400).json({
                    status: "error",
                    code: "invalidType",
                    message: "Invalid request type"
                });
        }

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
        async function query(q, fields, row) {

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

        //Gets the password hash for a specified user
        async function getUserPassHash(email) {
            //TODO: Look into sorting sheet by email for faster lookup
            const q = "=VLOOKUP(?, Users!A2:B, 2, false)";
            let success = await query(q, [email], "B");
            console.log("TEST");
            console.log(success);
        }

        //Creates a new user log in session, and returns the temporary apiKey
        function createUserSession(email) {
            const apiKey = generateApiKey(APIKEY_GEN_CONFIG);
            const newSession = {
                email: email,
                ip: clientIp,
                apiKey: apiKey,
                timestamp: Date.now()
            }
            console.log("USER ADDED TO SESSION:\n" + JSON.stringify(newSession));
            loginSessions.push(newSession);
            return apiKey;
        }
        async function removeUserSession(email) {
            loginSessions = loginSessions.filter(sess => {
                return sess.email === email;
            });
        }

        //====== HANDLE LOGIN =====
        async function handleLogin(data) {
            if("email" in data && "password" in data)
            {
                //== GET PASSWORD HASH FOR USER ==
                const userHash = await getUserPassHash(data.email);

                let validPass = await bcrypt.compare(data.password, userHash);

                if(validPass) {
                    //== RETURN SUCCESS ==
                    return res.status(200).json({
                        status: "success",
                        code: "loginSuccess",
                        message: "Login successful",
                        data: { apiKey: createUserSession(data.email) }
                    });
                }
                else {
                    //== LOGIN FAILED ==
                    return res.status(200).json({
                        status: "error",
                        message: "loginFailed",
                        data: {} //TODO: Return API key + user data
                    });
                }
            }

            return res.status(400).json({
                status: "error",
                code: "invalidLogin",
                message: "Invalid login request, must contain both an email and a password"
            });
        }

        //===== HANDLE SIGNUP =====
        async function handleSignup(data) {
            //Check all required fields have been provided in the request
            const REQUIRED_FIELDS = ["email", "password", "fullName", "signUpReason", "cellNo", "workNo", "country", "province", "address1", "address2", "address3", "workPlace", "district"];
            // const REQUIRED_FIELDS = ["email", "password"];

            let allFieldsProvided = true;
            for (let f of REQUIRED_FIELDS)
            {
                if(!(f in data) || f.trim() == "")
                {
                    console.log(f + " NOT PROVIDED");
                    allFieldsProvided = false;
                    break;
                }
            }

            if(allFieldsProvided) {

                //== CHECK EMAIL NOT TAKEN ==
                const emailExists = await checkEmailInDatabase(data.email);
                console.log(emailExists)
                if(emailExists == null) {
                    return res.status(400).json({
                        status: "error",
                        code: "dbConnFailed",
                        message: "There was an error processing your request"
                    });
                }
                if(emailExists) {
                    return res.status(400).json({
                        status: "error",
                        code: "emailTaken",
                        message: "That email already belongs to a registered user"
                    });
                }

                //== HASH PASSWORD ==
                bcrypt.genSalt(SALT_ROUNDS, async (err, salt) => {
                    bcrypt.hash((data.password + process.env.PEPPER), salt, async (err, passHash) => {

                        // The values that will be passed into each column in the new row
                        const newRowData = [
                            data.email,
                            passHash,
                            data.fullName,
                            data.signUpReason,
                            data.cellNo,
                            data.workNo,
                            data.country,
                            data.province,
                            data.address1,
                            data.address2,
                            data.address3,
                            data.workPlace,
                            data.district
                        ];

                        const response = await sheets.spreadsheets.values.append({
                            spreadsheetId: process.env.GOOGLE_SHEET_ID,
                            range: "Users!A2:B2", //First row is the attribute titles
                            valueInputOption: "RAW",
                            requestBody: { values: [ newRowData ] }
                        });

                        //== RETURN SUCCESS ==
                        return res.status(200).json({
                            status: "success",
                            message: "User successfully added to the database",
                            data: {
                                apiKey: createUserSession(data.email)
                            }
                        });
                    });
                });
            }

            return res.status(400).json({
                status: "error",
                code: "invalidSignup",
                message: "Invalid signup request, not all required fields were provided or some were empty"
            });
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
            message: e.message ?? "Internal Server Error"
        });
    }
}