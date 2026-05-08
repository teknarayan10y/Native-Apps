import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const OrderScreen = ({ route, navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  const defaultOrder = {
    name: "Guest",
    address: "Unknown Address",
    phone: "No Contact",
    items: [],
    total: 0,
    status: "Pending",
  };

  const [order, setOrder] = useState(route.params?.order || defaultOrder);
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    const outForDeliveryTimer = setTimeout(() => {
      setStatus("Out for Delivery");
    }, 1 * 60 * 1000);

    const deliveredTimer = setTimeout(() => {
      setStatus("Delivered");
    }, 10 * 60 * 1000);

    return () => {
      clearTimeout(outForDeliveryTimer);
      clearTimeout(deliveredTimer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Your Order is Placed!</Text>
      <Text style={styles.subtitle}>
        Thank you, {order.name}! Your order will be delivered soon.
      </Text>

      <Text style={styles.sectionTitle}>📍 Delivery Address</Text>
      <Text style={styles.text}>{order.address}</Text>
      <Text style={styles.text}>📞 {order.phone}</Text>

      <Text style={styles.sectionTitle}>🛍️ Ordered Items</Text>
      {order.items.length > 0 ? (
        <FlatList
          data={order.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              {item.image && <Image source={item.image} style={styles.image} />}
              <View style={styles.itemDetails}>
                <Text style={styles.name}>{item.name || "Unnamed Item"}</Text>
                <Text style={styles.quantity}>Qty: {item.quantity || 1}</Text>
                <Text style={styles.price}>
                  ₹{item.price || 0} x {item.quantity || 1} = ₹
                  {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.text}>No items in your order.</Text>
      )}

      <Text style={styles.sectionTitle}>💰 Total: ₹{order.total.toFixed(2)}</Text>
      <Text style={styles.status}>📌 Status: {status}</Text>

      <TouchableOpacity
        style={styles.trackButton}
        onPress={() => navigation.navigate("TrackOrderScreen", { order })}
      >
        <Text style={styles.trackButtonText}>🚚 Track Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? "#121212" : "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
      color: isDark ? "#ffa07a" : "#ff5733",
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 15,
      color: isDark ? "#ccc" : "#555",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 15,
      color: isDark ? "#f0a500" : "#333",
    },
    text: {
      fontSize: 16,
      color: isDark ? "#aaa" : "#666",
      textAlign: "center",
    },
    cartItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: isDark ? "#1e1e1e" : "#f8f8f8",
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ddd",
    },
    image: {
      width: 60,
      height: 60,
      marginRight: 10,
      borderRadius: 10,
    },
    itemDetails: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
    },
    quantity: {
      fontSize: 16,
      color: isDark ? "#aaa" : "#666",
    },
    price: {
      fontSize: 16,
      color: isDark ? "#f39c12" : "#e67e22",
      fontWeight: "bold",
    },
    status: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 15,
      color: isDark ? "#2ecc71" : "#27ae60",
    },
    trackButton: {
      backgroundColor: isDark ? "#2ecc71" : "#27ae60",
      padding: 12,
      borderRadius: 10,
      marginTop: 15,
      alignItems: "center",
    },
    trackButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
  });

export default OrderScreen;
