import absoluteUrl from 'next-absolute-url'

const debugOutput = process && process.env.NODE_ENV === "development"; //ONLY SHOW DEBUG INFO ON DEVELOPMENT BUILD

//This API route calls sheets.js to change a users password after they correctly authenticated themselves
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

    //type parameter is optional, but if defined, must be "passChange"
    if ("type" in req.body && req.body.type != "passChange")
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

    const userPassword = req.body.data?.newPassword;

    if (debugOutput)
    {
        console.log("RECEIVED IN PASSRESET.JS:");
        console.log(req.body.data);
    }

    //== CHECK WE CAN'T SET PASSWORD TOO WEAK ==//
    if(userPassword === undefined)
    {
        return res.status(400).json({
            status: "error",
            code: "missingPassword",
            message: "Invalid request, the new password was not provided"
        });
    }

    if(userPassword.length < 8)
    {
        return res.status(400).json({
            status: "error",
            code: "invalidPassword",
            message: "The password must be at least 8 characters in length"
        });
    }

    //== QUERY SHEETS.JS TO CHANGE THE PASSWORD ==//
    const { origin } = absoluteUrl(req);

    const sheetsPayload = {
        type: "changePassword",
        data: {
            email: req.body.data?.email,
            token: req.body.data?.token,
            timestamp: req.body.data?.timestamp,
            entropy: req.body.data?.entropy,
            newPassword: userPassword
        }
    }

    console.log("SHEETS PAYLOAD:");
    console.log(sheetsPayload);

    const resp = await fetch(`${origin}/api/sheets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetsPayload)
    }).then(resp => resp.json());

    console.log("RESPONSE FROM SHEETS AFTER PASS CHANGE:");
    console.log(resp);

    if(resp.code !== "passChangeSuccess")
    {
        if (["tokenExpired", "tokenAuthFailed"].includes(resp.code))
        {
            return res.status(400).json({
                status: "error",
                code: resp.code,
                message: resp.message
            });
        }

        return res.status(400).json({
            status: "error",
            code: "servErr",
            message: "Something went wrong while trying to change your password. Please try again later"
        });
    }

    return res.status(200).json({
        status: "success",
        code: "passChangeSuccess",
        message: "Your account password was successfully changed"
    });
}