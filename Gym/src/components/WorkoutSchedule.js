import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WorkoutSchedule = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const weekDays = [
    { id: 1, name: 'Mon', date: '12' },
    { id: 2, name: 'Tue', date: '13' },
    { id: 3, name: 'Wed', date: '14' },
    { id: 4, name: 'Thu', date: '15' },
    { id: 5, name: 'Fri', date: '16' },
    { id: 6, name: 'Sat', date: '17' },
    { id: 7, name: 'Sun', date: '18' },
  ];

  const scheduleData = {
    1: [
      { id: 1, name: 'Chest & Triceps', time: '07:00 AM', duration: '60 min' },
      { id: 2, name: 'Evening Cardio', time: '06:00 PM', duration: '30 min' },
    ],
    3: [
      { id: 3, name: 'Back & Biceps', time: '08:00 AM', duration: '45 min' },
    ],
    5: [
      { id: 4, name: 'Legs & Shoulders', time: '07:30 AM', duration: '60 min' },
    ],
  };

  const renderDayCard = (day) => {
    const hasWorkout = scheduleData[day.id]?.length > 0;
    
    return (
      <TouchableOpacity
        key={day.id}
        style={[
          styles.dayCard,
          selectedDay === day.id && styles.selectedDay,
          hasWorkout && styles.workoutDay
        ]}
        onPress={() => setSelectedDay(day.id)}
      >
        <Text style={[
          styles.dayName,
          selectedDay === day.id && styles.selectedDayText,
          hasWorkout && styles.workoutDayText
        ]}>
          {day.name}
        </Text>
        <Text style={[
          styles.dayDate,
          selectedDay === day.id && styles.selectedDayText,
          hasWorkout && styles.workoutDayText
        ]}>
          {day.date}
        </Text>
        {hasWorkout && (
          <View style={styles.workoutIndicator}>
            <Text style={styles.workoutCount}>
              {scheduleData[day.id].length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderWorkoutItem = (workout) => (
    <View key={workout.id} style={styles.workoutItem}>
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutName}>{workout.name}</Text>
        <View style={styles.workoutMeta}>
          <Icon name="access-time" size={14} color="#666" />
          <Text style={styles.workoutTime}>{workout.time}</Text>
          <Icon name="timer" size={14} color="#666" style={styles.durationIcon} />
          <Text style={styles.workoutDuration}>{workout.duration}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Icon name="more-vert" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Schedule</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Icon name="add" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
      >
        {weekDays.map(renderDayCard)}
      </ScrollView>

      <View style={styles.workoutsContainer}>
        {selectedDay && scheduleData[selectedDay]?.length > 0 ? (
          scheduleData[selectedDay].map(renderWorkoutItem)
        ) : (
          <View style={styles.emptyState}>
            <Icon name="event-busy" size={40} color="#ccc" />
            <Text style={styles.emptyText}>
              No workouts scheduled for this day
            </Text>
            <TouchableOpacity 
              style={styles.addWorkoutButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addWorkoutText}>Add Workout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Workout</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {/* Add workout form would go here */}
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.saveButtonText}>Save Workout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addButton: {
    padding: 5,
  },
  daysContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dayCard: {
    width: 60,
    height: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  selectedDay: {
    backgroundColor: '#2196F3',
  },
  workoutDay: {
    backgroundColor: '#E3F2FD',
  },
  dayName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  dayDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  selectedDayText: {
    color: 'white',
  },
  workoutDayText: {
    color: '#2196F3',
  },
  workoutIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  workoutsContainer: {
    minHeight: 200,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  durationIcon: {
    marginLeft: 15,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  moreButton: {
    padding: 5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  addWorkoutButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addWorkoutText: {
    color: 'white',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutSchedule;