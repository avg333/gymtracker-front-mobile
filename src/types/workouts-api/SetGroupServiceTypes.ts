type NullTypeString = string | null | undefined;
type NullTypeNumber = number | null | undefined;

// REQUEST
export interface PostSetGroupRequest {
  description: NullTypeString;
  exerciseId: string;
}

// RESPONSE
export interface GetSetGroupResponse {
  id: string;
  listOrder: number;
  description: NullTypeString;
  exerciseId: string;
  workout: GetSetGroupResponseWorkout;
}

export interface GetSetGroupResponseWorkout {
  id: string;
}
//-----
export interface GetExerciseSetGroupsResponse {
  id: string;
  listOrder: number;
  description: NullTypeString;
  exerciseId: string;
  workout: GetExerciseSetGroupsResponseWorkout;
  sets: GetExerciseSetGroupsResponseSets[];
}

export interface GetExerciseSetGroupsResponseWorkout {
  id: string;
}

export interface GetExerciseSetGroupsResponseSets {
  id: string;
  listOrder: number;
  description: NullTypeString;
  reps: NullTypeNumber;
  rir: NullTypeNumber;
  weight: NullTypeNumber;
  completedAt: NullTypeString;
}
