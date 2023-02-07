# Notes for future development

## Getting Started:
The site hosted on *https://rudasa.org.za* is hosted on Vercel (here)[https://vercel.com/jcpeeps/rudasa-7khp].

Some info on environment variables:
- `RUDASA_NOTIFICATION_EMAIL` The email address to receive signup and contact form notifications from site users. (You can change this).
- `MAILER_GMAIL_ADDRESS` The Gmail address controlling the mailer app (DON'T CHANGE THIS).
- `MAILER_FROM_ADDRESS` The email address to send messages from (access to this address must be granted in the settings menu in `MAILER_GMAIL_ADDRESS`'s Gmail webclient)

To run the development server:
```bash
npm run dev
```
(Make sure to copy any important environment variables from Vercel to a `.env.local` if you're working on the backend)

See (here)[https://youtu.be/7N0OcQZFm3Q] for how the Google Sheets API was set up in *pages/api/sheets.js*.

## In the event of `MAILER_REFRESH_TOKEN` expiry:
> If the site contact form or login page ever stops working with the reason "Failed to connect to server" this is the most likely cause.
> This should only ever happen if the site exceeds the token request limit (10 000 req/day), which is unlikely for the time being

### Steps:
1) Log into *admin@rudasa.org.za*'s (Google Account)[https://accounts.google.com]
2) Copy the `MAILER_CLIENT_ID` and `MAILER_CLIENT_SECRET` from the server environment variables.
3) Visit the (Google OAuth 2.0 playground)[https://developers.google.com/oauthplayground]
4) Click the ⚙️ (gear/settings) icon on the top right
5) Check the *User your own OAuth credentials* box
6) Paste in the `MAILER_CLIENT_ID` and `MAILER_CLIENT_SECRET` into their respective boxes
7) On the left hand side panel, under *Step 1*, enter `https://mail.google.com` in the *Input your own scopes* textbox and hit **Authorize APIs**.
8) Proceed through the steps to authorize *Rudasa Mailer*'s access to the *admin@rudasa.org.za*'s Gmail scope.
9) If necessary hit the **Exchange authorization code for tokens** button to generate a new *Refresh token*.
10) Once you've returned to the *OAuth 2.0 Playground* menu, copy the *Refresh token* from *Step 2* or from the *Request/Response* JSON response.
11) Replace the existing `MAILER_REFRESH_TOKEN` variable in Vercel with the newly generated token and redeploy the latest deployment.

### Other useful info:
- The *Rudasa Mailer* Client ID, as well as the Google Sheets service account can be accessed and configured (here)[https://console.cloud.google.com/apis/credentials?project=rudasa-user-system]
- For further info please see (this StackOverflow question)[https://stackoverflow.com/q/66058279]