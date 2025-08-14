
import nodemailer from 'nodemailer';
const { google } = require("googleapis");

export interface UserPreference {
    user_id: string; // or mongoose.Types.ObjectId if you import it
    notifications: {
        email_enabled: boolean;
        sms_enabled: boolean;
        push_enabled: boolean;
    };
    privacy: {
        profileVisibility: 'public' | 'private' | 'friends';
        dataSharing: boolean;
    };
    timezone: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NotificationEvent {
    user_id: string; // or mongoose.Types.ObjectId
    type: 'login' | 'logout' | 'reminder' | 'otp' | 'signup' | 'update_profile' | 'delete_account';
    method: 'email' | 'sms' | 'push';
    status: 'success' | 'queued' | 'failure' | 'pending';
    metadata: Record<string, any>;
    sent_at?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}


const OAuth2 = google.auth.OAuth2;
//const asyncHandler = require("express-async-handler");


const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

//Get an access token
async function getAccessToken() {
  const accessToken = await oauth2Client.getAccessToken();
  return accessToken.token;
}



export const sendEmail = async (event: NotificationEvent, prefs: UserPreference) => {
  const transport = nodemailer.createTransport({
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
  } catch(error) {
    console.log("Failed to send email: ", error);
    throw error; // <-- Rethrow so caller can handle/log it
  }
};