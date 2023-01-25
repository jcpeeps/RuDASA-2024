import { transporter, mailerAddress } from '../../config/mailer';
import absoluteUrl from 'next-absolute-url'

const debugOutput = process && process.env.NODE_ENV === "development"; //ONLY SHOW DEBUG INFO ON DEVELOPMENT BUILD

//This API route allows a user to request a password reset, and sends them the necessary authentication token link to do so
export default async function handler(req, res)
{
    //== CHECK REQUEST IS VALID ==//
    if (req.method !== "POST")
    {
        return res.status(405).send({
            status: "error",
            code: "notPost",
            message:"Only POST requests allowed"
        });
    }

    //type parameter is optional, but if defined, must be "passReset"
    if ("type" in req.body && req.body.type != "passReset")
    {
        return res.status(400).json({
            status: "error",
            code: "invalidType",
            message: "Request has an invalid 'type' parameter"
        });
    }

    if (!("data" in req.body))
    {
        return res.status(400).json({
            status: "error",
            code: "missingData",
            message: "Request does not specify the 'data' parameter"
        });
    }

    const userEmail = req.body.data?.email;

    if (debugOutput)
    {
        console.log("RECEIVED IN PASSRESET.JS:");
        console.log(req.body.data);
    }

    if(userEmail === undefined)
    {
        return res.status(400).json({
            status: "error",
            code: "missingEmail",
            message: "Invalid request, no email provided."
        });
    }

    //== CHECK USER ACCOUNT EXISTS VIA SHEETS.JS ==//
    const { origin } = absoluteUrl(req);

    const sheetsPayload_checkUser = {
        type: "checkUser",
        data: { email: userEmail }
    }

    const resp_checkUser = await fetch(`${origin}/api/sheets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetsPayload_checkUser)
    }).then(resp => resp.json());

    console.log("RESPONSE FROM SHEETS AFTER PASS RESET REQUEST:");
    console.log(resp_checkUser);

    if(resp_checkUser.code !== "userExists")
    {
        return res.status(400).json({
            status: "error",
            code: "invalidEmail",
            message: "That email does not correspond to a registered user."
        });
    }


    //== GET PASSWORD RESET TOKEN FROM SHEETS.JS ==//
    const sheetsPayload_getResetToken = {
        type: "getPassResetToken",
        data: { email: userEmail }
    }

    const resp_getResetToken = await fetch(`${origin}/api/sheets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetsPayload_getResetToken)
    }).then(resp => resp.json());

    console.log("RESPONSE FROM SHEETS AFTER GET RESET TOKEN REQUEST:");
    console.log(resp_getResetToken);

    if (resp_getResetToken.code !== "tokenGenSuccess")
    {
        return res.status(400).json({
            status: "error",
            code: "servErr",
            message: "Internal server error (details suppressed)."
        });
    }

    const tokenData = resp_getResetToken.data;

    //== CONSTRUCT PASSWORD RESET LINK ==//
    const resetLink = origin + "/passChange?" + [
        "em=" + encodeURIComponent(tokenData.email),
        "tk=" + tokenData.token,
        "ts=" + tokenData.timestamp,
        "et=" + tokenData.entropy
    ].join("&");

    console.log("RESET LINK GENERATED:");
    console.log(resetLink);

    //== TRY SEND RESET LINK ==//
    try
    {
        //== SEND RECEIPT TO USER ==//
        var receiptMailOptions = {
            from: mailerAddress,
            to: userEmail.trim(),
            subject: "Password Reset Confirmation",
            text: `Hi!\n
A password reset was requested for your account.\n
If you are sure you want to reset your password, please visit [ ${resetLink} ] to complete the process.
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

                    <h1 style="text-align: center">A password reset was requested for your account.</h1>
                    <p style="text-align: center">If you are sure you want to reset your password, please click the link below:<p><br />
                    <p style="text-align: center"><a href="${resetLink}">Reset the password for ${userEmail}.</a><p><br />
                    </div>
                </body>
            </html>
            `,
        };

        await transporter.sendMail(receiptMailOptions);

        //== MAIL SENT SUCCESSFULLY ==//
        return res.status(200).json({
            status: "success",
            code: "resetRequestSuccess",
            message: "The password reset link was sent successfully.",
            data: {}
        });
    }
    catch (e)
    {
        console.log(e);
        return res.status(500).json({
            status: "error",
            code: "transportErr",
            message: debugOutput? (e.message ?? "The reset link failed to send.") : "The reset link failed to send, please try again later.",
            data: {}
        });
    }
}