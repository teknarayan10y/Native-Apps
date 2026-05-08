import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const TrackOrderScreen = ({ navigation }) => {
  const [orderStatus, setOrderStatus] = useState("Preparing");
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = ["Preparing", "Out for Delivery", "Delivered"];

  useEffect(() => {
    const interval = setInterval(() => {
      if (statusIndex < statuses.length - 1) {
        setStatusIndex((prevIndex) => prevIndex + 1);
        setOrderStatus(statuses[statusIndex + 1]);
      } else {
        clearInterval(interval);
      }
    }, 5 * 60 * 1000); // 5 minutes interval

    return () => clearInterval(interval);
  }, [statusIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚚 Track Your Order</Text>

      <Image source={require("../assets/delivery.png")} style={styles.image} />

      <Text style={styles.status}>📌 Current Status: {orderStatus}</Text>

      <View style={styles.progressContainer}>
        {statuses.map((status, index) => (
          <View key={index} style={styles.progressStep}>
            <View style={[styles.circle, statusIndex >= index && styles.activeCircle]} />
            <Text style={[styles.statusText, statusIndex >= index && styles.activeText]}>{status}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={() => alert("Order Canceled!")}>
        <Text style={styles.cancelButtonText}>❌ Cancel Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.backButtonText}>🏠 Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5733",
    marginBottom: 20,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  activeCircle: {
    backgroundColor: "#FF5733",
  },
  statusText: {
    fontSize: 16,
    color: "#999",
  },
  activeText: {
    color: "#333",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TrackOrderScreen;
