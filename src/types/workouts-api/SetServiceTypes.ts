type NullTypeString = string | null | undefined;
type NullTypeNumber = number | null | undefined;

// REQUEST
export interface PostSetRequest {
  description: NullTypeString;
  reps: NullTypeNumber;
  rir: NullTypeNumber;
  weight: NullTypeNumber;
  completed: boolean | null;
}

export interface UpdateSetDataRequest {
  description: NullTypeString;
  reps: number;
  rir: number;
  weight: number;
  completed: boolean | null;
}

// RESPONSE
export interface GetNewSetDataResponse {
  description: NullTypeString;
  reps: NullTypeNumber;
  rir: NullTypeNumber;
  weight: NullTypeNumber;
}

export interface GetSetResponse {
  id: string;
  listOrder: number;
  description: NullTypeString;
  reps: NullTypeNumber;
  rir: NullTypeNumber;
  weight: NullTypeNumber;
  completedAt: NullTypeString;
  setGroup: GetSetResponseSetGroup;
}

export interface GetSetResponseSetGroup {
  id: string;
}
