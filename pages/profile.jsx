import useUser from './api/useUser'
import useEvents from './api/useCheckLogin'
import Layout from '../components/Layout'

export default function Profile() {
    // Fetch the user session client-side
    const { user } = useUser({ 
        redirectTo: '/login',
        redirectIfFound: false
    });

    let isLoading = false;
    // Server-render loading state
    if (!user || user.isLoggedIn === false) {
        isLoading = true;
    }

    // Once the user request finishes, show the user
    return (
        <Layout>
          <br/><br/><br/><br/><br/><br/><br/>
          <h1>{ isLoading?"Loading":"Your Profile" }</h1>
          <code>USER: { JSON.stringify(user, null, 2) }</code>
        </Layout>
    )
}