
import React from 'react';
import { Exercise } from '../types';
import TrashIcon from './icons/TrashIcon';

interface ExerciseItemProps {
  exercise: Exercise;
  onDeleteExercise: (id: string) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, onDeleteExercise }) => {
  const handleDelete = () => {
    onDeleteExercise(exercise.id);
  };

  const splitColorClasses: Record<string, string> = {
    Push: 'bg-red-100 text-red-800 border-red-200',
    Pull: 'bg-green-100 text-green-800 border-green-200',
    Legs: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <div className="group flex justify-between items-center py-2.5 border-b border-amber-200/50 last:border-b-0">
      <div className="flex-grow pr-4">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base font-medium text-slate-700 capitalize">{exercise.name}</h3>
          {exercise.split && (
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${splitColorClasses[exercise.split]}`}>
              {exercise.split}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right text-sm shrink-0">
          <p className="text-slate-600">{exercise.sets} &times; {exercise.reps} reps</p>
          <p className="font-semibold text-slate-800 mt-0.5">{exercise.weight} kg</p>
        </div>
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full p-1"
          aria-label={`Delete ${exercise.name} workout`}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ExerciseItem;