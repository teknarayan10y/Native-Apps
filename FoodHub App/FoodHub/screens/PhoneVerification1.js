import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

const OTPVerification = ({ navigation, route }) => {
    const { email } = route.params; // Get the email from navigation params
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30); // State for countdown timer
    const inputs = useRef([]);

    // Handle change in OTP input
    const handleChange = (text, index) => {
        // Only allow numeric characters
        if (!/^[0-9]?$/.test(text)) return;

        // Update OTP state
        let newOtp = [...otp];
        newOtp[index] = text.trim();
        setOtp(newOtp);

        // Move focus to next input if not the last
        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }

        // Automatically verify OTP when all 6 digits are entered
        if (newOtp.join("").length === 6) {
            verifyOtp(newOtp.join(""));
        }
    };

    // Handle backspace to focus on previous input
    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
            inputs.current[index - 1].focus();
        }
    };

    // Verify OTP logic
    const verifyOtp = async (enteredOtp) => {
        if (enteredOtp.length !== 6) {
            Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            const response = await axios.post("http://10.10.32.201:5000/api/auth/verify-otp", {
                email, // Use the email from state or props
                otp: enteredOtp,
            });

            if (response.status === 200) {
                Alert.alert("Success", "OTP Verified Successfully!", [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("ChangePassword", { email }), // Pass email to ChangePassword
                    },
                ]);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            if (error.response) {
                Alert.alert("Error", error.response.data.message);
            } else {
                Alert.alert("Error", "An error occurred. Please try again later.");
            }
        }
    };

    // Handle resend OTP
    const resendOtp = async () => {
        try {
            setResendDisabled(true); // Disable the resend button temporarily

            const response = await axios.post("http://10.10.32.201:5000/api/auth/resend-otp", { email });

            if (response.status === 200) {
                Alert.alert("OTP Sent", "A new OTP has been sent to your email.");
                setCountdown(30); // Reset countdown to 30 seconds
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            if (error.response) {
                Alert.alert("Error", error.response.data.message);
            } else {
                Alert.alert("Error", "An error occurred. Please try again later.");
            }
        } finally {
            // Start the countdown
            startCountdown();
        }
    };

    // Start countdown timer
    const startCountdown = () => {
        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(countdownInterval);
                    setResendDisabled(false); // Enable resend button after countdown ends
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000); // Update countdown every 1 second
    };

    // Render OTP input fields
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify Email OTP</Text>
            <Text style={styles.subtitle}>Enter the 6-digit OTP sent to your email.</Text>

            {/* OTP input boxes */}
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputs.current[index] = ref)}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                    />
                ))}
            </View>

            {/* Verify button */}
            <TouchableOpacity style={styles.button} onPress={() => verifyOtp(otp.join(""))}>
                <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>

            {/* Resend OTP button */}
            <TouchableOpacity onPress={resendOtp} disabled={resendDisabled}>
                <Text style={[styles.resendText, resendDisabled && styles.disabledResend]}>
                    {resendDisabled ? `Wait ${countdown}s to Resend` : "Resend OTP"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#FF5733",
    width: "80%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendText: {
    marginTop: 15,
    fontSize: 16,
    color: "#FF5733",
    fontWeight: "bold",
  },
  disabledResend: {
    color: "#aaa",
  },
});

export default OTPVerification;
