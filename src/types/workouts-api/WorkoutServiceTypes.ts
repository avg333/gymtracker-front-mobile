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

//-------------------------------------------

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

//-------------------------------------------

export interface GetWorkoutResponse {
  id: string;
  date: string;
  description: string | undefined | null;
  userId: string;
  setGroups: GetWorkoutResponseSetGroups[];
}

interface GetWorkoutResponseSetGroups {
  id: string;
  listOrder: number;
  description: string | undefined | null;
  exerciseId: string;
  sets: GetWorkoutResponseSets[];
}

interface GetWorkoutResponseSets {
  id: string;
  listOrder: number;
  description: string | undefined | null;
  reps: number;
  rir: number;
  weight: number;
}

//-------------------------------------------

export interface GetWorkoutIdAndDateResponse {
  [date: string]: string;
}
