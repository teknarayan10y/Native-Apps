import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FAQDetailScreen = ({ route, navigation }) => {
  const { faq } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.questionTitle}>❓ {faq.question}</Text>
        <Text style={styles.answer}>💡 {faq.answer}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4, // Android shadow
    width: "100%",
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  answer: {
    fontSize: 18,
    color: "#555",
    lineHeight: 24,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#FF5252",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
    shadowColor: "#FF5252",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, 
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FAQDetailScreen;
