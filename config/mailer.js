import nodemailer from "nodemailer";
import { google } from "googleapis";

// See [https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9]
// and [https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1]
// for insight as to how the Gmail OAuth2 system was set up

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.MAILER_CLIENT_ID,
    process.env.MAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" //Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.MAILER_REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken();

export const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        type:           "OAuth2",
        user:           process.env.MAILER_GMAIL_ADDRESS, //Gmail developer account used to create OAuth2 application
        clientId:       process.env.MAILER_CLIENT_ID,
        clientSecret:   process.env.MAILER_CLIENT_SECRET,
        refreshToken:   process.env.MAILER_REFRESH_TOKEN,
        accessToken:    accessToken,
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.on("token", (token) => {
    console.log("A new access token was generated");
});

// REMOVED: This was the old method of authentication for Gmail,
//          left here as a fallback if necessary in the future.
// export const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: process.env.MAILER_GMAIL_ADDRESS,
//         pass: process.env.MAILER_GMAIL_PASSWORD
//     }
// });

export const mailerAddress = process.env.MAILER_FROM_ADDRESS;