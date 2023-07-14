export interface Workout {
  id: string;
  date: string;
  description: string | undefined | null;
  userId: string;
  setGroups: SetGroup[];
}

export interface SetGroup {
  id: string;
  listOrder: number;
  description: string | undefined | null;
  exercise: Exercise | null;
  sets: Set[];
}

export interface Set {
  id: string;
  listOrder: number;
  description: string | undefined | null;
  reps: number;
  rir: number;
  weight: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string | undefined | null;
  muscleGroupExercise: MuscleGroupExercise[];
}

export interface MuscleGroupExercise {
  id: string;
  weight: number;
  muscleGroup: MuscleGroup;
}

export interface MuscleGroup {
  id: string;
  name: number;
  description: string | undefined | null;
}
