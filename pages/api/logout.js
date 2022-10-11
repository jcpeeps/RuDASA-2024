import { withSessionRoute } from './session'

function logoutRoute(req, res)
{
    req.session.destroy();
    res.json({ isLoggedIn: false });
}

export default withSessionRoute(logoutRoute);