import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WorkoutHistory = () => {
  const workoutHistory = [
    {
      id: 1,
      date: '2024-01-15',
      name: 'Full Body Workout',
      duration: '45 min',
      calories: 320,
      exercises: [
        { name: 'Bench Press', sets: 3, reps: '10,10,8', weight: '135 lbs' },
        { name: 'Squats', sets: 4, reps: '12,12,10,10', weight: '185 lbs' },
      ],
      notes: 'Great session, increased weight on squats',
    },
    {
      id: 2,
      date: '2024-01-13',
      name: 'Cardio & Core',
      duration: '30 min',
      calories: 250,
      exercises: [
        { name: 'Running', duration: '20 min', distance: '2.5 miles' },
        { name: 'Planks', sets: 3, duration: '60 sec' },
      ],
      notes: 'Focused on maintaining steady pace',
    },
    {
      id: 3,
      date: '2024-01-11',
      name: 'Upper Body',
      duration: '50 min',
      calories: 280,
      exercises: [
        { name: 'Pull-ups', sets: 3, reps: '8,8,6' },
        { name: 'Shoulder Press', sets: 3, reps: '12,10,10', weight: '95 lbs' },
      ],
      notes: 'Improved pull-up form',
    },
  ];

  const [expandedWorkout, setExpandedWorkout] = React.useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderExerciseDetails = (exercise) => {
    if (exercise.duration) {
      return `${exercise.duration}${exercise.distance ? ` • ${exercise.distance}` : ''}`;
    }
    return `${exercise.sets} sets • ${exercise.reps} reps${exercise.weight ? ` • ${exercise.weight}` : ''}`;
  };

  const renderWorkoutCard = (workout) => {
    const isExpanded = expandedWorkout === workout.id;

    return (
      <TouchableOpacity
        key={workout.id}
        style={[styles.workoutCard, isExpanded && styles.expandedCard]}
        onPress={() => setExpandedWorkout(isExpanded ? null : workout.id)}
        activeOpacity={0.7}
      >
        <View style={styles.workoutHeader}>
          <View style={styles.workoutMeta}>
            <Text style={styles.workoutDate}>{formatDate(workout.date)}</Text>
            <Text style={styles.workoutName}>{workout.name}</Text>
          </View>
          <View style={styles.workoutStats}>
            <View style={styles.statItem}>
              <Icon name="timer" size={16} color="#666" />
              <Text style={styles.statText}>{workout.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="local-fire-department" size={16} color="#666" />
              <Text style={styles.statText}>{workout.calories} cal</Text>
            </View>
          </View>
        </View>

        {isExpanded && (
          <View style={styles.workoutDetails}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            {workout.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {renderExerciseDetails(exercise)}
                </Text>
              </View>
            ))}
            
            {workout.notes && (
              <>
                <Text style={styles.sectionTitle}>Notes</Text>
                <Text style={styles.notes}>{workout.notes}</Text>
              </>
            )}
          </View>
        )}

        <Icon
          name={isExpanded ? 'expand-less' : 'expand-more'}
          size={24}
          color="#666"
          style={styles.expandIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-list" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.historyList}>
        {workoutHistory.map(renderWorkoutCard)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 15,
    padding: 15,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 5,
  },
  historyList: {
    maxHeight: 500,
  },
  workoutCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  expandedCard: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  workoutMeta: {
    flex: 1,
  },
  workoutDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  workoutDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  exerciseItem: {
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  exerciseDetails: {
    fontSize: 13,
    color: '#666',
  },
  notes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  expandIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default WorkoutHistory;
