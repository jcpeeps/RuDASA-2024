import { transporter, mailerAddress } from '../../config/mailer';

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

    //type parameter is optional, but if defined, must be "contact"
    if ("type" in req.body && req.body.type != "contact")
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

    const data = req.body.data;

    if (debugOutput)
    {
        console.log("RECEIVED IN CONTACT.JS:");
        console.log(data);
    }

    //== CHECK ALL REQUIRED FIELDS AVAILABLE ==//

    const REQUIRED_FIELDS = [ "fullName", "email", "subject", "msg" ];

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

    if (!allFieldsProvided)
    {
        //== CONTACT FAILED, INVALID REQUEST ==//
        return res.status(400).json({
            status: "error",
            code: "missingFields",
            message: "Invalid contact submission, some required fields were empty",
            data: {}
        });
    }

    let textContactSummary = `
    Full name:\n
    ${data.fullName}\n
    Email:\n
    ${data.email}\n
    Subject:\n
    ${data.subject}\n
    Message:\n
    ${data.msg}\n
    `;

    let contactSummary = `
    <b>Full name:</b><br />
    <i>${data.fullName}</i><br />
    <b>Email:</b><br />
    <i>${data.email}</i><br />
    <b>Subject:</b><br />
    <i>${data.subject}</i><br />
    <b>Message:</b><br />
    <i>${data.msg}</i><br />
    `;

    //== TRY SEND MAIL ==//
    try
    {
        //== SEND TO RUDASA ==//
        var rudasaMailOptions = {
            from: mailerAddress,
            to: process.env.RUDASA_NOTIFICATION_EMAIL, //TODO: Replace with rudasa email
            subject: "RUDASA.ORG.ZA CONTACT FORM: " + data.fullName,
            text: `Message received from ${data.fullName}:\n${textContactSummary}`,
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
                            <h1>Message received from ${data.fullName}:</h1><br />
                            ${contactSummary}
                    </div>
                </body>
            </html>
            `,
        };

        await transporter.sendMail(rudasaMailOptions);

        try
        {
            //== SEND RECEIPT TO MESSAGER ==//
            var receiptMailOptions = {
                from: mailerAddress,
                to: data.email.trim(),
                subject: "Thanks for contacting us!",
                text: `Thanks for getting in touch! We'll get back to you shortly.\n${textContactSummary}`,
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

                        <h1 style="text-align: center">Thanks for getting in touch!</h1>
                        <p style="text-align: center">We'll get back to you shortly.<p><br />
                            ${contactSummary}
                        </div>
                    </body>
                </html>
                `,
            };

            await transporter.sendMail(receiptMailOptions);

            //== MAIL SENT SUCCESSFULLY ==//
            return res.status(200).json({
                status: "success",
                code: "contactSuccess",
                message: "The contact form was successfully submitted",
                data: {}
            });
        }
        catch (e)
        {
            console.log(e);
            return res.status(500).json({
                status: "error",
                code: "receiptErr",
                message: debugOutput? (e.message ?? "Receipt message failed to send") : "Internal Server Error (details suppressed)",
                data: {}
            });
        }
    }
    catch (e)
    {
        console.log(e);
        return res.status(500).json({
            status: "error",
            code: "transportErr",
            message: debugOutput? (e.message ?? "Message failed to send to RUDASA") : "Internal Server Error (details suppressed)",
            data: {}
        });
    }

    //TODO:
    //Save message to google sheet
}