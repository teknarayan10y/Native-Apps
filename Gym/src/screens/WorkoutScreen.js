import React from 'react';
import { ScrollView, View, StyleSheet, Animated } from 'react-native';
import Timer from '../components/Timer.js';
import WorkoutCard from '../components/WorkoutCard.js';
import ExerciseModal from '../components/ExerciseModal.js';
import WorkoutPlayer from '../components/WorkoutPlayer.js';
import { workouts } from '../data/workoutData.js';

const WorkoutScreen = () => {
  const [selectedWorkout, setSelectedWorkout] = React.useState(null);
  const [timerSeconds, setTimerSeconds] = React.useState(0);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [showExerciseModal, setShowExerciseModal] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = React.useState(null);
  const timerAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startTimer = () => {
    setIsTimerRunning(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(timerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(timerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    timerAnimation.setValue(0);
  };

  const resetTimer = () => {
    setTimerSeconds(0);
    setIsTimerRunning(false);
    timerAnimation.setValue(0);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Timer Component */}
      <Timer
        seconds={timerSeconds}
        isRunning={isTimerRunning}
        onStart={startTimer}
        onStop={stopTimer}
        onReset={resetTimer}
        timerAnimation={timerAnimation}
      />

      {/* Workout Player */}
      <WorkoutPlayer />

      {/* Workout List */}
      <View style={styles.workoutList}>
        {workouts.map((workout) => (
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

      {/* Exercise Modal */}
      <ExerciseModal
        visible={showExerciseModal}
        exercise={selectedExercise}
        onClose={() => setShowExerciseModal(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  workoutList: {
    padding: 15,
  },
});

export default WorkoutScreen;
