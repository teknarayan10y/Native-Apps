import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import Onboarding1 from "./screens/Onboarding1";
import Onboarding2 from "./screens/Onboarding2";
import Onboarding3 from "./screens/Onboarding3";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import PhoneVerification from "./screens/PhoneVerification";
import ChangePassword from "./screens/ChangePassword";

import HomeScreen1 from "./screens/HomeScreen1";
import OTPVerification from "./screens/PhoneVerification1";
import Pizza from "./screens/Pizza";
import CartScreen from "./screens/CartScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import EditProfileScreen from "./screens/Editprofile";
import DeliveryScreen from "./screens/DeliveryScreen";
import PaytmPaymentScreen from "./screens/PaytmPaymentScreen";
import TrackOrderScreen from "./screens/TrackOrderScreen";
import SupportCenter from "./screens/SupportCenter";
import FAQScreen from "./components/FAQScreen";
import FAQDetailScreen from "./components/FAQDetailScreen";
import LiveChat from "./components/LiveChat";
import AboutUs from "./components/AboutUs";
import { ThemeProvider } from "./context/ThemeContext";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// **Move TabNavigator function here**
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4A90E2",
          height: 80,
          justifyContent: "center",
          elevation: 5,
          shadowOpacity: 0.3,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: 1,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          borderTopWidth: 0,
          elevation: 5,
          shadowOpacity: 0.2,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
        tabBarActiveTintColor: "#4A90E2",
        tabBarInactiveTintColor: "#A9A9A9",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen1}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./assets/home.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#4A90E2" : "#A9A9A9",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./assets/search.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#4A90E2" : "#A9A9A9",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrdersScreen}
        options={{
          title: "Orders",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./assets/orders.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#4A90E2" : "#A9A9A9",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./assets/cart.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#4A90E2" : "#A9A9A9",
              }}
            />
          ),
        }}
      />
       <Tab.Screen
        name="Supports"
        component={SupportCenter}
        options={{
          title: "Supports",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./assets/support.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#4A90E2" : "#A9A9A9",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./assets/profile.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#4A90E2" : "#A9A9A9",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerification} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen1" component={HomeScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: false }} />
        <Stack.Screen name="Pizza" component={Pizza} options={{ headerShown: false }} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaytmPaymentScreen" component={PaytmPaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TrackOrderScreen" component={TrackOrderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SupportCenter" component={SupportCenter} options={{ headerShown: false }} />
        <Stack.Screen name="FAQ" component={FAQScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FAQDetail" component={FAQDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LiveChat" component={LiveChat} options={{ headerShown: false }}/>
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
       



        {/* Reference TabNavigator after its declaration */}
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
       
        
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
}
