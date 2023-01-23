import { transporter, mailerAddress } from '../../config/mailer';
import absoluteUrl from 'next-absolute-url'

const debugOutput = process && process.env.NODE_ENV === "development"; //ONLY SHOW DEBUG INFO ON DEVELOPMENT BUILD

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

    const sheetsPayload = {
        type: "checkUser",
        data: { email: userEmail }
    }

    const resp = await fetch(`${origin}/api/sheets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetsPayload)
    }).then(resp => resp.json());

    console.log("RESPONSE FROM SHEETS AFTER PASS RESET REQUEST:");
    console.log(resp);

    if(resp.data.code !== "userExists")
    {
        return res.status(400).json({
            status: "error",
            code: "invalidEmail",
            message: "That email does not correspond to a registered user."
        });
    }

    const resetLink = "https://example.com"

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