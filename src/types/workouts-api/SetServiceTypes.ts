export type CreateSetRequest = {
  description: string | null | undefined;
  reps: number | null | undefined;
  rir: number | null | undefined;
  weight: number | null | undefined;
};

export type CreateSetResponse = {
  id: string;
  listOrder: number;
  description: string;
  reps: number;
  rir: number;
  weight: number;
  setGroup: SetGroupGetSetResponse;
};

export type UpdateSetDataRequest = {
  description: string | null | undefined;
  reps: number | null | undefined;
  rir: number | null | undefined;
  weight: number | null | undefined;
};

export type UpdateSetDataResponse = {
  description: string;
  reps: number;
  rir: number;
  weight: number;
};

export type GetSetResponse = {
  id: string;
  listOrder: number;
  description: string;
  reps: number;
  rir: number;
  weight: number;
  setGroup: SetGroupGetSetResponse;
};

type SetGroupGetSetResponse = {
  id: string;
};
