import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from "react-native";

const EditProfileScreen = ({ navigation, route }) => {
  const [name, setName] = useState(route.params?.name || "John Doe");
  const [email, setEmail] = useState(route.params?.email || "johndoe@example.com");

  const handleSave = () => {
    Alert.alert("Profile Updated", "Your changes have been saved successfully!", [
      { text: "OK", onPress: () => navigation.navigate("ProfileScreen", { name, email }) }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Edit Profile</Text>
      </View>

      {/* Profile Picture */}
      <TouchableOpacity onPress={() => Alert.alert("Feature Coming Soon!", "Profile picture update will be added later.")}>
        <Image source={require("../assets/pizza.png")} style={styles.profileImage} />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      {/* Input Fields */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />

      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSave} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  header: {
    width: "100%",
    backgroundColor: "#4A90E2",
    paddingVertical: 18,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#4A90E2",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  changePhotoText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 10,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: "#ff5733",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    width: "85%",
    alignItems: "center",
    shadowColor: "#ff5733",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
    transform: [{ scale: 1 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default EditProfileScreen;
