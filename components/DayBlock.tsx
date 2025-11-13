
import React from 'react';
import { Exercise } from '../types';
import ExerciseItem from './ExerciseItem';
import TrashIcon from './icons/TrashIcon';

interface DayBlockProps {
  date: Date;
  exercises: Exercise[];
  onDeleteDay: () => void;
  onDeleteExercise: (id: string) => void;
}

const DayBlock: React.FC<DayBlockProps> = ({ date, exercises, onDeleteDay, onDeleteExercise }) => {
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="group relative bg-amber-50/50 border border-amber-200 rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-center pb-2 mb-3 border-b-2 border-red-200/50">
        <h2 className="text-lg font-bold text-slate-700">
          {formattedDate}
        </h2>
        <button 
          onClick={onDeleteDay}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1"
          aria-label={`Delete all workouts for ${formattedDate}`}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {exercises.map((exercise) => (
          <ExerciseItem 
            key={exercise.id} 
            exercise={exercise} 
            onDeleteExercise={onDeleteExercise} 
          />
        ))}
      </div>
    </div>
  );
};

export default DayBlock;
