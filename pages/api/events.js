import { withSessionRoute } from 'lib/session'
import { Octokit } from 'octokit'

const octokit = new Octokit() //Github API wrapper

async function eventsRoute(req, res) {
  const user = req.session.user //Get session user data

  if (!user || user.isLoggedIn === false) {
    res.status(401).end()
    return
  }

  try {
    const { data: events } =
      await octokit.rest.activity.listPublicEventsForUser({
        username: user.login,
      })

    res.json(events)
  } catch (error) {
    res.status(200).json([])
  }
}

export default withSessionRoute(eventsRoute)