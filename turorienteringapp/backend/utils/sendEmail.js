const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Create a transporter (service that sends the email)
    const transporter = nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        port: 2525,
        auth: {
            user: 'aloshalish35@gmail.com', 
            pass: '0A3FFF439257A12AC46E56135EB46EE50A31'
        }
    });

    // 2) Define email options
    const mailOptions = {
        from: 'Test User <aloshalish35@gmail.com>', // Sender's display name and email
        to: options.email, // Recipient email, passed in as an option
        subject: options.subject, // Email subject, passed in as an option
        text: options.message // Email body, passed in as an option
    };

    // 3) Send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = sendEmail;
