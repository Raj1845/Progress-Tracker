export type Split = 'Push' | 'Pull' | 'Legs';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  date: string;
  split?: Split;
}

export interface ExerciseDraft {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  split?: Split;
}