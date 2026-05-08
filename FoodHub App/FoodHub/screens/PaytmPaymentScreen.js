import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, PermissionsAndroid, Platform } from "react-native";

const PaytmPaymentScreen = ({ route, navigation }) => {
  const { orderDetails } = route.params;
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true); // iOS permissions handled in `Info.plist`
      }
    };
    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert("QR Code Scanned", `Payment processed for: ${data}`, [
        { text: "OK", onPress: handlePayment }
      ]);
    }
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Payment Successful", "Your Paytm payment was successful!", [
        { text: "OK", onPress: () => navigation.navigate("Order", { order: { ...orderDetails, status: "Paid" } }) }
      ]);
    }, 3000);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay with Paytm 💳</Text>
      <Text style={styles.amount}>Amount: ₹{orderDetails.total.toFixed(2)}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007aff" />
      ) : (
        !scanned ? (
          <View style={styles.scannerContainer}>
            <RNCamera
              style={styles.scanner}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.auto}
              onBarCodeRead={handleBarCodeScanned}
              captureAudio={false} // No audio needed
            />
          </View>
        ) : (
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payText}>Proceed to Paytm</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fffaf0" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  amount: { fontSize: 20, marginBottom: 30, color: "#e67e22" },
  scannerContainer: { width: "100%", height: 300, overflow: "hidden", borderRadius: 10 },
  scanner: { flex: 1, width: "100%" },
  payButton: { backgroundColor: "#007aff", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 12, elevation: 6 },
  payText: { color: "#fff", fontSize: 18, fontWeight: "bold" }
});

export default PaytmPaymentScreen;
