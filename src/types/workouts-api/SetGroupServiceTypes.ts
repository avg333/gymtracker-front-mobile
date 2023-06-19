export interface PostSetGroupRequest {
  description: string | null | undefined;
  exerciseId: string;
}

export interface PostSetGroupResponse {
  id: string;
  listOrder: number;
  description: string;
  exerciseId: number;
  workout: PostSetGroupResponseWorkout;
}

interface PostSetGroupResponseWorkout {
  id: string;
}

// -----------------------------------------------------

export interface UpdateSetGroupListOrderResponse {
  id: string;
  listOrder: number;
  description: string;
  exerciseId: number;
}

// -----------------------------------------------------

export interface GetSetGroupResponse {
  id: string;
  listOrder: number;
  description: string;
  exerciseId: number;
  workout: GetSetGroupResponseWorkout;
  sets: GetSetGroupResponseSets;
}

interface GetSetGroupResponseSets {
  id: string;
  listOrder: number;
  description: string;
  reps: number;
  rir: number;
  weight: number;
}
interface GetSetGroupResponseWorkout {
  id: string;
}

// -----------------------------------------------------

export interface UpdateSetGroupSetsResponse {
  id: string;
  listOrder: number;
  description: string;
  reps: number;
  rir: number;
  weight: number;
}
