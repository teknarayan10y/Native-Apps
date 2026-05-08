import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { useEffect, useRef } from "react";

const Onboarding1 = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
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

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require("../assets/onboarding1.png")} 
        style={[styles.image, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]} 
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Discover New Places</Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>Find the best restaurants, cafes, and bars around you with just a tap.</Animated.Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Onboarding2")}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.skipText}>Skip</Text>
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
    fontSize: 26,
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
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 12,
    marginTop: 30,
    shadowColor: "#FF5733",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  skipText: {
    marginTop: 20,
    color: "#888",
    fontSize: 16,
  },
});

export default Onboarding1;
