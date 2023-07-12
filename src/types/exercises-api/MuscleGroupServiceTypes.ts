type NullTypeString = string | null | undefined;

// GET
export interface GetLoadTypeResponse {
  id: string;
  name: string;
  description: NullTypeString;
}

export interface GetMuscleSupGroupResponse {
  id: string;
  name: string;
  description: NullTypeString;
  muscleGroups: GetMuscleGroupResponse[];
}

export interface GetMuscleGroupResponse {
  id: string;
  name: string;
  description: NullTypeString;
  muscleSubGroups: GetMuscleSubGroupResponse[];
}

export interface GetMuscleSubGroupResponse {
  id: string;
  name: string;
  description: NullTypeString;
}
