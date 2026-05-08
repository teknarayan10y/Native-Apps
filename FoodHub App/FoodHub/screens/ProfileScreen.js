import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../context/ThemeContext";

const ProfileScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  const [userData, setUserData] = useState({ name: "", email: "", image: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Error", "No token found. Please log in again.");
          navigation.replace("SignIn");
          return;
        }

        const res = await fetch("http://10.10.32.201:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Non-JSON response:", await res.text());
          Alert.alert("Error", "Unexpected server response.");
          return;
        }

        const data = await res.json();
        console.log("Fetched user data:", data); // Log data to check image field
        if (res.ok) {
          setUserData(data);
        } else {
          Alert.alert("Error", data.message || "Failed to fetch profile.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        Alert.alert("Error", "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    Alert.alert("Logged Out", "You have been logged out.", [
      { text: "OK", onPress: () => navigation.replace("SignIn") },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff5733" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData.image ? (
        <Image source={{ uri: userData.image }} style={styles.profileImage} />
      ) : (
        <Image
          source={require("../assets/pawan.png")} // Updated path for default image
          style={styles.profileImage}
        />
      )}

      <Text style={styles.name}>{userData.name || "Name not available"}</Text>
      <Text style={styles.email}>{userData.email || "Email not available"}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile", userData)}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("OrderHistory")}
      >
        <Text style={styles.buttonText}>Order History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AboutUs")}
      >
        <Text style={styles.buttonText}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1e1e1e" : "#fff",
      alignItems: "center",
      padding: 20,
      paddingTop: 50,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 15,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? "#ffa07a" : "#333",
    },
    email: {
      fontSize: 16,
      color: isDark ? "#ccc" : "#777",
      marginBottom: 30,
    },
    button: {
      backgroundColor: isDark ? "#ff6347" : "#ff5733",
      padding: 14,
      borderRadius: 10,
      marginVertical: 10,
      width: "80%",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    logoutButton: {
      backgroundColor: "#d9534f",
      padding: 14,
      borderRadius: 10,
      marginTop: 20,
      width: "80%",
      alignItems: "center",
    },
    logoutText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  });

export default ProfileScreen;
