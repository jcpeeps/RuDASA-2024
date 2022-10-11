import { withSessionRoute } from './session'

async function loginRoute(req, res) {
    const data = await req.body;
    //data: { email: "...", password: "..." }

    console.log("GOT DATA IN LOGIN.JS:\n" + JSON.stringify(data));
    
    //TODO: Perform auth via sheets.js
    const sheetsPayload = {
        type: "login",
        ...data
    }

    const resp = fetch('./sheets', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetsPayload)
    }).then(resp => resp.json());

    console.log(resp);

    //===== WHERE WE SAVE SESSION DATA =====//
    try {
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

    } catch (error) {
        res.json({
            status: "failed",
            isLoggedIn: false
        });
    }
}

export default withSessionRoute(loginRoute);