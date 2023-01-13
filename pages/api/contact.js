const debugOutput = process && process.env.NODE_ENV === "development"; //ONLY SHOW DEBUG INFO ON DEVELOPMENT BUILD
import { transporter, mailerAddress } from '../../config/mailer';

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
    if ( !(req.body?.type in [undefined, "contact"]) )
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

    //== TRY SEND MAIL ==//
    try
    {
        var mailOptions = {
            from: mailerAddress,
            to: mailerAddress, //TODO: Replace with client email
            subject: "Thanks for contacting us!",
            text: "Test email",
            html: `<h1>Hello</h1><p>world<p><br /><code>${JSON.stringify(data)}</code>`
        };

        await transporter.sendMail(mailOptions);

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
        console.log(err);
        return res.status(400).json({
            status: "error",
            code: "servErr",
            message: debugOutput? (e.message ?? "Internal Server Error") : "Internal Server Error (details suppressed)",
            data: {}
        });
    }

    //TODO:
    //Email info@rudasa.org.za
    //Save message to google sheet
}