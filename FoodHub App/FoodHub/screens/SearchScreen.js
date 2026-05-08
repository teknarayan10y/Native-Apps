import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const foodItems = [
  { id: "1", name: "Margherita Pizza", image: require("../assets/margherita.png") },
  { id: "2", name: "Pepperoni Pizza", image: require("../assets/pepperoni.png") },
  { id: "3", name: "Cheeseburger", image: require("../assets/burger.png") },
  { id: "4", name: "Sushi Roll", image: require("../assets/sushi.png") },
  { id: "5", name: "Chocolate Cake", image: require("../assets/dessert.png") },
];

const SearchScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(foodItems);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = foodItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate("RestaurantMenuDetails", { food: item.name })}
    >
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food..."
        placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#fff",
      padding: 20,
    },
    searchBar: {
      height: 50,
      backgroundColor: isDarkMode ? "#333" : "#ddd",
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      marginBottom: 20,
      color: isDarkMode ? "#fff" : "#000",
    },
    listContainer: {
      paddingBottom: 20,
    },
    itemCard: {
      backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
      padding: 15,
      borderRadius: 15,
      marginBottom: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
      borderWidth: 1,
      borderColor: isDarkMode ? "#444" : "#ffcc80",
    },
    itemImage: {
      width: 100,
      height: 100,
      resizeMode: "contain",
    },
    itemName: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
      color: isDarkMode ? "#fff" : "#333",
    },
  });

export default SearchScreen;
