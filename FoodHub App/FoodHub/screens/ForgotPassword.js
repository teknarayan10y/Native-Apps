import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|in)$/;
        return emailRegex.test(email);
    };

    const sendOtp = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email address.");
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a complete email like 'example@gmail.com'.");
            return;
        }

        try {
            const response = await axios.post("http://10.10.32.201:5000/api/auth/forgot-password", { email });
            if (response.status === 200) {
                Alert.alert("OTP Sent", `An OTP has been sent to ${email}`, [
                    { text: "OK", onPress: () => navigation.navigate("OTPVerification", { email }) },
                ]);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            if (error.response) {
                Alert.alert("Error", error.response.data.message);
            } else {
                Alert.alert("Error", "An error occurred. Please try again later.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
                Enter your email address and we'll send an OTP to reset your password.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={sendOtp}>
                <Text style={styles.buttonText}>Send the OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={styles.signInText}>
                    Remember your password? <Text style={{ color: "#FF5733" }}>Sign In</Text>
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
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#FF5733",
        width: "100%",
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
    signInText: {
        marginTop: 20,
        fontSize: 16,
        color: "#333",
    },
});

export default ForgotPassword;