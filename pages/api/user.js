import { withSessionRoute } from './session'

async function userRoute(req, res) {
  if (req.session.user)
  {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  }
  else
  {
    res.json({
      isLoggedIn: false,
      username: "",
      email: ""
    });
  }
}

export default withSessionRoute(userRoute);