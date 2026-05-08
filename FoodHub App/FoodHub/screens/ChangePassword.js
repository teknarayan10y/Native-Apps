import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator 
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Make sure you installed axios: npm install axios

const ChangePassword = ({ navigation, route }) => {
    const { email } = route.params; // Retrieve email from navigation params
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validatePassword = (pwd) => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(pwd);
    };

    const handleChangePassword = async () => {
        if (!password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters, include 1 uppercase, 1 number, and 1 special character.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(""); // Clear errors
        setLoading(true);

        try {
            const response = await axios.post('http://10.10.32.201:5000/api/auth/change-password', {
                email,
                newPassword: password,
                confirmPassword: confirmPassword,
            });

            if (response.data.message === "Password changed successfully.") {
                setLoading(false);
                Alert.alert("Success", "Your password has been changed successfully!", [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("SignIn"),
                    },
                ]);
            } else {
                setLoading(false);
                setError(response.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error('Change password error:', error);
            setLoading(false);
            setError(error.response?.data?.message || "Server error, please try again later.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    placeholderTextColor="gray"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                    <Text style={{ color: showPassword ? "blue" : "gray", fontSize: 18 }}>
                        {showPassword ? "👁️" : "🙈"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm new password"
                    placeholderTextColor="gray"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.icon}>
                    <Text style={{ color: showConfirmPassword ? "blue" : "gray", fontSize: 18 }}>
                        {showConfirmPassword ? "👁️" : "🙈"}
                    </Text>
                </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
                style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
                onPress={handleChangePassword}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Change Password</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f7f7f7",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
    },
    icon: {
      padding: 10,
    },
    button: {
      backgroundColor: "#FF5733",
      width: "80%",
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    errorText: {
      color: "red",
      marginBottom: 10,
      fontSize: 14,
    },
});

export default ChangePassword;
