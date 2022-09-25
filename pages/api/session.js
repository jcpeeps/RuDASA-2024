//This file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
//Used in user.js
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
  password: process.env.GLOBAL_SESSION_PASSWORD, //Must be at least 32 chars long
  cookieName: 'rudasa-user-session',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export function withSessionRoute(handler)
{
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler)
{
  return withIronSessionSsr(handler, sessionOptions);
}