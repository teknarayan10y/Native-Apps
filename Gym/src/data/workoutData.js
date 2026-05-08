export const workouts = [
  {
    id: 1,
    name: 'Full Body Workout',
    duration: '45 min',
    calories: '400 kcal',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: 15, instruction: 'Keep your body straight, lower chest to ground' },
      { name: 'Squats', sets: 4, reps: 12, instruction: 'Keep feet shoulder-width apart, lower until thighs parallel' },
      { name: 'Planks', sets: 3, duration: '60 sec', instruction: 'Maintain straight body, engage core' }
    ]
  },
  {
    id: 2,
    name: 'Upper Body Focus',
    duration: '30 min',
    calories: '300 kcal',
    exercises: [
      { name: 'Pull-ups', sets: 3, reps: 8, instruction: 'Grip bar slightly wider than shoulders' },
      { name: 'Bench Press', sets: 4, reps: 10, instruction: 'Keep back flat on bench, control movement' },
      { name: 'Shoulder Press', sets: 3, reps: 12, instruction: 'Press dumbbells straight up, maintain core' }
    ]
  },
  {
    id: 3,
    name: 'Leg Day',
    duration: '40 min',
    calories: '350 kcal',
    exercises: [
      { name: 'Squats', sets: 5, reps: 12, instruction: 'Keep chest up, push through heels' },
      { name: 'Lunges', sets: 3, reps: 10, instruction: 'Step forward, lower back knee to ground' },
      { name: 'Calf Raises', sets: 4, reps: 20, instruction: 'Rise onto toes, hold at top' }
    ]
  }
];

export const achievements = [
  { name: 'Early Bird', description: 'Complete 5 morning workouts', progress: 3, total: 5 },
  { name: 'Strength Master', description: 'Complete all strength workouts', progress: 2, total: 3 },
  { name: 'Consistency King', description: 'Workout 5 days in a row', progress: 4, total: 5 }
];

export const schedule = [
  { day: 'Monday', workout: 'Full Body Workout' },
  { day: 'Wednesday', workout: 'Upper Body Focus' },
  { day: 'Friday', workout: 'Leg Day' }
];
