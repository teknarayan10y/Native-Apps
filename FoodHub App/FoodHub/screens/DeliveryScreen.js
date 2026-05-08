import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const DeliveryScreen = ({ route, navigation }) => {
  const {
    cart = [],
    discount = 0,
    promoCode = "",
    updateCart,
  } = route.params || {};

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const DELIVERY_CHARGE = 50;

  // Calculate totals
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const discountedPrice = totalPrice - discount;
  const grandTotal = discountedPrice + DELIVERY_CHARGE;

  // Handle placing order
  const placeOrder = () => {
    if (!name.trim() || !address.trim() || !phone.trim()) {
      Alert.alert("Error", "Please fill in all delivery details.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert("Invalid Phone", "Please enter a valid 10-digit phone number.");
      return;
    }

    const orderDetails = {
      name,
      address,
      phone,
      items: cart,
      total: grandTotal,
      promoCode: promoCode || null,
      discount,
      status: "Placed",
    };

    Alert.alert("Order Placed", "Your order has been placed successfully!", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("OrdersScreen", { order: orderDetails });
          updateCart?.([]); // Reset cart if function is passed
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚚 Delivery Details</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Full Name (e.g., John Doe)"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Address (e.g., 123 Main St, City, Country)"
        placeholderTextColor="gray"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number (e.g., 9876543210)"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.quantity}>Qty: {item.quantity || 1}</Text>
              <Text style={styles.price}>
                ₹{item.price} x {item.quantity || 1} = ₹
                {(item.price * (item.quantity || 1)).toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Totals */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Subtotal: ₹{totalPrice.toFixed(2)}</Text>
        {discount > 0 && (
          <Text style={styles.discountText}>
            - Discount ({promoCode}): ₹{discount.toFixed(2)}
          </Text>
        )}
        <Text style={styles.deliveryCharge}>
          + Delivery Charge: ₹{DELIVERY_CHARGE}
        </Text>
        <View style={styles.separator} />
        <Text style={styles.grandTotal}>
          Grand Total: ₹{grandTotal.toFixed(2)}
        </Text>
      </View>

      {/* Place Order */}
      <TouchableOpacity style={styles.orderButton} onPress={placeOrder}>
        <Text style={styles.orderButtonText}>✅ Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#ff5733",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: { width: 60, height: 60, marginRight: 10, borderRadius: 10 },
  itemDetails: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  quantity: { fontSize: 16, color: "#666" },
  price: { fontSize: 16, color: "#e67e22", fontWeight: "bold" },
  totalContainer: { alignItems: "center", marginVertical: 15 },
  totalText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  discountText: { fontSize: 16, color: "green", fontWeight: "bold" },
  deliveryCharge: { fontSize: 16, color: "#555" },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "80%",
    marginVertical: 5,
  },
  grandTotal: { fontSize: 22, fontWeight: "bold", color: "#ff5733" },
  orderButton: {
    backgroundColor: "#ff5733",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  orderButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default DeliveryScreen;
