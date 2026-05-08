import React from 'react';
import { View, ScrollView, StyleSheet, Animated } from 'react-native';
import Timer from '../components/Timer';
import WorkoutCard from '../components/WorkoutCard';
import ExerciseModal from '../components/ExerciseModal';
import { workouts } from '../data/workoutData';

const WorkoutScreen = () => {
  const [selectedWorkout, setSelectedWorkout] = React.useState(null);
  const [selectedExercise, setSelectedExercise] = React.useState(null);
  const [showExerciseModal, setShowExerciseModal] = React.useState(false);
  const [timerSeconds, setTimerSeconds] = React.useState(0);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const timerAnimation = React.useRef(new Animated.Value(0)).current;

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

  React.useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <ScrollView style={styles.container}>
      <Timer
        seconds={timerSeconds}
        isRunning={isTimerRunning}
        onStart={startTimer}
        onStop={stopTimer}
        onReset={resetTimer}
        timerAnimation={timerAnimation}
      />
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
    padding: 20,
  },
});

export default WorkoutScreen;
