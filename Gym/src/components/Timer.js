import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const Timer = ({ seconds, isRunning, onStart, onStop, onReset, timerAnimation }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity style={styles.timerContainer}>
      <Animated.Text style={[styles.timerText, { opacity: timerAnimation }]}>
        {formatTime(seconds)}
      </Animated.Text>
      <View style={styles.timerControls}>
        {!isRunning ? (
          <TouchableOpacity style={styles.timerButton} onPress={onStart}>
            <Text style={styles.timerButtonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.timerButton} onPress={onStop}>
            <Text style={styles.timerButtonText}>Stop</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.timerButton} onPress={onReset}>
          <Text style={styles.timerButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: '#1976D2',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
  timerControls: {
    flexDirection: 'row',
    marginTop: 10,
  },
  timerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  timerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Timer;
