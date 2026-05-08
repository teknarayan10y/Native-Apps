import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WorkoutHistory from '../components/WorkoutHistory.js';

const ProgressScreen = () => {
  const [selectedMetric, setSelectedMetric] = useState('weight');
  const [showAddModal, setShowAddModal] = useState(false);

  const metrics = {
    weight: {
      data: [180, 178, 176, 175, 174, 173, 172],
      unit: 'lbs',
      label: 'Weight',
      color: '#2196F3',
    },
    bodyFat: {
      data: [18, 17.5, 17.2, 16.8, 16.5, 16.2, 16],
      unit: '%',
      label: 'Body Fat',
      color: '#FF9800',
    },
    muscle: {
      data: [65, 65.5, 66, 66.5, 67, 67.5, 68],
      unit: 'lbs',
      label: 'Muscle Mass',
      color: '#4CAF50',
    },
  };

  const personalBests = [
    { id: 1, exercise: 'Bench Press', weight: '225 lbs', date: '2024-01-10' },
    { id: 2, exercise: 'Squat', weight: '315 lbs', date: '2024-01-08' },
    { id: 3, exercise: 'Deadlift', weight: '405 lbs', date: '2024-01-05' },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => metrics[selectedMetric].color,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: metrics[selectedMetric].data,
        color: (opacity = 1) => metrics[selectedMetric].color,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Metrics Chart */}
      <View style={styles.chartContainer}>
        <View style={styles.metricTabs}>
          {Object.entries(metrics).map(([key, metric]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.metricTab,
                selectedMetric === key && styles.selectedMetricTab,
              ]}
              onPress={() => setSelectedMetric(key)}
            >
              <Text style={[
                styles.metricTabText,
                selectedMetric === key && styles.selectedMetricText,
              ]}>
                {metric.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <LineChart
          data={chartData}
          width={350}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />

        <View style={styles.currentMetric}>
          <Text style={styles.currentLabel}>Current {metrics[selectedMetric].label}</Text>
          <Text style={styles.currentValue}>
            {metrics[selectedMetric].data[metrics[selectedMetric].data.length - 1]}
            {metrics[selectedMetric].unit}
          </Text>
        </View>
      </View>

      {/* Personal Bests */}
      <View style={styles.personalBests}>
        <Text style={styles.sectionTitle}>Personal Bests</Text>
        {personalBests.map((pb) => (
          <View key={pb.id} style={styles.pbItem}>
            <View style={styles.pbInfo}>
              <Text style={styles.pbExercise}>{pb.exercise}</Text>
              <Text style={styles.pbDate}>{pb.date}</Text>
            </View>
            <Text style={styles.pbWeight}>{pb.weight}</Text>
          </View>
        ))}
      </View>

      {/* Workout History */}
      <WorkoutHistory />

      {/* Add Progress Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Progress</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {/* Add progress form would go here */}
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.saveButtonText}>Save Progress</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 15,
    padding: 15,
    elevation: 2,
    alignItems: 'center',
  },
  metricTabs: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  metricTab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedMetricTab: {
    backgroundColor: '#E3F2FD',
  },
  metricTabText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedMetricText: {
    color: '#2196F3',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  currentMetric: {
    alignItems: 'center',
    marginTop: 10,
  },
  currentLabel: {
    fontSize: 14,
    color: '#666',
  },
  currentValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  personalBests: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 15,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  pbItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pbInfo: {
    flex: 1,
  },
  pbExercise: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  pbDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  pbWeight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
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

export default ProgressScreen;
