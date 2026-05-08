import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const HomeScreen1 = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  const categories = [
    { id: "1", name: "Pizza", image: require("../assets/pizza.png") },
    { id: "2", name: "Burgers", image: require("../assets/burger.png") },
    { id: "3", name: "Sushi", image: require("../assets/sushi.png") },
    { id: "4", name: "Desserts", image: require("../assets/dessert.png") },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() =>
        item.name === "Pizza"
          ? navigation.navigate("Pizza")
          : navigation.navigate("RestaurantMenuDetails", { category: item.name })
      }
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top-right Dark Mode Toggle */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Text style={styles.themeToggleText}>
            {isDarkMode ? "☀️Light Mode" : "🌙Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome to Food Hub</Text>
      <Text style={styles.subtitle}>Find the best food around you</Text>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.buttonText}>Search for Food</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1e1e1e" : "#fffbf2",
      paddingHorizontal: 20,
      paddingTop: 80,
      alignItems: "center",
    },
    topBar: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 999,
      backgroundColor: isDark ? "#444" : "#ddd",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 20,
      elevation: 5,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    themeToggle: {
      paddingVertical: 2,
      paddingHorizontal: 4,
    },
    themeToggleText: {
      color: isDark ? "#fff" : "#000",
      fontSize: 16,
      fontWeight: "bold",
    },
    title: {
      fontSize: 34,
      fontWeight: "bold",
      color: isDark ? "#ffa07a" : "#ff5733",
      marginBottom: 10,
      textTransform: "uppercase",
      textShadowColor: "rgba(0, 0, 0, 0.2)",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
    },
    subtitle: {
      fontSize: 18,
      color: isDark ? "#ccc" : "#444",
      marginBottom: 25,
      fontStyle: "italic",
    },
    listContainer: {
      alignItems: "center",
      paddingBottom: 20,
    },
    categoryCard: {
      backgroundColor: isDark ? "#2e2e2e" : "#fff",
      borderRadius: 20,
      alignItems: "center",
      padding: 20,
      margin: 10,
      width: 170,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#f0a500",
    },
    categoryImage: {
      width: 100,
      height: 100,
      resizeMode: "contain",
    },
    categoryText: {
      marginTop: 12,
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#333",
      textTransform: "uppercase",
    },
    button: {
      backgroundColor: isDark ? "#ffa07a" : "#ff5733",
      paddingVertical: 16,
      paddingHorizontal: 35,
      borderRadius: 15,
      marginTop: 35,
      shadowColor: "#ff5733",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 7,
      elevation: 8,
      borderWidth: 1,
      borderColor: isDark ? "#333" : "#fff",
    },
    buttonText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "bold",
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },
  });

export default HomeScreen1;
