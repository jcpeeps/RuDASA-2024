import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_GMAIL_ADDRESS,
        pass: process.env.MAILER_GMAIL_PASSWORD
    }
});

export const mailerAddress = process.env.MAILER_GMAIL_ADDRESS;