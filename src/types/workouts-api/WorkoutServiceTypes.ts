type NullTypeString = string | null | undefined;
type NullTypeNumber = number | null | undefined;

//REQUEST
export interface UpdateWorkoutSetGroupsRequest {
  id: string;
  source: UpdateWorkoutSetGroupsRequestSourceEnum;
}

export enum UpdateWorkoutSetGroupsRequestSourceEnum {
  WORKOUT,
  SESSION,
}

export interface PostWorkoutRequest {
  date: string;
  description: NullTypeString;
}

// RESPONSE
export interface GetWorkoutIdAndDateResponse {
  workoutsDateAndId: { [date: string]: string };
}

export interface GetWorkoutResponse {
  id: string;
  date: string;
  description: NullTypeString;
  userId: string;
}

export interface GetWorkoutResponseWithSetGroups {
  id: string;
  date: string;
  description: NullTypeString;
  userId: string;
  setGroups: GetWorkoutResponseWithSetGroupSetGroups[];
}

export interface GetWorkoutResponseWithSetGroupSetGroups {
  id: string;
  listOrder: number;
  description: NullTypeString;
  exerciseId: string;
}

export interface GetWorkoutResponseWithDetails {
  id: string;
  date: string;
  description: NullTypeString;
  userId: string;
  setGroups: GetWorkoutResponseSetGroups[];
}

export interface GetWorkoutResponseSetGroups {
  id: string;
  listOrder: number;
  description: NullTypeString;
  exerciseId: string;
  sets: GetWorkoutResponseSets[];
  exercise: Exercise; //TODO Verificar casos null
}

export interface GetWorkoutResponseSets {
  id: string;
  listOrder: number;
  description: NullTypeString;
  reps: NullTypeNumber;
  rir: NullTypeNumber;
  weight: NullTypeNumber;
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
