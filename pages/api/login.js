import { withSessionRoute } from '../../lib/session'
import absoluteUrl from 'next-absolute-url'

async function loginRoute(req, res) {
    const data = await req.body;
    //data: { email: "...", password: "..." }

    const { origin } = absoluteUrl(req);
    //origin: "http://localhost:3000" OR "https://rudasa.org.za"

    // console.log("GOT DATA IN LOGIN.JS:\n" + JSON.stringify(data));
    
    //===== PERFORM AUTHENTICATION VIA SHEETS.JS =====//
    const sheetsPayload = {
        type: "login",
        data: {
            //State all properties explicitly to prevent json injection attacks
            email: data.email,
            password: data.password
        }
    }

    // console.log(origin);

    const resp = await fetch(`${origin}/api/sheets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetsPayload)
    }).then(resp => resp.json());

    // console.log("RESPONSE FROM SHEETS.JS:");
    // console.log(JSON.stringify(resp));

    //===== SAVE SESSION DATA IF VALID LOGIN =====//
    try {
        if(resp.status == "success" && resp.code == "loginSuccess")
        {
            //Update session
            const sessionUser = {
                status: "success",
                email: data.email,
                isLoggedIn: true
            }

            //Save user session
            req.session.user = sessionUser;
            await req.session.save();

            res.json(sessionUser); //IMPORTANT
        }
        else
        {
            res.json({
                status: "failed",
                isLoggedIn: false,
                code: resp.code,
                message: resp?.message
            });
        }

    } catch (error) {
        res.json({
            status: "failed",
            isLoggedIn: false,
            code: "sessionFail"
        });
    }
}

export default withSessionRoute(loginRoute);