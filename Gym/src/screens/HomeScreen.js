import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import Timer from '../components/Timer.js';
import Achievements from '../components/Achievements.js';
import WorkoutCard from '../components/WorkoutCard.js';
import StatsBar from '../components/StatsBar.js';
import ExerciseModal from '../components/ExerciseModal.js';
import NutritionTracker from '../components/NutritionTracker.js';
import WorkoutPlanner from '../components/WorkoutPlanner.js';
import WorkoutTips from '../components/WorkoutTips.js';
import WorkoutSchedule from '../components/WorkoutSchedule.js';
import { workouts, achievements } from '../data/workoutData.js';

const HomeScreen = () => {
  const [selectedWorkout, setSelectedWorkout] = React.useState(null);
  const [showScheduleModal, setShowScheduleModal] = React.useState(false);
  const [showProgressModal, setShowProgressModal] = React.useState(false);
  const [weight, setWeight] = React.useState('70');
  const [showExerciseModal, setShowExerciseModal] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = React.useState(null);

  const stats = {
    workouts: 5,
    minutes: 320,
    calories: 1250,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GymFit Pro</Text>
        <Text style={styles.headerSubtitle}>Welcome back, Athlete!</Text>
      </View>

      {/* Stats Component */}
      <StatsBar stats={stats} />

      {/* Workout Schedule */}
      <WorkoutSchedule />

      {/* Nutrition Tracker */}
      <NutritionTracker />

      {/* Workout Tips */}
      <WorkoutTips />

      {/* Workout Planner */}
      <WorkoutPlanner />

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.startButton} onPress={() => setShowScheduleModal(true)}>
          <Text style={styles.startButtonText}>Schedule Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.startButton, styles.progressButton]} onPress={() => setShowProgressModal(true)}>
          <Text style={styles.startButtonText}>Track Progress</Text>
        </TouchableOpacity>
      </View>

      {/* Achievements Component */}
      <Achievements achievements={achievements} />

      {/* Recent Workouts */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        {workouts.slice(0, 3).map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            isSelected={selectedWorkout === workout.id}
            onSelect={(id) => setSelectedWorkout(id === selectedWorkout ? null : id)}
            onExercisePress={(exercise) => {
              setSelectedExercise(exercise);
              setShowExerciseModal(true);
            }}
          />
        ))}
      </View>

      {/* Exercise Modal Component */}
      <ExerciseModal
        visible={showExerciseModal}
        exercise={selectedExercise}
        onClose={() => setShowExerciseModal(false)}
      />

      {/* Schedule Modal */}
      <Modal visible={showScheduleModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Schedule Workout</Text>
            <View style={styles.scheduleForm}>
              {workouts.map((workout) => (
                <TouchableOpacity key={workout.id} style={styles.scheduleOption}>
                  <Text style={styles.scheduleOptionText}>{workout.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowScheduleModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Progress Modal */}
      <Modal visible={showProgressModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Track Progress</Text>
            <View style={styles.progressForm}>
              <Text style={styles.progressLabel}>Current Weight (kg)</Text>
              <TextInput
                style={styles.progressInput}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowProgressModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  progressButton: {
    backgroundColor: '#FF9800',
    marginRight: 0,
    marginLeft: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scheduleForm: {
    marginBottom: 20,
  },
  scheduleOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scheduleOptionText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressForm: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  progressInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default HomeScreen;
