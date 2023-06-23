// GET
export interface GetSetGroupResponse {
  id: string;
  listOrder: number;
  description: string | null | undefined;
  exerciseId: string;
  workout: GetSetGroupResponseWorkout;
}

export interface GetSetGroupResponseWorkout {
  id: string;
}

export interface GetExerciseSetGroupsResponse {
  setGroups: GetSetGroupResponse[];
}

// POST
export interface PostSetGroupRequest {
  description: string | null | undefined;
  exerciseId: string;
}

export interface PostSetGroupResponse {
  id: string;
  listOrder: number;
  description: string | null | undefined;
  exerciseId: string;
  workout: PostSetGroupResponseWorkout;
}

export interface PostSetGroupResponseWorkout {
  id: string;
}

// UPDATE
export interface UpdateSetGroupListOrderResponse {
  id: string;
  listOrder: number;
  description: string | null | undefined;
  exerciseId: string;
}

export interface UpdateSetGroupSetsResponse {
  id: string;
  listOrder: number;
  description: string;
  reps: number;
  rir: number;
  weight: number;
}
