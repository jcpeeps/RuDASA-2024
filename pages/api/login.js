import { withSessionRoute } from './session'

async function loginRoute(req, res) {
    //TODO: Get user data from sheets.js

    //===== WHERE WE SAVE SESSION DATA =====//
    const data = await req.body;
    console.log(JSON.stringify(data));

    req.session.user = {
        status: "success",
        username: "_" + data.username + "_"
    }
    
    await req.session.save();

    res.send({ ok: true });
}

export default withSessionRoute(loginRoute);