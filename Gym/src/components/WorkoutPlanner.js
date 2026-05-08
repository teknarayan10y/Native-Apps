import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WorkoutPlanner = () => {
  const [showModal, setShowModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    notes: '',
  });

  const addExercise = () => {
    if (currentExercise.name) {
      setExercises([...exercises, { ...currentExercise, id: Date.now() }]);
      setCurrentExercise({
        name: '',
        sets: '',
        reps: '',
        weight: '',
        notes: '',
      });
    }
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const saveWorkout = () => {
    // Here you would typically save to storage or backend
    setShowModal(false);
    setWorkoutName('');
    setExercises([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Planner</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.createButtonText}>Create Workout</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Workout</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <TextInput
              style={styles.workoutNameInput}
              placeholder="Workout Name"
              value={workoutName}
              onChangeText={setWorkoutName}
            />

            {exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
                    <Icon name="delete" size={20} color="#F44336" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}kg
                </Text>
                {exercise.notes && (
                  <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
                )}
              </View>
            ))}

            <View style={styles.addExerciseForm}>
              <Text style={styles.formTitle}>Add Exercise</Text>
              <TextInput
                style={styles.input}
                placeholder="Exercise Name"
                value={currentExercise.name}
                onChangeText={(text) => setCurrentExercise({ ...currentExercise, name: text })}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.smallInput]}
                  placeholder="Sets"
                  keyboardType="numeric"
                  value={currentExercise.sets}
                  onChangeText={(text) => setCurrentExercise({ ...currentExercise, sets: text })}
                />
                <TextInput
                  style={[styles.input, styles.smallInput]}
                  placeholder="Reps"
                  keyboardType="numeric"
                  value={currentExercise.reps}
                  onChangeText={(text) => setCurrentExercise({ ...currentExercise, reps: text })}
                />
                <TextInput
                  style={[styles.input, styles.smallInput]}
                  placeholder="Weight (kg)"
                  keyboardType="numeric"
                  value={currentExercise.weight}
                  onChangeText={(text) => setCurrentExercise({ ...currentExercise, weight: text })}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Notes (optional)"
                value={currentExercise.notes}
                onChangeText={(text) => setCurrentExercise({ ...currentExercise, notes: text })}
              />
              <TouchableOpacity style={styles.addButton} onPress={addExercise}>
                <Text style={styles.addButtonText}>Add Exercise</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={[styles.saveButton, !workoutName || exercises.length === 0 ? styles.disabledButton : null]}
            onPress={saveWorkout}
            disabled={!workoutName || exercises.length === 0}
          >
            <Text style={styles.saveButtonText}>Save Workout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  workoutNameInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  exerciseCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  exerciseDetails: {
    color: '#666',
    marginTop: 5,
  },
  exerciseNotes: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  addExerciseForm: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    flex: 0.3,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default WorkoutPlanner;
