import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext"; // Adjust path as needed

const CartScreen = ({ route, navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (route.params?.cart) {
      setCart(route.params.cart);
    }
  }, [route.params?.cart]);

  const DELIVERY_CHARGE = 50;
  const PROMO_DISCOUNT = 100;

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const applyPromoCode = () => {
    if (promoCode === "pawan123") {
      setDiscount(PROMO_DISCOUNT);
      Alert.alert("Promo Applied", "₹100 discount applied!");
    } else {
      setDiscount(0);
      Alert.alert("Invalid Promo Code", "Please enter a valid promo code.");
    }
  };

  const openUPI = (orderDetails, upiId, app) => {
    const amount = orderDetails.total.toFixed(2);
    const payeeName = "Food Hub";
    let upiUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;

    if (app === "GPay") {
      upiUrl = `tez://upi/pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;
    } else if (app === "PhonePe") {
      upiUrl = `phonepe://upi/pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;
    }

    Linking.openURL(upiUrl).catch(() =>
      Alert.alert("Error", `Could not open ${app}. Make sure it's installed.`)
    );
  };

  const handlePayment = (method) => {
    if (cart.length === 0) {
      Alert.alert(
        "Cart is Empty",
        "Please add items before proceeding to payment."
      );
      return;
    }

    const orderDetails = {
      name: "John Doe",
      address: "123, Main Street, City",
      phone: "+91 9876543210",
      items: cart,
      total: getTotalPrice() + DELIVERY_CHARGE - discount,
      status: method === "Cash on Delivery" ? "Placed" : "Pending",
      paymentMethod: method,
    };

    if (method === "Cash on Delivery") {
      navigation.navigate("DeliveryScreen", {
        cart,
        discount,
        promoCode,
        updateCart: setCart,
      });
    } else if (method === "GPay") {
      openUPI(orderDetails, "your-upi-id@okicici", "GPay");
      navigation.navigate("DeliveryScreen", { cart, updateCart: setCart });
    } else if (method === "PhonePe") {
      openUPI(orderDetails, "your-upi-id@ybl", "PhonePe");
      navigation.navigate("DeliveryScreen", { cart, updateCart: setCart });
    } else if (method === "Debit Card" || method === "Credit Card") {
      navigation.navigate("CardPaymentScreen", { orderDetails, method });
    }
  };

  const removeItemFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart 🛒</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item, index }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>
                    ₹{item.price} x {item.quantity || 1} = ₹
                    {(item.price * (item.quantity || 1)).toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItemFromCart(index)}
                >
                  <Text style={styles.removeText}>❌</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TextInput
            style={styles.promoInput}
            placeholder="Enter Promo Code"
            value={promoCode}
            onChangeText={setPromoCode}
            placeholderTextColor={isDarkMode ? "#888" : "#999"}
          />
          <TouchableOpacity style={styles.promoButton} onPress={applyPromoCode}>
            <Text style={styles.promoText}>Apply Promo</Text>
          </TouchableOpacity>
          <View style={styles.priceContainer}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalPrice}>₹{getTotalPrice().toFixed(2)}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.totalLabel}>Delivery Charge:</Text>
            <Text style={styles.totalPrice}>₹{DELIVERY_CHARGE}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.totalLabel}>Discount:</Text>
            <Text style={styles.totalPrice}>-₹{discount}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.totalLabelBold}>Grand Total:</Text>
            <Text style={styles.totalPriceBold}>
              ₹{(getTotalPrice() + DELIVERY_CHARGE - discount).toFixed(2)}
            </Text>
          </View>
          <Text style={styles.paymentTitle}>Choose Payment Method 💳</Text>
          {[
            "Cash on Delivery",
            "GPay",
            "PhonePe",
            "Debit Card",
            "Credit Card",
          ].map((method, index) => (
            <TouchableOpacity
              key={index}
              style={styles.paymentButton}
              onPress={() => handlePayment(method)}
            >
              <Text style={styles.paymentText}>
                {method === "Cash on Delivery" ? "🚚" : "💳"} Pay with {method}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
};

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? "#121212" : "#fff",
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 16,
      color: isDarkMode ? "#fff" : "#000",
    },
    emptyText: {
      fontSize: 18,
      textAlign: "center",
      marginTop: 40,
      color: isDarkMode ? "#aaa" : "#333",
    },
    cartItem: {
      flexDirection: "row",
      marginBottom: 12,
      backgroundColor: isDarkMode ? "#1e1e1e" : "#f4f4f4",
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
    },
    image: {
      width: 60,
      height: 60,
      marginRight: 12,
      borderRadius: 8,
    },
    details: {
      flex: 1,
      justifyContent: "center",
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
    },
    price: {
      fontSize: 16,
      color: isDarkMode ? "#ccc" : "#444",
    },
    removeButton: {
      backgroundColor: "#ff4d4d",
      padding: 6,
      borderRadius: 6,
    },
    removeText: {
      color: "#fff",
      fontSize: 14,
    },
    promoInput: {
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
      marginBottom: 5,
      color: isDarkMode ? "#fff" : "#000",
      backgroundColor: isDarkMode ? "#2b2b2b" : "#fff",
    },
    promoButton: {
      backgroundColor: "#28a745",
      padding: 10,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 10,
    },
    promoText: {
      color: "#fff",
      fontWeight: "bold",
    },
    priceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 4,
    },
    totalLabel: {
      fontSize: 16,
      color: isDarkMode ? "#ccc" : "#000",
    },
    totalPrice: {
      fontSize: 16,
      color: isDarkMode ? "#ccc" : "#000",
    },
    totalLabelBold: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
    },
    totalPriceBold: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
    },
    paymentTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
      color: isDarkMode ? "#fff" : "#000",
    },
    paymentButton: {
      backgroundColor: "#007bff",
      padding: 12,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: "center",
    },
    paymentText: {
      color: "#fff",
      fontSize: 16,
    },
  });

export default CartScreen;
