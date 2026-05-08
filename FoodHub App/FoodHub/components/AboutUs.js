import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // ✅ Make sure you have installed vector icons

const AboutUs = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* 🔙 Stylish Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        
<Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Image
        source={require("../assets/about-us-banner.jpg")}
        style={styles.banner}
        resizeMode="cover"
      />

      <Text style={styles.heading}>About Us</Text>

      <Text style={styles.paragraph}>
        Welcome to FoodieExpress! 🍕🍔🥗{"\n\n"}
        We’re your go-to app for satisfying cravings fast. From cozy comfort meals
        to gourmet delights, FoodieExpress ensures taste meets technology!
      </Text>

      <Text style={styles.subheading}>Our Story</Text>
      <Text style={styles.paragraph}>
        Founded in 2021, we started small in New Delhi with a bold dream – to deliver happiness with every meal. Today, FoodieExpress serves thousands of users across India.
      </Text>

      <Text style={styles.subheading}>Why Choose FoodieExpress?</Text>
      <Text style={styles.paragraph}>
        ⭐ 45-min avg. delivery{"\n"}
        ⭐ Real-time order tracking{"\n"}
        ⭐ Multiple payment options incl. UPI & COD{"\n"}
        ⭐ Smart reordering & wishlist features{"\n"}
        ⭐ In-app chat support & help center
      </Text>

      <Text style={styles.subheading}>Core Values</Text>
      <Text style={styles.paragraph}>
        💡 Innovation – We embrace the future{"\n"}
        ❤️ Customer First – Your happiness drives us{"\n"}
        🤝 Trust & Transparency – We deliver what we promise{"\n"}
        🌎 Responsibility – Supporting sustainability & local businesses
      </Text>

      <Text style={styles.subheading}>Our Mission</Text>
      <Text style={styles.paragraph}>
        Deliver joy in every bite – fresh, fast & flawless!
      </Text>

      <Text style={styles.subheading}>Our Vision</Text>
      <Text style={styles.paragraph}>
        To become India’s most trusted food delivery platform.
      </Text>

      <Text style={styles.subheading}>Our Achievements</Text>
      <Text style={styles.paragraph}>
        🏆 5+ orders delivered{"\n"}
      </Text>

      <Text style={styles.subheading}>Customer Testimonials</Text>
      <Text style={styles.paragraph}>
        “Amazing delivery speed and food quality! Highly recommend.” – *Priya S.*{"\n\n"}
        “Best UI among all food apps. Love the offers!” – *Rahul K.*
      </Text>

      <Text style={styles.subheading}>Meet Our Team</Text>
      <Text style={styles.paragraph}>
        👨‍💼 Rohan Mehta – Founder & CEO{"\n"}
        👩‍💻 Ayesha Khan – CTO{"\n"}
        👨‍🎨 Arjun Patel – Head of Design{"\n"}
        👩‍🍳 Sneha Roy – Culinary Partnerships Lead
      </Text>

      <Text style={styles.subheading}>Partner With Us</Text>
      <Text style={styles.paragraph}>
        Are you a restaurant owner or a delivery enthusiast? Join our network and grow with us!{"\n\n"}
        👉 Visit: www.foodieexpress.com/partners
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("SupportCenter")}>
        <Text style={styles.subheading}>Contact Us</Text>
        <Text style={styles.paragraph}>
          📧 Email: support@foodieexpress.com{"\n"}
          📞 Phone: +91-9876543210{"\n"}
          📍 New Delhi, India
        </Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Follow Us</Text>
      <Text style={styles.paragraph}>
        📸 Instagram: @foodieexpress{"\n"}
        👍 Facebook: facebook.com/foodieexpress{"\n"}
        🐦 Twitter: @foodie_express
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: "#FF6B6B",
    fontWeight: "600",
  },
  banner: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 16,
    textAlign: "center",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default AboutUs;
