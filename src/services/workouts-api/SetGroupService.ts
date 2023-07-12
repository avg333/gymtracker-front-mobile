import { api } from 'src/boot/axios';
import {
  GetSetGroupResponse,
  GetExerciseSetGroupsResponse,
  PostSetGroupRequest,
} from 'src/types/workouts-api/SetGroupServiceTypes';

const WORKOUT_API_PREFIX = 'workout-api';

class SetGroupService {
  async getById(setGroupId: string): Promise<GetSetGroupResponse | null> {
    try {
      const res = await api.get(
        `${WORKOUT_API_PREFIX}/setGroups/${setGroupId}`
      );
      const setGroup: GetSetGroupResponse = res.data;
      console.debug(`Obtenido setGroup con ID: ${setGroup.id}`);
      return setGroup;
    } catch (error) {
      console.error(
        `Error al obtener el setGroup con ID: ${setGroupId}. Error: ${error}`
      );
      return null;
    }
  }

  async getExerciseHistory(
    userId: string,
    exerciseId: string
  ): Promise<GetExerciseSetGroupsResponse[]> {
    try {
      const res = await api.get(
        `${WORKOUT_API_PREFIX}/users/${userId}/exercises/${exerciseId}/setGroups`
      );
      const setGroups: GetExerciseSetGroupsResponse[] = res.data;
      console.debug(
        `Obtenido setGroups del user con ID: ${userId} y del ejercicio con ID: ${exerciseId}`
      );
      return setGroups;
    } catch (error) {
      console.error(
        `Error al obtener el ultimo setGroup del usuario: ${userId} y el ejercicio: ${exerciseId}. Error: ${error}`
      );
      return [];
    }
  }

  async create(workoutId: string, postSetGroupRequest: PostSetGroupRequest) {
    try {
      await api.post(
        `${WORKOUT_API_PREFIX}/workouts/${workoutId}/setGroups`,
        postSetGroupRequest
      );
    } catch (error) {
      console.error(`Error al crear el setGroup. Error: ${error}`);
    }
  }

  async updateDescription(setGroupId: string, description: string) {
    try {
      await api.patch(
        `${WORKOUT_API_PREFIX}/setGroups/${setGroupId}/description`,
        { description }
      );
    } catch (error) {
      console.error(
        `Error al actualizar la descripción del setGroup con ID: ${setGroupId} a: ${description}. Error: ${error}`
      );
    }
  }

  async updateExercise(setGroupId: string, exerciseId: string) {
    try {
      await api.patch(
        `${WORKOUT_API_PREFIX}/setGroups/${setGroupId}/exercise`,
        { exerciseId }
      );
    } catch (error) {
      console.error(
        `Acualizada al actualizar el exerciseId del setGroup con ID: ${setGroupId} a: ${exerciseId}. Error: ${error}`
      );
    }
  }

  async updateListOrder(setGroupId: string, listOrder: number) {
    try {
      await api.patch(
        `${WORKOUT_API_PREFIX}/setGroups/${setGroupId}/listOrder`,
        { listOrder }
      );
    } catch (error) {
      console.error(
        `Error al actualizar el listOrder del setGroup con ID: ${setGroupId} a: ${listOrder}. Error: ${error}`
      );
    }
  }

  async replaceSetGroupSetsWithSetGroup(
    setGroupDestinationId: string,
    setGroupSourceId: string
  ) {
    try {
      await api.patch(
        `${WORKOUT_API_PREFIX}/setGroups/${setGroupDestinationId}/sets`,
        { setGroupId: setGroupSourceId }
      );
    } catch (error) {
      console.error(
        `Error al insertar las sets del setGroup con ID: ${setGroupSourceId} en el setGroup con ID: ${setGroupDestinationId}. Error: ${error}`
      );
    }
  }

  async delete(setGroupId: string) {
    try {
      await api.delete(`${WORKOUT_API_PREFIX}/setGroups/${setGroupId}`);
    } catch (error) {
      console.error(
        `Error al eliminar el setGroup con ID: ${setGroupId}. Error:${error}`
      );
    }
  }
}

export default new SetGroupService();
