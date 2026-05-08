import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Animated, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|in)$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your full name.");
      return;
    }

    if (!email.trim() || !isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const payload = { name, email, password };

      const response = await axios.post("http://10.10.32.201:5000/api/auth/signup", payload);

      console.log("Response:", response.data);

      if (response.status === 201) {
        const { user, token } = response.data;
        await AsyncStorage.setItem("token", token);
        console.log("Token stored:", token);

        Alert.alert("Success", "User registered successfully!");
        navigation.replace("Home");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);

      if (error.response) {
        console.log("Error Response:", error.response.data);
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fadeAnim = useRef(new Animated.Value(500)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5733" />
      </View>
    );
  }

  return (
    <ImageBackground source={require("../assets/sigup_image.png")} style={styles.container}>
      <View style={styles.container}>
        <Animated.Image
          source={require("../assets/sigup_image.png")}
          style={[styles.image, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        />
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Sign Up</Animated.Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#FF0000"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FF0000"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FF0000"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={{ color: "#FF5733" }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(255, 0, 255, 0.08)",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FF5733",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(128, 0, 128, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#FF0000",
    borderColor: "#ddd",
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "rgba(128, 0, 128, 0.1)",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signInText: {
    marginTop: 24,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default SignUp;