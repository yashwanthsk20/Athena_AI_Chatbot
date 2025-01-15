// Import nodemailer library and SMTP server details from env.js
import nodemailer from "nodemailer";

// Declare global variables for Gmail user and app password, and transporter instance
let USER, APP_PASSWORD, SMTPHOST, SMTPPORT;
let transporter;

/**
 * Configures Gmail user and app password for sending emails.
 * @param {string} gmailId - Gmail user email address.
 * @param {string} googleAppPassword - Gmail app password.
 */
const config = async (
  gmailId,
  googleAppPassword,
  smtpHost = "smtp.gmail.com",
  smtpPort = 465
) => {
  USER = gmailId;
  APP_PASSWORD = googleAppPassword;
  SMTPHOST = smtpHost;
  SMTPPORT = smtpPort;
  console.log(`Configuration successful!`);
  transporter = createTransporter(); // Create transporter instance on config
};

/**
 * Creates and configures a nodemailer transporter.
 * @returns {Object|null} - Nodemailer transporter instance or null if configuration is invalid.
 */
const createTransporter = () => {
  try {
    // Validate user and app password
    if (!USER || !APP_PASSWORD) {
      throw new Error(
        "USER and APP_PASSWORD must be configured using config()"
      );
    }

    // Create and configure nodemailer transporter
    return nodemailer.createTransport({
      host: SMTPHOST,
      port: SMTPPORT,
      secure: true, // Use TLS
      auth: {
        user: USER,
        pass: APP_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

/**
 * Sends an email using the configured transporter.
 * @param {string} [subject="Sent using NodeMailer"] - Email subject.
 * @param {string} [content="Test Email"] - Email content in HTML format.
 * @param {string} sendTo - Email recipient.
 */
const sendEmail = async (
  sendTo,
  subject = "Sent using Mail Sender",
  content = "Test Email"
) => {
  try {
    // If not already configured
    if (!USER || !APP_PASSWORD) {
      throw new Error(
        "USER and APP_PASSWORD must be configured using config()"
      );
    }

    // Verify the connection
    if (transporter) {
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `Attempting to connect to server: ${SMTPHOST} at PORT: ${SMTPPORT}`
          );
          console.log(`Server is ready to send emails from: ${USER}`);
        }
      });
    }

    // Send mail
    transporter.sendMail(
      {
        from: USER,
        to: sendTo,
        subject: subject,
        html: content,
      },
      (err, info) => {
        if (!err) {
          console.log(`Mail sent successfully to ${sendTo} from ${USER}!`);
        }
        // console.log(info?.envelope);
        // console.log(info?.messageId);
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

// Export sendMail and config functions
export { sendEmail, config };
