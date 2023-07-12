/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/workout-api/workouts/{workoutId}/setGroups': {
    post: operations['execute'];
  };
  '/workout-api/users/{userId}/workouts': {
    /** Create a workout on the user with that id */
    post: operations['execute_1'];
  };
  '/workout-api/users/{userId}/create': {
    post: operations['postWorkout'];
  };
  '/workout-api/setGroups/{setGroupId}/sets': {
    post: operations['execute_2'];
    patch: operations['patch_1'];
  };
  '/auth-api/signin': {
    post: operations['execute_3'];
  };
  '/workout-api/workouts/{workoutId}/description': {
    /** Modify workout's description with that id */
    patch: operations['execute_4'];
  };
  '/workout-api/workouts/{workoutId}/date': {
    /** Modify the workout's date with that id */
    patch: operations['execute_5'];
  };
  '/workout-api/workouts/{workoutId}/copySetGroups': {
    /** Copy all the setgroups of the source workout to the destination workout. After that, return all the destination workout setgroups with their sets */
    patch: operations['execute_6'];
  };
  '/workout-api/sets/{setId}': {
    get: operations['execute_14'];
    delete: operations['execute_24'];
    patch: operations['patch'];
  };
  '/workout-api/sets/{setId}/listOrder': {
    patch: operations['execute_7'];
  };
  '/workout-api/setGroups/{setGroupId}/listOrder': {
    patch: operations['execute_8'];
  };
  '/workout-api/setGroups/{setGroupId}/exercise': {
    patch: operations['execute_9'];
  };
  '/workout-api/setGroups/{setGroupId}/description': {
    patch: operations['patch_2'];
  };
  '/workout-api/workouts/{workoutId}': {
    /** Get workout by its id */
    get: operations['execute_10'];
    /** Delete a workout by its id */
    delete: operations['execute_23'];
  };
  '/workout-api/workouts/{workoutId}/sgs': {
    /** Get workout by its id with its setGroups */
    get: operations['get'];
  };
  '/workout-api/workouts/{workoutId}/details': {
    /** Get the workout with its setgropus, sets and exercises */
    get: operations['execute_11'];
  };
  '/workout-api/users/{userId}/workouts/dates': {
    /** Get all the date and id of the user workouts */
    get: operations['execute_12'];
  };
  '/workout-api/users/{userId}/exercises/{exerciseId}/setGroups': {
    get: operations['execute_13'];
  };
  '/workout-api/setGroups/{setGroupId}': {
    get: operations['get_1'];
    /** Delete a setGroup by its id */
    delete: operations['execute_25'];
  };
  '/workout-api/setGroups/{setGroupId}/sets/newSet': {
    get: operations['execute_15'];
  };
  '/exercises-api/muscleSupGroups': {
    get: operations['execute_16'];
  };
  '/exercises-api/muscleSupGroups/{muscleSupGroupId}/muscleGroups': {
    get: operations['execute_17'];
  };
  '/exercises-api/muscleGroups/{muscleGroupId}/muscleSubGroups': {
    get: operations['execute_18'];
  };
  '/exercises-api/loadTypes': {
    get: operations['execute_19'];
  };
  '/exercises-api/exercises': {
    get: operations['execute_20'];
  };
  '/exercises-api/exercises/{exerciseId}': {
    get: operations['execute_21'];
  };
  '/exercises-api/exercises/filter': {
    get: operations['execute_22'];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    CreateSetGroupRequestInfrastructure: {
      description?: string;
      /** Format: uuid */
      exerciseId: string;
    };
    CreateSetGroupResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: int32 */
      listOrder?: number;
      description?: string;
      /** Format: uuid */
      exerciseId?: string;
      workout?: components['schemas']['Workout'];
    };
    Workout: {
      /** Format: uuid */
      id?: string;
    };
    CreateWorkoutRequestInfrastructure: {
      /** Format: date-time */
      date: string;
      description?: string;
    };
    CreateWorkoutResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: date-time */
      date?: string;
      description?: string;
      /** Format: uuid */
      userId?: string;
    };
    CreateSetRequestInfrastructure: {
      description?: string;
      /** Format: int32 */
      reps: number;
      /** Format: double */
      rir: number;
      /** Format: double */
      weight: number;
    };
    CreateSetResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: int32 */
      listOrder?: number;
      description?: string;
      /** Format: int32 */
      reps?: number;
      /** Format: double */
      rir?: number;
      /** Format: double */
      weight?: number;
      setGroup?: components['schemas']['SetGroup'];
    };
    SetGroup: {
      /** Format: uuid */
      id?: string;
      /** Format: int32 */
      listOrder?: number;
      description?: string;
      /** Format: uuid */
      exerciseId?: string;
      sets?: components['schemas']['Set'][];
      exercise?: components['schemas']['Exercise'];
    };
    LoginControllerRequestInfrastructure: {
      username: string;
      password: string;
    };
    LoginControllerResponseInfrastructure: {
      token?: string;
      /** Format: uuid */
      id?: string;
      username?: string;
    };
    UpdateWorkoutDescriptionRequestInfrastructure: {
      description?: string;
    };
    UpdateWorkoutDescriptionResponseInfrastructure: {
      description?: string;
    };
    UpdateWorkoutDateRequestInfrastructure: {
      /** Format: date-time */
      date: string;
    };
    UpdateWorkoutDateResponseInfrastructure: {
      /** Format: date-time */
      date?: string;
    };
    CopySetGroupsRequestInfrastructure: {
      /** Format: uuid */
      id: string;
      /** @enum {string} */
      source: 'WORKOUT' | 'SESSION';
    };
    GetWorkoutResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: date-time */
      date?: string;
      description?: string;
      /** Format: uuid */
      userId?: string;
    };
    UpdateSetDataRequestInfrastructure: {
      description?: string;
      /** Format: int32 */
      reps: number;
      /** Format: double */
      rir: number;
      /** Format: double */
      weight: number;
    };
    UpdateSetDataResponseInfrastructure: {
      description?: string;
      /** Format: int32 */
      reps?: number;
      /** Format: double */
      rir?: number;
      /** Format: double */
      weight?: number;
    };
    UpdateSetListOrderRequestInfrastructure: {
      /** Format: int32 */
      listOrder: number;
    };
    UpdateSetListOrderResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: int32 */
      listOrder?: number;
      description?: string;
      /** Format: int32 */
      reps?: number;
      /** Format: double */
      rir?: number;
      /** Format: double */
      weight?: number;
      setGroup?: components['schemas']['SetGroup'];
    };
    UpdateSetGroupSetsRequestInfrastructure: {
      /** Format: uuid */
      setGroupId: string;
    };
    Set: {
      /** Format: uuid */
      id?: string;
      /** Format: int32 */
      listOrder?: number;
      description?: string;
      /** Format: int32 */
      reps?: number;
      /** Format: double */
      rir?: number;
      /** Format: double */
      weight?: number;
    };
    UpdateSetGroupSetsResponseInfrastructure: {
      sets?: components['schemas']['Set'][];
    };
    UpdateSetGroupListOrderRequestInfrastructure: {
      /** Format: int32 */
      listOrder: number;
    };
    UpdateSetGroupListOrderResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: int32 */
      listOrder?: number;
      description?: string;
      /** Format: uuid */
      exerciseId?: string;
      workout?: components['schemas']['Workout'];
    };
    UpdateSetGroupExerciseRequestInfrastructure: {
      /** Format: uuid */
      exerciseId: string;
    };
    UpdateSetGroupExerciseResponseInfrastructure: {
      /** Format: uuid */
      exerciseId?: string;
    };
    UpdateSetGroupDescriptionRequestInfrastructure: {
      description?: string;
    };
    UpdateSetGroupDescriptionResponseInfrastructure: {
      description?: string;
    };
    GetWorkoutSetGroupsResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: date-time */
      date?: string;
      description?: string;
      /** Format: uuid */
      userId?: string;
      setGroups?: components['schemas']['SetGroup'][];
    };
    Exercise: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
      unilateral?: boolean;
      loadType?: components['schemas']['LoadType'];
      muscleSubGroups?: components['schemas']['MuscleSubGroup'][];
      muscleGroupExercises?: components['schemas']['MuscleGroupExercise'][];
    };
    GetWorkoutDetailsResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: date-time */
      date?: string;
      description?: string;
      /** Format: uuid */
      userId?: string;
      setGroups?: components['schemas']['SetGroup'][];
    };
    LoadType: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
    };
    MuscleGroup: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
      muscleSupGroups?: components['schemas']['MuscleSupGroup'][];
    };
    MuscleGroupExercise: {
      /** Format: uuid */
      id?: string;
      /** Format: double */
      weight?: number;
      muscleGroup?: components['schemas']['MuscleGroup'];
    };
    MuscleSubGroup: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
    };
    MuscleSupGroup: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
    };
    GetSetGroupsByExerciseResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: int32 */
      listOrder?: number;
      description?: string;
      /** Format: uuid */
      exerciseId?: string;
      workout?: components['schemas']['Workout'];
      sets?: components['schemas']['Set'][];
    };
    GetSetResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: int32 */
      listOrder?: number;
      description?: string;
      /** Format: int32 */
      reps?: number;
      /** Format: double */
      rir?: number;
      /** Format: double */
      weight?: number;
      setGroup?: components['schemas']['SetGroup'];
    };
    GetSetGroupResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      /** Format: int32 */
      listOrder?: number;
      description?: string;
      /** Format: uuid */
      exerciseId?: string;
      workout?: components['schemas']['Workout'];
    };
    GetNewSetDataResponseInfrastructure: {
      description?: string;
      /** Format: int32 */
      reps?: number;
      /** Format: double */
      rir?: number;
      /** Format: double */
      weight?: number;
    };
    GetAllMuscleSupGroupsResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
      muscleGroups?: components['schemas']['MuscleGroup'][];
    };
    GetAllMuscleGroupsByMuscleSupGroupResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
      muscleSubGroups?: components['schemas']['MuscleSubGroup'][];
    };
    GetAllMuscleSubGroupByMuscleGroupResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
    };
    GetAllLoadTypesResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
    };
    GetExercisesByIdsResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
      unilateral?: boolean;
      loadType?: components['schemas']['LoadType'];
      muscleSubGroups?: components['schemas']['MuscleSubGroup'][];
      muscleGroupExercises?: components['schemas']['MuscleGroupExercise'][];
    };
    GetExerciseByIdResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
      loadType?: components['schemas']['LoadType'];
      muscleSubGroups?: components['schemas']['MuscleSubGroup'][];
      muscleGroupExercises?: components['schemas']['MuscleGroupExercise'][];
    };
    GetExercisesByFilterResponseInfrastructure: {
      /** Format: uuid */
      id?: string;
      name?: string;
      description?: string;
      unilateral?: boolean;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {
  execute: {
    parameters: {
      path: {
        workoutId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateSetGroupRequestInfrastructure'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['CreateSetGroupResponseInfrastructure'];
        };
      };
    };
  };
  /** Create a workout on the user with that id */
  execute_1: {
    parameters: {
      path: {
        userId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateWorkoutRequestInfrastructure'];
      };
    };
    responses: {
      /** @description Created the workout */
      200: {
        content: {
          'application/json': components['schemas']['CreateWorkoutResponseInfrastructure'];
        };
      };
      /** @description Workout already exists for that user on that date. */
      400: never;
      /** @description Not authorized */
      403: never;
    };
  };
  postWorkout: {
    parameters: {
      path: {
        userId: string;
      };
    };
    responses: {
      /** @description OK */
      200: never;
    };
  };
  execute_2: {
    parameters: {
      path: {
        setGroupId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateSetRequestInfrastructure'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['CreateSetResponseInfrastructure'];
        };
      };
    };
  };
  patch_1: {
    parameters: {
      path: {
        setGroupId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateSetGroupSetsRequestInfrastructure'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['UpdateSetGroupSetsResponseInfrastructure'];
        };
      };
    };
  };
  execute_3: {
    requestBody: {
      content: {
        'application/json': components['schemas']['LoginControllerRequestInfrastructure'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['LoginControllerResponseInfrastructure'];
        };
      };
    };
  };
  /** Modify workout's description with that id */
  execute_4: {
    parameters: {
      path: {
        workoutId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateWorkoutDescriptionRequestInfrastructure'];
      };
    };
    responses: {
      /** @description Description modified */
      200: {
        content: {
          'application/json': components['schemas']['UpdateWorkoutDescriptionResponseInfrastructure'];
        };
      };
      /** @description Not authorized */
      403: never;
      /** @description Workout not found */
      404: never;
    };
  };
  /** Modify the workout's date with that id */
  execute_5: {
    parameters: {
      path: {
        workoutId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateWorkoutDateRequestInfrastructure'];
      };
    };
    responses: {
      /** @description Date modified */
      200: {
        content: {
          'application/json': components['schemas']['UpdateWorkoutDateResponseInfrastructure'];
        };
      };
      /** @description A workout already exists for that user on that date. */
      400: never;
      /** @description Not authorized */
      403: never;
      /** @description Workout not found */
      404: never;
    };
  };
  /** Copy all the setgroups of the source workout to the destination workout. After that, return all the destination workout setgroups with their sets */
  execute_6: {
    parameters: {
      path: {
        workoutId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CopySetGroupsRequestInfrastructure'];
      };
    };
    responses: {
      /** @description SetGroups of the destination workout with theirs sets */
      200: {
        content: {
          'application/json': components['schemas']['GetWorkoutResponseInfrastructure'];
        };
      };
      /** @description Not authorized */
      403: never;
      /** @description Workout source/destination not found */
      404: never;
    };
  };
  execute_14: {
    parameters: {
      path: {
        setId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetSetResponseInfrastructure'];
        };
      };
    };
  };
  execute_24: {
    parameters: {
      path: {
        setId: string;
      };
    };
    responses: {
      /** @description OK */
      200: never;
    };
  };
  patch: {
    parameters: {
      path: {
        setId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateSetDataRequestInfrastructure'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['UpdateSetDataResponseInfrastructure'];
        };
      };
    };
  };
  execute_7: {
    parameters: {
      path: {
        setId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateSetListOrderRequestInfrastructure'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['UpdateSetListOrderResponseInfrastructure'][];
        };
      };
    };
  };
  execute_8: {
    parameters: {
      path: {
        setGroupId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateSetGroupListOrderRequestInfrastructure'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['UpdateSetGroupListOrderResponseInfrastructure'][];
        };
      };
    };
  };
  execute_9: {
    parameters: {
      path: {
        setGroupId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateSetGroupExerciseRequestInfrastructure'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['UpdateSetGroupExerciseResponseInfrastructure'];
        };
      };
    };
  };
  patch_2: {
    parameters: {
      path: {
        setGroupId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateSetGroupDescriptionRequestInfrastructure'];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['UpdateSetGroupDescriptionResponseInfrastructure'];
        };
      };
    };
  };
  /** Get workout by its id */
  execute_10: {
    parameters: {
      path: {
        workoutId: string;
      };
    };
    responses: {
      /** @description Workout */
      200: {
        content: {
          'application/json': components['schemas']['GetWorkoutResponseInfrastructure'];
        };
      };
      /** @description Not authorized */
      403: never;
      /** @description Workout not found */
      404: never;
    };
  };
  /** Delete a workout by its id */
  execute_23: {
    parameters: {
      path: {
        workoutId: string;
      };
    };
    responses: {
      /** @description Deleted the workout */
      204: never;
      /** @description Not authorized */
      403: never;
      /** @description Workout not found */
      404: never;
    };
  };
  /** Get workout by its id with its setGroups */
  get: {
    parameters: {
      path: {
        workoutId: string;
      };
    };
    responses: {
      /** @description Workout */
      200: {
        content: {
          'application/json': components['schemas']['GetWorkoutSetGroupsResponseInfrastructure'];
        };
      };
      /** @description Not authorized */
      403: never;
      /** @description Workout not found */
      404: never;
    };
  };
  /** Get the workout with its setgropus, sets and exercises */
  execute_11: {
    parameters: {
      path: {
        workoutId: string;
      };
    };
    responses: {
      /** @description Workout with all the data */
      200: {
        content: {
          'application/json': components['schemas']['GetWorkoutDetailsResponseInfrastructure'];
        };
      };
      /** @description Not authorized */
      403: never;
      /** @description Workout not found */
      404: never;
    };
  };
  /** Get all the date and id of the user workouts */
  execute_12: {
    parameters: {
      query?: {
        exerciseId?: string;
      };
      path: {
        userId: string;
      };
    };
    responses: {
      /** @description Map {date: id} of the user workouts */
      200: {
        content: {
          'application/json': components['schemas']['GetWorkoutResponseInfrastructure'];
        };
      };
      /** @description Not authorized */
      403: never;
    };
  };
  execute_13: {
    parameters: {
      path: {
        userId: string;
        exerciseId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetSetGroupsByExerciseResponseInfrastructure'][];
        };
      };
    };
  };
  get_1: {
    parameters: {
      path: {
        setGroupId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetSetGroupResponseInfrastructure'];
        };
      };
    };
  };
  /** Delete a setGroup by its id */
  execute_25: {
    parameters: {
      path: {
        setGroupId: string;
      };
    };
    responses: {
      /** @description Deleted the setGroup */
      204: never;
      /** @description Not authorized */
      403: never;
      /** @description Workout not found */
      404: never;
    };
  };
  execute_15: {
    parameters: {
      path: {
        setGroupId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetNewSetDataResponseInfrastructure'];
        };
      };
    };
  };
  execute_16: {
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetAllMuscleSupGroupsResponseInfrastructure'][];
        };
      };
    };
  };
  execute_17: {
    parameters: {
      path: {
        muscleSupGroupId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetAllMuscleGroupsByMuscleSupGroupResponseInfrastructure'][];
        };
      };
    };
  };
  execute_18: {
    parameters: {
      path: {
        muscleGroupId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetAllMuscleSubGroupByMuscleGroupResponseInfrastructure'][];
        };
      };
    };
  };
  execute_19: {
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetAllLoadTypesResponseInfrastructure'][];
        };
      };
    };
  };
  execute_20: {
    parameters: {
      query: {
        exerciseIds: string[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetExercisesByIdsResponseInfrastructure'][];
        };
      };
    };
  };
  execute_21: {
    parameters: {
      path: {
        exerciseId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetExerciseByIdResponseInfrastructure'];
        };
      };
    };
  };
  execute_22: {
    parameters: {
      query?: {
        name?: string;
        description?: string;
        unilateral?: boolean;
        loadTypeIds?: string[];
        muscleSupGroupIds?: string[];
        muscleGroupIds?: string[];
        muscleSubGroupIds?: string[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['GetExercisesByFilterResponseInfrastructure'][];
        };
      };
    };
  };
}