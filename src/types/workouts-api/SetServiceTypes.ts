// GET
export interface GetNewSetDataResponse {
  description: string | null | undefined;
  reps: number;
  rir: number;
  weight: number;
}

export interface GetSetResponse {
  id: string;
  listOrder: number;
  description: string | null | undefined;
  reps: number;
  rir: number;
  weight: number;
  setGroup: GetSetResponseSetGroup;
}

export interface GetSetResponseSetGroup {
  id: string;
}

// POST
export interface PostSetRequest {
  description: string | null | undefined;
  reps: number;
  rir: number;
  weight: number;
}

export interface PostSetResponse {
  id: string;
  listOrder: number;
  description: string | null | undefined;
  reps: number;
  rir: number;
  weight: number;
  setGroup: PostSetGroupGetSetResponse;
}

export interface PostSetGroupGetSetResponse {
  id: string;
}

// UPDATE
export interface UpdateSetListOrderRequest {
  listOrder: number;
}

export interface UpdateSetListOrderResponse {
  sets: GetSetResponse[]; //TODO Separar tipo
}

export interface UpdateSetDataRequest {
  description: string | null | undefined;
  reps: number;
  rir: number;
  weight: number;
}

export interface UpdateSetDataResponse {
  description: string | null | undefined;
  reps: number;
  rir: number;
  weight: number;
}
