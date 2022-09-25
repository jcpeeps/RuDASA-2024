import useUser from './api/useUser'
import Layout from '../components/Layout'
import Router from 'next/router';

export default function Profile() {
    //TODO: Redirect to login if user does not exist

    // Fetch the user session client-side
    const { user } = useUser({ 
        redirectTo: '/login',
        redirectIfFound: true
    });

    // let isLoading = false;
    // Server-render loading state
    // if (!user || user.isLoggedIn === false) {
        // Router.push('/login');
        // isLoading = true;
    // }

    // Once the user request finishes, show the user
    return (
        <Layout>
        <br/><br/><br/><br/><br/><br/><br/>
        {/* <h1>{isLoading?"Loading":"Your Profile"}</h1> */}
        <p>{JSON.stringify(user, null, 2)}</p>

        <form
          onSubmit={
            //=============================================================================
            async function handleSubmit(event) {
            event.preventDefault()

            const body = {
              username: event
            }

            try {
                let resp = await fetch('/api/login', { //
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({test: "test"}),
                });

                // mutateUser(resp);
                // JSON.stringify(user, null, 2)} //GET USER SESSION

            //=============================================================================
            } catch (error) {
                console.error('An unexpected error happened:', error);
            }

          }}>

      <label>
        <span>Type your GitHub username</span>
        <input type="text" name="username" required />
      </label>

      <button type="submit">Login</button>

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          padding-bottom: 30px;
          max-width: 200px;
          margin: auto;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding-bottom: 30px;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </form>
        </Layout>
    )
}