import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';

const NutritionTracker = () => {
  const [showModal, setShowModal] = useState(false);
  const [calories, setCalories] = useState('2000');
  const [protein, setProtein] = useState('150');
  const [carbs, setCarbs] = useState('250');
  const [fats, setFats] = useState('65');

  const macros = [
    { name: 'Calories', value: calories, unit: 'kcal', color: '#FF9800' },
    { name: 'Protein', value: protein, unit: 'g', color: '#4CAF50' },
    { name: 'Carbs', value: carbs, unit: 'g', color: '#2196F3' },
    { name: 'Fats', value: fats, unit: 'g', color: '#F44336' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Tracking</Text>
      <View style={styles.macrosContainer}>
        {macros.map((macro, index) => (
          <View key={index} style={[styles.macroCard, { borderLeftColor: macro.color }]}>
            <Text style={styles.macroName}>{macro.name}</Text>
            <Text style={styles.macroValue}>
              {macro.value}
              <Text style={styles.macroUnit}> {macro.unit}</Text>
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.addButtonText}>Update Macros</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Daily Macros</Text>
            {macros.map((macro, index) => (
              <View key={index} style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{macro.name}</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={
                    macro.name === 'Calories' ? calories :
                    macro.name === 'Protein' ? protein :
                    macro.name === 'Carbs' ? carbs : fats
                  }
                  onChangeText={(text) => {
                    if (macro.name === 'Calories') setCalories(text);
                    else if (macro.name === 'Protein') setProtein(text);
                    else if (macro.name === 'Carbs') setCarbs(text);
                    else setFats(text);
                  }}
                  placeholder={`Enter ${macro.name.toLowerCase()}`}
                />
              </View>
            ))}
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  macrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  macroCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
  },
  macroName: {
    fontSize: 14,
    color: '#666',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  macroUnit: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NutritionTracker;
