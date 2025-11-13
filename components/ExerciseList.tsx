
import React from 'react';
import { Exercise } from '../types';
import DayBlock from './DayBlock';

interface ExerciseListProps {
  exercises: Exercise[];
  onDeleteExercise: (id: string) => void;
  onDeleteDay: (dateKey: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, onDeleteExercise, onDeleteDay }) => {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">No workouts logged yet.</p>
        <p className="text-gray-400">Use the form below to add your first one!</p>
      </div>
    );
  }

  const groupedByDate = exercises.reduce<Record<string, Exercise[]>>((acc, exercise) => {
    const dateKey = exercise.date.split('T')[0]; // Group by YYYY-MM-DD
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(exercise);
    return acc;
  }, {});

  const sortedDateKeys = Object.keys(groupedByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedDateKeys.map((dateKey) => {
        const dailyExercises = groupedByDate[dateKey];
        const representativeDate = new Date(dailyExercises[0].date);
        
        return (
          <DayBlock 
            key={dateKey} 
            date={representativeDate} 
            exercises={dailyExercises}
            onDeleteDay={() => onDeleteDay(dateKey)}
            onDeleteExercise={onDeleteExercise}
          />
        );
      })}
    </div>
  );
};

export default ExerciseList;
