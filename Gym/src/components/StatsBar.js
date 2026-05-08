import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsBar = ({ stats }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{stats.workouts}</Text>
        <Text style={styles.statLabel}>Workouts</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{stats.minutes}</Text>
        <Text style={styles.statLabel}>Minutes</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{stats.calories}</Text>
        <Text style={styles.statLabel}>Calories</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
});

export default StatsBar;
