// GET
export interface GetLoadTypeResponse {
  id: string;
  name: string;
  description: string | null | undefined;
}

export interface GetMuscleSupGroupResponse {
  id: string;
  name: string;
  description: string | null | undefined;
  muscleGroups: GetMuscleGroupResponse[];
}

export interface GetMuscleGroupResponse {
  id: string;
  name: string;
  description: string | null | undefined;
  muscleSubGroups: GetMuscleSubGroupResponse[];
}

export interface GetMuscleSubGroupResponse {
  id: string;
  name: string;
  description: string | null | undefined;
}
