import { withSessionRoute } from './session'

async function isLoggedIn(req, res)
{
    const user = req.session.user;

    if(!user || user.isLoggedIn === false)
    {
        res.json({ noUser: true }); //TODO: Replace with correct response
    }
    else
    {
        res.json({ noUser: false }); //TODO: Replace with correct response
    }
}

export default withSessionRoute(isLoggedIn);