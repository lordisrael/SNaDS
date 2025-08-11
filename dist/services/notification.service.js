"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
//const asyncHandler = require("express-async-handler");
const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");
oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});
//Get an access token
async function getAccessToken() {
    const accessToken = await oauth2Client.getAccessToken();
    return accessToken.token;
}
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_KEY
    }
});
// export async function sendEmail(event, prefs) {
//   const content = renderTemplate(event.metadata.template, prefs.language);
//   const msg = {
//     to: event.metadata.email,      // destination email
//     from: 'noreply@snads.app',
//     subject: content.subject,
//     html: content.body
//   };
//   return await transporter.sendMail(msg);
// }
const sendEmail = async (event, prefs) => {
    const transport = nodemailer_1.default.createTransport({
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        // service:'gmail',
        // auth: {
        //   user: process.env.EMAIL_USER,
        //   pass: process.env.EMAIL_PASSWORD,
        // },
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "josephisrael206@gmail.com",
            accessToken: await getAccessToken(),
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const emailOptions = {
        from: "noreply@snads.app",
        to: event.metadata.email,
        subject: event.metadata.subject,
        text: event.metadata.message,
    };
    try {
        const result = await transport.sendMail(emailOptions);
        console.log("Email sent successfully");
        return result; // <-- Return the result for further use
    }
    catch (error) {
        console.log("Failed to send email: ", error);
        throw error; // <-- Rethrow so caller can handle/log it
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=notification.service.js.map