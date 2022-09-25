import { withSessionRoute } from './session'

async function loginRoute(req, res) {
    //TODO: Get user data from sheets.js
    req.session.user = {
        username: "test user"
    }

    await req.session.save();
    res.send({ ok: true });
}

export default withSessionRoute(loginRoute);