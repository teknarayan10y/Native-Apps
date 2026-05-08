import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { achievements } from '../data/workoutData.js';
import Achievements from '../components/Achievements.js';
import WorkoutAnalytics from '../components/WorkoutAnalytics.js';

const ProfileScreen = () => {
  const userStats = {
    name: 'John Doe',
    age: 28,
    weight: '70 kg',
    height: '175 cm',
    goal: 'Build Muscle',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profilePicContainer}>
          <Text style={styles.profileInitials}>
            {userStats.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <Text style={styles.name}>{userStats.name}</Text>
        <Text style={styles.goal}>{userStats.goal}</Text>
      </View>

      {/* User Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.age}</Text>
          <Text style={styles.statLabel}>Age</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.weight}</Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.height}</Text>
          <Text style={styles.statLabel}>Height</Text>
        </View>
      </View>

      {/* Workout Analytics */}
      <WorkoutAnalytics />

      {/* Achievements */}
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <Achievements achievements={achievements} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileInitials: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  goal: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  achievementsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
});

export default ProfileScreen;
