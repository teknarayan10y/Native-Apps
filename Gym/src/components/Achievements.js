import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Achievements = ({ achievements }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Achievements</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>{achievement.name}</Text>
            <Text style={styles.achievementDesc}>{achievement.description}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(achievement.progress / achievement.total) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{achievement.progress}/{achievement.total}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  achievementCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    width: 200,
    elevation: 2,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
});

export default Achievements;
