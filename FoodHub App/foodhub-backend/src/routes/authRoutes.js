const express = require("express");
const { signup, signin, getProfile } = require("../controllers/userController");
const {sendOtp} = require("../controllers/forgotPasswordController");
const otpController = require("../controllers/otpController");
const { changePassword } = require("../controllers/otpController");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");


const router = express.Router();

// Sign-up route
router.post("/signup", upload.single("profileImage"), signup);

// Sign-in route
router.post("/signin", signin);
//Forgot password route
router.post("/forgot-password", sendOtp);
//otp verification route
router.post("/register", otpController.register);
router.post("/verify-otp", otpController.verifyOtp);
router.post("/resend-otp", otpController.resendOtp);
//reset passoword route
router.post("/change-password", changePassword);

//Profile route

router.get('/profile', auth, getProfile);





module.exports = router;