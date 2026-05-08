import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabIcon from './src/components/TabIcon';

// Import screens
import HomeScreen from './src/screens/HomeScreen.js';
import WorkoutScreen from './src/screens/WorkoutScreen.js';
import ProgressScreen from './src/screens/ProgressScreen.js';
import CommunityScreen from './src/screens/CommunityScreen.js';
import ProfileScreen from './src/screens/ProfileScreen.js';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#4A90E2',
            tabBarInactiveTintColor: '#A9A9A9',
            tabBarStyle: {
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: '#eee',
              paddingBottom: 6,
              paddingTop: 6,
              height: 60,
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ focused }) => (
                <TabIcon 
                  source={require('./assets/home.png')} 
                  focused={focused}
                  label="Home"
                />
              ),
            }}
          />
          <Tab.Screen
            name="Workout"
            component={WorkoutScreen}
            options={{
              tabBarLabel: 'Workout',
              tabBarIcon: ({ focused }) => (
                <TabIcon 
                  source={require('./assets/workout.png')} 
                  focused={focused}
                  label="Workout"
                />
              ),
            }}
          />
          <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{
              tabBarLabel: 'Progress',
              tabBarIcon: ({ focused }) => (
                <TabIcon 
                  source={require('./assets/progress.png')} 
                  focused={focused}
                  label="Progress"
                />
              ),
            }}
          />
          <Tab.Screen
            name="Community"
            component={CommunityScreen}
            options={{
              tabBarLabel: 'Community',
              tabBarIcon: ({ focused }) => (
                <TabIcon 
                  source={require('./assets/community.png')} 
                  focused={focused}
                  label="Community"
                />
              ),
              tabBarBadge: '3',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ focused }) => (
                <TabIcon 
                  source={require('./assets/profile.png')} 
                  focused={focused}
                  label="Profile"
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
