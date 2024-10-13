import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: "./.env" });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendTestEmail = async () => {
  const msg = {
    to: "tsehaosu@gmail.com", // Change to your recipient
    from: "eastinsu55@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
    return { success: true, message: "Email sent" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
