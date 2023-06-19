import { api } from 'src/boot/axios';
import {
  PostWorkoutRequest,
  PostWorkoutResponse,
  UpdateWorkoutSetGroupsResponseInfrastructure,
  GetWorkoutResponse,
  GetWorkoutIdAndDateResponse,
} from 'src/types/workouts-api/WorkoutServiceTypes';

const WORKOUT_API_PREFIX = 'workout-api';
const WORKOUTS_PREFIX = '/workouts';

class WorkoutService {
  async getAllWorkoutDatesByUser(
    userId: string,
    exerciseId: string
  ): Promise<GetWorkoutIdAndDateResponse | null> {
    try {
      const res = await api.get(
        `${WORKOUT_API_PREFIX}/users/${userId}${WORKOUTS_PREFIX}/dates`,
        { params: { exerciseId } }
      );
      const workoutsIdAndDate: GetWorkoutIdAndDateResponse =
        res.data.workoutsIdAndDate;
      console.debug(
        'Obtenidos los ID y fecha de los workouts del usuario con ID: ' +
          userId +
          ' (exerciseId: ' +
          exerciseId +
          ')'
      );
      return workoutsIdAndDate;
    } catch (error) {
      console.error(
        'Error al obtener las fechas de los workouts del user: ' +
          userId +
          ' (exerciseId: ' +
          exerciseId +
          '). Error: ' +
          error
      );
      return null;
    }
  }

  async getById(
    workoutId: string,
    full: boolean
  ): Promise<GetWorkoutResponse | null> {
    try {
      full = true; //TODO Eliminar esto
      const res = await api.get(
        `${WORKOUT_API_PREFIX}${WORKOUTS_PREFIX}/${workoutId}`,
        { params: { full } }
      );
      const workout: GetWorkoutResponse = res.data;
      console.debug(
        'Obtenido el workout con ID: ' + workout.id + ' (full: ' + full + ')'
      );
      return workout;
    } catch (error) {
      console.error(
        'Error al obtener el workout con ID: ' +
          workoutId +
          ' (full: ' +
          full +
          '). Error: ' +
          error
      );
      return null;
    }
  }

  async create(
    userId: string,
    createWorkoutRequest: PostWorkoutRequest
  ): Promise<PostWorkoutResponse | null> {
    try {
      const res = await api.post(
        `${WORKOUT_API_PREFIX}/users/${userId}${WORKOUTS_PREFIX}`,
        createWorkoutRequest
      );
      const newWorkout: PostWorkoutResponse = res.data;
      console.debug(`Creado nuevo workout con ID: ${newWorkout.id}`);
      return newWorkout;
    } catch (error) {
      console.error(
        `Error al crear el workout con los datos: ${createWorkoutRequest}. Error: ${error}`
      );
      return null;
    }
  }

  async updateDate(workoutId: string, date: string): Promise<string | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${WORKOUTS_PREFIX}/${workoutId}/date`,
        { date }
      );
      const newDate: string = res.data.date;
      console.debug(
        `Acualizada la fecha del workout con ID: ${workoutId} a: ${newDate}`
      );
      return newDate;
    } catch (error) {
      console.error(
        `Error al actualizar la fecha del workout con ID: ${workoutId} a: ${date}. Error: ${error}`
      );
      return null;
    }
  }

  async updateDescription(
    workoutId: string,
    description: string
  ): Promise<string | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${WORKOUTS_PREFIX}/${workoutId}/description`,
        { description }
      );
      const newDescription: string = res.data.description;
      console.debug(
        `Acualizada la descripción del workout con ID: ${workoutId} a: ${newDescription}`
      );
      return newDescription;
    } catch (error) {
      console.error(
        `Error al actualizar la descripción del workout con ID: ${workoutId} a: ${description}. Error: ${error}`
      );
      return null;
    }
  }

  async delete(workoutId: string): Promise<boolean> {
    try {
      await api.delete(`${WORKOUT_API_PREFIX}${WORKOUTS_PREFIX}/${workoutId}`);
      console.debug(`Eliminado el workout con ID: ${workoutId}`);
      return true;
    } catch (error) {
      console.error(
        `Error al eliminar el workout con ID: ${workoutId}. Error:${error}`
      );
      return false;
    }
  }

  //-----------------ESPECIALES
  async copySetGroupsFromWorkoutToWorkout(
    workoutDestinationId: string,
    workoutSourceId: string
  ): Promise<UpdateWorkoutSetGroupsResponseInfrastructure[] | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${WORKOUTS_PREFIX}/${workoutDestinationId}/setGroups`,
        { id: workoutSourceId, source: 'WORKOUT' }
      );
      const newSets = res.data.setGroups;
      console.debug(
        'Añadidas las sets del workout con ID: ' +
          workoutSourceId +
          ' al workout con ID: ' +
          workoutDestinationId
      );
      return newSets;
    } catch (error) {
      console.error(
        'Error al añadir las sets del workout con ID: ' +
          workoutSourceId +
          ' al workout con ID: ' +
          workoutDestinationId +
          '. Error: ',
        error
      );
      return null;
    }
  }

  async copySetGroupsFromSessionToWorkout(
    workoutDestinationId: string,
    sessionSourceId: string
  ): Promise<UpdateWorkoutSetGroupsResponseInfrastructure[] | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${WORKOUTS_PREFIX}/${workoutDestinationId}/setGroups`,
        { id: sessionSourceId, source: 'SESSION' }
      );
      const newSets = res.data.setGroups;
      console.debug(
        'Añadidas las sets de la sesión con ID: ' +
          sessionSourceId +
          ' al workout con ID: ' +
          workoutDestinationId
      );
      return newSets;
    } catch (error) {
      console.error(
        'Error al añadir las sets de la sesión con ID: ' +
          sessionSourceId +
          ' al workout con ID: ' +
          workoutDestinationId +
          '. Error: ',
        error
      );
      return null;
    }
  }
}

export default new WorkoutService();
