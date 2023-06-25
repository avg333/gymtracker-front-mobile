export interface ExerciseFilterRequest {
  name: string | null;
  description: string | null;
  unilateral: boolean | null;
  loadType: string | null;
  muscleSupGroupIds: string | null;
  muscleGroupIds: string | null;
  muscleSubGroupIds: string[] | null;
}

export interface Exercise {
  id: string;
  name: string;
  description: string | undefined | null;
  favourite: boolean;
  unilateral: boolean;
  loadType: LoadType;
  muscleGroupExercise: MuscleGroupExercise[];
}

export interface MuscleGroupExercise {
  id: string;
  weight: number;
  muscleGroup: MuscleGroup;
}

export interface MuscleGroup {
  id: string;
  name: string;
  description: string | undefined | null;
}

export interface LoadType {
  id: string;
  name: string;
  description: string | null | undefined;
}
