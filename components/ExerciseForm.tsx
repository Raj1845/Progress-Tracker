import React, { useRef, KeyboardEvent } from 'react';
import { Exercise, ExerciseDraft, Split } from '../types';
import PlusIcon from './icons/PlusIcon';
import AutoSaveIndicator from './AutoSaveIndicator';

interface ExerciseFormProps {
  draft: ExerciseDraft;
  onUpdateDraft: (draft: ExerciseDraft) => void;
  onAddExercise: (exercise: Omit<Exercise, 'id' | 'date'>) => void;
  savingStatus: 'idle' | 'saving' | 'saved';
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ draft, onUpdateDraft, onAddExercise, savingStatus }) => {
  const { name, sets, reps, weight, split } = draft;

  const nameInputRef = useRef<HTMLInputElement>(null);
  const setsInputRef = useRef<HTMLInputElement>(null);
  const repsInputRef = useRef<HTMLInputElement>(null);
  const weightInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sets || !reps || !weight) {
        alert("Please fill out all fields.");
        return;
    }
    
    onAddExercise({
      name,
      sets: parseInt(sets, 10),
      reps: parseInt(reps, 10),
      weight: parseFloat(weight),
      split,
    });

    nameInputRef.current?.focus();
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, nextFieldRef: React.RefObject<HTMLInputElement | HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextFieldRef.current?.focus();
    }
  };

  const handleSplitSelect = (selectedSplit: Split) => {
    onUpdateDraft({
      ...draft,
      split: split === selectedSplit ? undefined : selectedSplit,
    });
  };

  const getSplitButtonClass = (splitName: Split) => {
    const baseClasses = 'px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black';
    if (split === splitName) {
      return `${baseClasses} bg-black text-white shadow-sm`;
    }
    return `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-100`;
  };

  const isFormInvalid = !name.trim() || !sets || !reps || !weight;

  return (
    <form 
      onSubmit={handleSubmit} 
      className="fixed bottom-0 left-0 right-0 bg-gray-50/90 backdrop-blur-sm border-t border-gray-200 p-4 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end h-6 mb-1">
          <AutoSaveIndicator status={savingStatus} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <div className="col-span-2 md:col-span-5 mb-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Split</label>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => handleSplitSelect('Push')} className={getSplitButtonClass('Push')}>Push</button>
              <button type="button" onClick={() => handleSplitSelect('Pull')} className={getSplitButtonClass('Pull')}>Pull</button>
              <button type="button" onClick={() => handleSplitSelect('Legs')} className={getSplitButtonClass('Legs')}>Legs</button>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label htmlFor="exercise-name" className="block text-xs font-medium text-gray-500 mb-1">Exercise Name</label>
            <input
              id="exercise-name"
              type="text"
              value={name}
              onChange={(e) => onUpdateDraft({ ...draft, name: e.target.value })}
              placeholder="e.g. Bench Press"
              className="w-full bg-white text-black rounded-md border border-gray-300 focus:ring-black focus:border-black p-2 text-sm"
              ref={nameInputRef}
              onKeyDown={(e) => handleKeyDown(e, setsInputRef)}
            />
          </div>
          <div>
            <label htmlFor="sets" className="block text-xs font-medium text-gray-500 mb-1">Sets</label>
            <input
              id="sets"
              type="number"
              value={sets}
              onChange={(e) => onUpdateDraft({ ...draft, sets: e.target.value })}
              placeholder="3"
              min="1"
              className="w-full bg-white text-black rounded-md border border-gray-300 focus:ring-black focus:border-black p-2 text-sm"
              ref={setsInputRef}
              onKeyDown={(e) => handleKeyDown(e, repsInputRef)}
            />
          </div>
          <div>
            <label htmlFor="reps" className="block text-xs font-medium text-gray-500 mb-1">Reps</label>
            <input
              id="reps"
              type="number"
              value={reps}
              onChange={(e) => onUpdateDraft({ ...draft, reps: e.target.value })}
              placeholder="10"
              min="1"
              className="w-full bg-white text-black rounded-md border border-gray-300 focus:ring-black focus:border-black p-2 text-sm"
              ref={repsInputRef}
              onKeyDown={(e) => handleKeyDown(e, weightInputRef)}
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-xs font-medium text-gray-500 mb-1">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => onUpdateDraft({ ...draft, weight: e.target.value })}
              placeholder="60"
              min="0"
              step="0.5"
              className="w-full bg-white text-black rounded-md border border-gray-300 focus:ring-black focus:border-black p-2 text-sm"
              ref={weightInputRef}
              onKeyDown={(e) => handleKeyDown(e, submitButtonRef)}
            />
          </div>
          <button
            type="submit"
            disabled={isFormInvalid}
            className="col-span-2 md:col-span-1 flex items-center justify-center gap-2 bg-black text-white font-bold py-2 px-4 rounded-md h-10 shadow-md transition-all duration-150 ease-in-out hover:bg-gray-800 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:text-gray-600 disabled:transform-none disabled:cursor-not-allowed disabled:shadow-none"
            ref={submitButtonRef}
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExerciseForm;