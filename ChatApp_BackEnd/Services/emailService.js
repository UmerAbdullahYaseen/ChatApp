const nodemailer = require('nodemailer');

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like Yahoo, Outlook, etc.
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables for security
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send a welcome email
const sendWelcomeEmail = (email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email address
        to: email, // Receiver's email
        subject: 'Welcome to Our App!',
        text: `Hi there! Welcome to our application. We’re glad to have you on board!`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendWelcomeEmail;
