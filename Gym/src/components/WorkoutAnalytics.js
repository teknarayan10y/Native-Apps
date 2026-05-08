import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WorkoutAnalytics = () => {
  // Sample data - in a real app, this would come from a backend
  const weeklyProgress = [
    { day: 'Mon', workouts: 2, duration: 90 },
    { day: 'Tue', workouts: 1, duration: 45 },
    { day: 'Wed', workouts: 2, duration: 75 },
    { day: 'Thu', workouts: 1, duration: 60 },
    { day: 'Fri', workouts: 2, duration: 85 },
    { day: 'Sat', workouts: 1, duration: 50 },
    { day: 'Sun', workouts: 0, duration: 0 },
  ];

  const stats = {
    totalWorkouts: 9,
    totalDuration: 405,
    avgIntensity: 7.5,
    streak: 6,
  };

  const maxDuration = Math.max(...weeklyProgress.map(day => day.duration));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Analytics</Text>
      
      {/* Weekly Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="fitness-center" size={24} color="#2196F3" />
          <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="timer" size={24} color="#4CAF50" />
          <Text style={styles.statValue}>{stats.totalDuration}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="whatshot" size={24} color="#FF9800" />
          <Text style={styles.statValue}>{stats.avgIntensity}</Text>
          <Text style={styles.statLabel}>Intensity</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="flash-on" size={24} color="#F44336" />
          <Text style={styles.statValue}>{stats.streak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      {/* Weekly Progress Graph */}
      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>Weekly Progress</Text>
        <View style={styles.graph}>
          {weeklyProgress.map((day, index) => (
            <View key={index} style={styles.graphColumn}>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: `${(day.duration / maxDuration) * 100}%`,
                      backgroundColor: day.workouts > 0 ? '#2196F3' : '#ddd'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.dayLabel}>{day.day}</Text>
              <Text style={styles.workoutCount}>{day.workouts}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Insights */}
      <View style={styles.insightsContainer}>
        <Text style={styles.insightsTitle}>Weekly Insights</Text>
        <View style={styles.insightCard}>
          <Icon name="trending-up" size={20} color="#4CAF50" />
          <Text style={styles.insightText}>Your workout intensity has increased by 15% this week</Text>
        </View>
        <View style={styles.insightCard}>
          <Icon name="star" size={20} color="#FFC107" />
          <Text style={styles.insightText}>You've maintained a 6-day workout streak!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  graphContainer: {
    marginTop: 20,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  graph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  graphColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 120,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    borderRadius: 10,
    backgroundColor: '#2196F3',
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  workoutCount: {
    fontSize: 10,
    color: '#999',
  },
  insightsContainer: {
    marginTop: 20,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  insightText: {
    marginLeft: 10,
    color: '#666',
    flex: 1,
  },
});

export default WorkoutAnalytics;
