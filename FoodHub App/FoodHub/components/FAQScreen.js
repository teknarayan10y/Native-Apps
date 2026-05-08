import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";

// Enable animation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQScreen = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    { 
      question: "1📍 How can I track my order?", 
      answer: "To track your order, go to the 'Track Order' section in the app. You will see real-time updates on the status of your order, including when it is being prepared, dispatched, and delivered." 
    },
    { 
      question: "2🚫 Can I cancel my order?", 
      answer: "Yes, you can cancel your order before it is out for delivery. Simply go to 'My Orders', select the order, and tap 'Cancel'. A full refund will be processed based on the payment method used." 
    }, 
    { 
      question: "3💳 What payment methods are accepted?", 
      answer: "We accept multiple payment methods including UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery (COD). Digital wallets may also be available based on location." 
    },
    { 
      question: "4⏳ How long does delivery take?", 
      answer: "Delivery typically takes 30-45 minutes, depending on your location, order volume, and restaurant processing time. You can check estimated delivery time in the 'Track Order' section." 
    },
    { 
      question: "5🚚 Is there a delivery charge?", 
      answer: "Yes, delivery charges vary based on the distance between the restaurant and your location. Some restaurants offer free delivery on orders above a certain amount." 
    },
    { 
      question: "6🔄 Can I return or replace items?", 
      answer: "Yes, if your order arrives with incorrect or damaged items, you can request a return or replacement within 24 hours through 'Help & Support'. A refund or replacement will be processed after verification." 
    },
    { 
      question: "7🔔 How do I get order notifications?", 
      answer: "You will receive real-time SMS and app notifications at each stage of your order, including confirmation, preparation, dispatch, and delivery. Ensure notifications are enabled in your device settings." 
    },
    { 
      question: "8📝 How do I update my address?", 
      answer: "To update your address, go to 'Profile' > 'Manage Addresses' and add, edit, or remove addresses as needed. Ensure you select the correct address before placing an order." 
    },
    { 
      question: "9🛒 Can I change items in my order after placing it?", 
      answer: "Order modifications are possible only before the restaurant confirms it. If you need changes, quickly contact customer support via the app." 
    },
    { 
      question: "10🎁 Do you offer discounts or promo codes?", 
      answer: "Yes! Visit the 'Offers' section for the latest discounts, cashback, and promo codes. You can also apply valid coupons at checkout for extra savings." 
    },
    { 
      question: "11📦 What happens if my order is late?", 
      answer: "If your order is delayed beyond the estimated time, you will receive updates. If the delay is excessive, you may be eligible for compensation or a refund. Check 'Help & Support' for more details." 
    },
  ];

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❓ Frequently Asked Questions</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {faqs.map((faq, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.faqItem, expandedIndex === index && styles.expanded]} 
            onPress={() => navigation.navigate("FAQDetail", { faq })}
            onLayout={()=> toggleExpand(index)}
          >
            <Text style={styles.questionText}>Q: {faq.question}</Text>
            {expandedIndex === index && <Text style={styles.answerText}>A: {faq.answer}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>

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
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  faqItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, 
  },
  expanded: {
    backgroundColor: "#FFEBEE",
    borderColor: "#FF5252",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  answerText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: "#FF5252",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FAQScreen;
