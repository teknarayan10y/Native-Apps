import React, { useContext, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext"; // ✅ Make sure this path is correct

const Pizza = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);

  const pizzas = [
    {
      id: "1",
      name: "Margherita",
      price: 199,
      description: "Classic Margherita with fresh mozzarella, tomatoes, and basil.",
      image: require("../assets/margherita.png"),
    },
    {
      id: "2",
      name: "Pepperoni",
      price: 299,
      description: "A delicious blend of spicy pepperoni and melted cheese.",
      image: require("../assets/pepperoni.png"),
    },
    {
      id: "3",
      name: "BBQ Chicken",
      price: 349,
      description: "Grilled chicken with tangy BBQ sauce and fresh onions.",
      image: require("../assets/bbqchicken.png"),
    },
    {
      id: "4",
      name: "Veggie",
      price: 249,
      description: "A fresh mix of bell peppers, olives, mushrooms, and cheese.",
      image: require("../assets/veggie.png"),
    },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };

  const buyNow = (item) => {
    navigation.navigate("CartScreen", { cart: [item] });
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.name, isDarkMode && styles.textDark]}>{item.name}</Text>
      <Text style={[styles.description, isDarkMode && styles.textDark]}>{item.description}</Text>
      <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton} onPress={() => buyNow(item)}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>Pizza Menu 🍕</Text>

      <FlatList
        data={pizzas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate("CartScreen", { cart })}
      >
        <Text style={styles.cartButtonText}>
          🛒 Go to Cart ({cart.length > 0 ? cart.length : "Empty"})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// 🔥 Styles with Dark Mode support
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#d35400",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ffcc80",
  },
  cardDark: {
    backgroundColor: "#1e1e1e",
    borderColor: "#444",
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  textDark: {
    color: "#fff",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e67e22",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#ff5733",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "#ff5733",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default Pizza;
