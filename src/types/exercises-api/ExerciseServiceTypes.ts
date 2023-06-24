export interface ExerciseFilterRequest {
  name: string | null;
  description: string | null;
  unilateral: boolean | null;
  loadType: boolean | null;
  muscleSupGroupIds: string[] | null;
  muscleGroupIds: string[] | null;
  muscleSubGroupIds: string[] | null;
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
