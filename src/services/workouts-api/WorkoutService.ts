import { api } from 'src/boot/axios';
import {
  GetWorkoutIdAndDateResponse,
  GetWorkoutResponse,
  GetWorkoutResponseWithSetGroups,
  GetWorkoutResponseWithDetails,
  PostWorkoutRequest,
  UpdateWorkoutSetGroupsRequestSourceEnum,
} from 'src/types/workouts-api/WorkoutServiceTypes';

const WORKOUT_API_PREFIX = 'workout-api';

class WorkoutService {
  async getAllWorkoutDatesByUser(
    userId: string,
    exerciseId: string | null | undefined
  ): Promise<GetWorkoutIdAndDateResponse> {
    try {
      const res = await api.get(
        `${WORKOUT_API_PREFIX}/users/${userId}/workouts/dates`,
        { params: { exerciseId } }
      );
      return res.data;
    } catch (error) {
      console.error(
        `Error al obtener las fechas de los workouts del user: ${userId} (exerciseId: ${exerciseId}). Error: ${error}`
      );
      return { workoutsDateAndId: {} };
    }
  }

  async getById(workoutId: string): Promise<GetWorkoutResponse | null> {
    try {
      const res = await api.get(`${WORKOUT_API_PREFIX}/workouts/${workoutId}`);
      return res.data;
    } catch (error) {
      console.error(
        `Error al obtener el workout con ID: ${workoutId}. Error: ${error}`
      );
      return null;
    }
  }

  async getByIdWithSetGroups(
    workoutId: string
  ): Promise<GetWorkoutResponseWithSetGroups | null> {
    try {
      const res = await api.get(
        `${WORKOUT_API_PREFIX}/workouts/${workoutId}/sgs`
      );
      return res.data;
    } catch (error) {
      console.error(
        `Error al obtener el workout con sg con ID: ${workoutId}. Error: ${error}`
      );
      return null;
    }
  }

  async getByIdWithDetails(
    workoutId: string
  ): Promise<GetWorkoutResponseWithDetails | null> {
    try {
      const res = await api.get(
        `${WORKOUT_API_PREFIX}/workouts/${workoutId}/details`
      );
      return res.data;
    } catch (error) {
      console.error(
        `Error al obtener el workout details con ID: ${workoutId}. Error: ${error}`
      );
      return null;
    }
  }

  async create(userId: string, postWorkoutRequest: PostWorkoutRequest) {
    try {
      await api.post(
        `${WORKOUT_API_PREFIX}/users/${userId}/workouts`,
        postWorkoutRequest
      );
    } catch (error) {
      console.error(`Error al crear el workout. Error: ${error}`);
    }
  }

  async updateDate(workoutId: string, date: string) {
    try {
      await api.patch(`${WORKOUT_API_PREFIX}/workouts/${workoutId}/date`, {
        date,
      });
    } catch (error) {
      console.error(
        `Error al actualizar la fecha del workout con ID: ${workoutId} a: ${date}. Error: ${error}`
      );
    }
  }

  async updateDescription(
    workoutId: string,
    description: string | null | undefined
  ) {
    try {
      await api.patch(
        `${WORKOUT_API_PREFIX}/workouts/${workoutId}/description`,
        { description }
      );
    } catch (error) {
      console.error(
        `Error al actualizar la descripción del workout con ID: ${workoutId} a: ${description}. Error: ${error}`
      );
    }
  }

  async copySetGroupsFromWorkoutToWorkout(
    workoutDestinationId: string,
    workoutSourceId: string
  ) {
    try {
      await api.patch(
        `${WORKOUT_API_PREFIX}/workouts/${workoutDestinationId}/copySetGroups`,
        {
          id: workoutSourceId,
          source: UpdateWorkoutSetGroupsRequestSourceEnum.WORKOUT,
        }
      );
    } catch (error) {
      console.error(
        `Error al añadir las sets del workout con ID: : ${workoutSourceId} al workout con ID:  ${workoutDestinationId}. Error: ${error}`
      );
    }
  }

  async delete(workoutId: string) {
    try {
      await api.delete(`${WORKOUT_API_PREFIX}/workouts/${workoutId}`);
    } catch (error) {
      console.error(
        `Error al eliminar el workout con ID: ${workoutId}. Error:${error}`
      );
    }
  }
}

export default new WorkoutService();
