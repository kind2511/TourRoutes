const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter (service that sends the email)
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5061ade900a8ab",
      pass: "b253c4d05bddd1",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "TurRuter <turruterNorge@gmail.com>", // Sender's display name and email
    to: options.email, // Recipient email, passed in as an option
    subject: options.subject, // Email subject, passed in as an option
    text: options.message, // Email body, passed in as an option
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
