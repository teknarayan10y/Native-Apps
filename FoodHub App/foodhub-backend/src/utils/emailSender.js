const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // You can change this to your email service if needed
        auth: {
            user: process.env.EMAIL_USER,  // Ensure this is your email
            pass: process.env.EMAIL_PASS,  // Ensure this is your email password or app-specific password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,  // Ensure this is the same as your "user"
        to: email,
        subject: 'OTP for Registration',
        text: `Your OTP is: ${otp}. It will expire in 30 seconds.`,
    };

    try {
        console.log("Sending OTP to:", email);  // Debugging log to see email
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully to:", email);  // Success log
    } catch (error) {
        console.error("Error sending OTP:", error);  // Log the error
        throw new Error('Failed to send OTP email');
    }
};

module.exports = sendOTP;
