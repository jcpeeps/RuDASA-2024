//This page can be used for debugging user session data
//or optionally extended to show a users profile information
//(though functionality to edit profile data will need to be added through sheets.js)

import useUser from './api/useUser'
import Layout from '../components/Layout'

export default function Profile() {
    // Fetch the user session client-side
    const { user } = useUser({
        redirectTo: '/login',
        redirectIfFound: false //Set to true to prevent instant redirect when not signed in
    });

    let isLoading = false;
    // Server-render loading state
    if (!user || user.isLoggedIn === false) {
        isLoading = true;
    }

    // Once the user request finishes, show the user session object as JSON
    return (
        <Layout>
          <br/><br/><br/><br/><br/><br/><br/>
          <h1>{ isLoading?"Loading":"Your Profile" }</h1>
          <code>USER: { JSON.stringify(user, null, 2) }</code>
        </Layout>
    )
}