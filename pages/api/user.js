import { withSessionRoute } from './session'

async function userRoute(req, res) {
  res.send({ user: req.session.user });

  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      login: '',
      email: '',
      avatarUrl: '',
    })
  }
}

export default withSessionRoute(userRoute);