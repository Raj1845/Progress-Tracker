
import React, { useState, useEffect, useRef } from 'react';
import { Exercise, ExerciseDraft } from './types';
import Header from './components/Header';
import ExerciseList from './components/ExerciseList';
import ExerciseForm from './components/ExerciseForm';

const App: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    try {
      const savedExercises = localStorage.getItem('exercises');
      return savedExercises ? JSON.parse(savedExercises) : [];
    } catch (error) {
      console.error("Could not parse exercises from localStorage", error);
      return [];
    }
  });

  const [draft, setDraft] = useState<ExerciseDraft>(() => {
    try {
      const savedDraft = localStorage.getItem('exerciseDraft');
      return savedDraft ? JSON.parse(savedDraft) : { name: '', sets: '', reps: '', weight: '', split: undefined };
    } catch (error) {
      console.error("Could not parse draft from localStorage", error);
      return { name: '', sets: '', reps: '', weight: '', split: undefined };
    }
  });
  
  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const isMounted = useRef(false);
  const saveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  // Auto-save draft with visual feedback
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    setSavingStatus('saving');
    
    saveTimeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem('exerciseDraft', JSON.stringify(draft));
        setSavingStatus('saved');
        
        saveTimeoutRef.current = window.setTimeout(() => {
          setSavingStatus('idle');
        }, 2000);
      } catch (error) {
        console.error("Could not save draft to localStorage", error);
        setSavingStatus('idle'); // Reset on error
      }
    }, 1000); // Debounce save by 1 second

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [draft]);

  const addExercise = (exerciseData: Omit<Exercise, 'id' | 'date'>) => {
    const newExercise: Exercise = {
      ...exerciseData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setExercises(prevExercises => [newExercise, ...prevExercises]);
    // Keep the split for the next exercise, clear the rest.
    setDraft(prevDraft => ({
      name: '', 
      sets: '', 
      reps: '', 
      weight: '',
      split: prevDraft.split
    }));
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const deleteDay = (dateKey: string) => {
    setExercises(prev => prev.filter(ex => ex.date.split('T')[0] !== dateKey));
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />
      <main className="max-w-5xl mx-auto p-4 md:p-8 pb-48">
        <ExerciseList 
          exercises={exercises}
          onDeleteExercise={deleteExercise}
          onDeleteDay={deleteDay}
        />
      </main>
      <ExerciseForm 
        draft={draft}
        onUpdateDraft={setDraft}
        onAddExercise={addExercise}
        savingStatus={savingStatus}
      />
    </div>
  );
};

export default App;