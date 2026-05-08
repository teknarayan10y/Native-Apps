import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const PhoneVerification = ({ route, navigation }) => {
    const verificationType = route?.params?.verificationType || "phone" // "phone" or "email"
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendDisabled, setResendDisabled] = useState(false);
  const inputs = useRef([]);

  // Handle OTP input changes
  const handleChange = (text, index) => {
    if (!/^[0-9]?$/.test(text)) return;

    let newOtp = [...otp];
    newOtp[index] = text.trim();
    setOtp(newOtp);

    // Move to next input field
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    // Auto-submit OTP when full 6-digit OTP is entered
    if (newOtp.join("").length === 6) {
      verifyOtp(newOtp.join(""));
    }
  };

  // Handle backspace key
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const verifyOtp = (enteredOtp) => {
    if (enteredOtp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }

    // Replace this with actual API call
    if (enteredOtp === "123456") { // Mock OTP for testing
      Alert.alert("Success", "OTP Verified Successfully!", [
        {
          text: "OK",
          onPress: () => {
            if (verificationType === "phone") {
              navigation.navigate("Home"); // Navigate to Home after phone verification
            } 
          },
        },
      ]);
    } else {
      Alert.alert("Error", "Incorrect OTP. Please try again.");
    }
  };

  // Resend OTP logic
  const resendOtp = () => {
    setResendDisabled(true);
    Alert.alert("OTP Sent", `A new OTP has been sent to your ${verificationType === "phone" ? "phone number" : ""}.`);

    // Enable resend button after 30 seconds
    setTimeout(() => setResendDisabled(false), 30000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to your {verificationType === "phone" ? "phone" : ""}.
      </Text>

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

      <TouchableOpacity style={styles.button} onPress={() => verifyOtp(otp.join(""))}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resendOtp} disabled={resendDisabled}>
        <Text style={[styles.resendText, resendDisabled && styles.disabledResend]}>
          {resendDisabled ? "Wait 30 sec to Resend" : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default PhoneVerification;
