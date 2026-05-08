import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WorkoutCard = ({ workout, isSelected, onSelect, onExercisePress }) => {
  return (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => onSelect(workout.id)}
    >
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutName}>{workout.name}</Text>
        <View style={styles.workoutDetails}>
          <Text style={styles.workoutDetail}>⏱ {workout.duration}</Text>
          <Text style={styles.workoutDetail}>🔥 {workout.calories}</Text>
        </View>
        {isSelected && (
          <View style={styles.exerciseList}>
            <Text style={styles.exerciseTitle}>Exercises:</Text>
            {workout.exercises.map((exercise, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exerciseItem}
                onPress={() => onExercisePress(exercise)}
              >
                <Text style={styles.exerciseText}>• {exercise.name}</Text>
                <Text style={styles.exerciseDetail}>
                  {exercise.reps ? `${exercise.sets}x${exercise.reps}` : `${exercise.sets}x${exercise.duration}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  workoutCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutDetails: {
    flexDirection: 'row',
    marginTop: 8,
  },
  workoutDetail: {
    color: '#666',
    marginRight: 15,
  },
  exerciseList: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  exerciseText: {
    color: '#666',
    flex: 1,
  },
  exerciseDetail: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default WorkoutCard;
