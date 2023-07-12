type NullTypeString = string | null | undefined;

export interface ExerciseFilterRequest {
  name: string | null;
  description: string | null;
  unilateral: boolean | null;
  loadType: string | null;
  muscleSupGroupIds: string | null;
  muscleGroupIds: string | null;
  muscleSubGroupIds: string[] | null;
}

export interface ExerciseSimple {
  id: string;
  name: string;
  description: NullTypeString;
  unilateral: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: NullTypeString;
  unilateral: boolean;
  loadType: LoadType;
  muscleSubGroups: MuscleSubGroup[];
  muscleGroupExercise: MuscleGroupExercise[];
}

export interface LoadType {
  id: string;
  name: string;
  description: NullTypeString;
}

export interface MuscleSubGroup {
  id: string;
  name: string;
  description: NullTypeString;
}

export interface MuscleGroupExercise {
  id: string;
  weight: number;
  muscleGroup: MuscleGroup;
}

export interface MuscleGroup {
  id: string;
  name: string;
  description: NullTypeString;
}
