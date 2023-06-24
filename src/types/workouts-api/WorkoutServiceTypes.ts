// GET
export interface GetWorkoutIdAndDateResponse {
  [date: string]: string;
}

export interface GetWorkoutResponse {
  id: string;
  date: string;
  description: string | undefined | null;
  userId: string;
  setGroups: GetWorkoutResponseSetGroups[];
}

export interface GetWorkoutResponseSetGroups {
  id: string;
  listOrder: number;
  description: string | undefined | null;
  exercise: Exercise;
  sets: GetWorkoutResponseSets[];
}

export interface GetWorkoutResponseSets {
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

// POST
export interface PostWorkoutRequest {
  date: string;
  description: string | undefined | null;
}

export interface PostWorkoutResponse {
  id: string;
  date: string;
  description: string | undefined | null;
  userId: string;
}

// UPDATE

export interface UpdateWorkoutSetGroupsRequest {
  id: string;
  source: UpdateWorkoutSetGroupsRequestSourceEnum;
}

enum UpdateWorkoutSetGroupsRequestSourceEnum {
  WORKOUT,
  SESSION,
}

export interface UpdateWorkoutSetGroupsResponseInfrastructure {
  id: string;
  listOrder: number;
  description: string | undefined | null;
  exerciseId: string;
  sets: UpdateWorkoutSetGroupsResponseInfrastructureSet[];
}

interface UpdateWorkoutSetGroupsResponseInfrastructureSet {
  id: string;
  listOrder: number;
  description: string | undefined | null;
  reps: number;
  rir: number;
  weight: number;
}
