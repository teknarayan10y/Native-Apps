import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const SupportCenter = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);

  const phoneNumber = "tel:8700920579";
  const email =
    "mailto:teknarayan2456@gmail.com?subject=Support Request&body=Hello, I need help with...";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support Center</Text>
      <Text style={styles.subtitle}>How can we help you?</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("LiveChat")}
      >
        <Text style={styles.optionText}>💬 Live Chat Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => Linking.openURL(phoneNumber)}
      >
        <Text style={styles.optionText}>📞 Call Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => Linking.openURL(email)}
      >
        <Text style={styles.optionText}>📧 Email Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("FAQ")}
      >
        <Text style={styles.optionText}>❓ Frequently Asked Questions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDark ? "#1e1e1e" : "#fff",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: isDark ? "#ffa07a" : "#333",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? "#ccc" : "#666",
      marginBottom: 20,
    },
    option: {
      backgroundColor: isDark ? "#ff6347" : "#FF5733",
      width: "100%",
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      marginVertical: 10,
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ff795e",
    },
    optionText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    backButton: {
      marginTop: 20,
      backgroundColor: isDark ? "#444" : "#333",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    backButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default SupportCenter;
