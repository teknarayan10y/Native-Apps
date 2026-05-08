import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Onboarding3 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/onboarding3.png")} style={styles.image} />
      <Text style={styles.title}>Fast & Secure Delivery</Text>
      <Text style={styles.subtitle}>
        Get your food delivered to your doorstep safely and on time.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.buttonText}>Get Started</Text>
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
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: "#FF5733",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Onboarding3;
