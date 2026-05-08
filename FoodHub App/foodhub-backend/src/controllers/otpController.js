const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendOTP = require("../utils/emailSender"); // Import sendOTP

// Generate random 6 digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// @route POST /api/auth/register
exports.register = async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) return res.status(400).json({ message: "Email and Name are required" });

    try {
        let user = await User.findOne({ email });
        if (!user) {
            // Create new user
            user = new User({ email, name });
        }

        const otp = generateOTP();
        const expiry = new Date(Date.now() + 30 * 1000);  // 30 seconds expiry

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save();

        // Use sendOTP utility
        await sendOTP(email, otp);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// @route POST /api/auth/verify-otp
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.otp) {
            if (user.password) {
                return res.status(400).json({ message: "Account exists with password. Please login with password." });
            }
            return res.status(400).json({ message: "OTP not found. Please request a new OTP." });
        }

        if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });

        // OTP valid, clear OTP fields
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        // Generate JWT for further steps
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({ message: "OTP verified successfully", token });
    } catch (err) {
        
        res.status(500).json({ message: "Server error" });
    }
};

// @route POST /api/auth/resend-otp
exports.resendOtp = async (req, res) => {
    const { email } = req.body;
    // Log request

    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.otp && user.otpExpiry > new Date()) {
            return res.status(400).json({ message: "OTP is still valid. Please wait until it expires." });
        }

        const otp = generateOTP();
        const expiry = new Date(Date.now() + 30 * 1000); // 30 seconds expiry

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save();

         // Log generated OTP
        await sendOTP(email, otp);  // Send OTP email

        res.status(200).json({ message: "New OTP sent successfully" });
    } catch (err) {
        console.error("Error in resendOtp:", err);
        res.status(500).json({ message: "Server error" });
    }
};






// Change Password Controller
exports.changePassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    // Check if all fields are present
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Email, New Password and Confirm Password are required.' });
    }

    // Check password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Validate password strength (at least 6 characters, 1 uppercase, 1 number, 1 special char)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: 'Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character.' });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save updated user
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Change Password Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};


