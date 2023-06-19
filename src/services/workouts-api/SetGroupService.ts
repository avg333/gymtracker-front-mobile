import { api } from 'src/boot/axios';
import {
  PostSetGroupRequest,
  PostSetGroupResponse,
  UpdateSetGroupListOrderResponse,
  UpdateSetGroupSetsResponse,
  GetSetGroupResponse,
} from 'src/types/workouts-api/SetGroupServiceTypes';

const WORKOUT_API_PREFIX = 'workout-api';
const SETGRUP_PREFIX = '/setGroups';

class SetGroupService {
  async getById(
    setGroupId: string,
    full: boolean
  ): Promise<GetSetGroupResponse | null> {
    try {
      full = true; //TODO Eliminar esto
      const res = await api.get(
        `${WORKOUT_API_PREFIX}${SETGRUP_PREFIX}/${setGroupId}`,
        { params: { full } }
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

  async create(
    workoutId: string,
    createSetGroupRequest: PostSetGroupRequest
  ): Promise<PostSetGroupResponse | null> {
    try {
      const res = await api.post(
        `${WORKOUT_API_PREFIX}/workouts/${workoutId}${SETGRUP_PREFIX}`,
        createSetGroupRequest
      );
      const newSetGroup: PostSetGroupResponse = res.data;
      console.debug(`Creado el setGroup con ID: ${newSetGroup.id}`);
      return newSetGroup;
    } catch (error) {
      console.error(
        `Error al crear el setGroup con los datos: ${createSetGroupRequest}. Error: ${error}`
      );
      return null;
    }
  }

  async updateDescription(
    setGroupId: string,
    description: string
  ): Promise<string | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${SETGRUP_PREFIX}/${setGroupId}/description`,
        { description }
      );
      const newDescription: string = res.data.description;
      console.debug(
        `Acualizada la descripción del setGroup con ID: ${setGroupId} a: ${newDescription}`
      );
      return newDescription;
    } catch (error) {
      console.error(
        `Error al actualizar la descripción del setGroup con ID: ${setGroupId} a: ${description}. Error: ${error}`
      );
      return null;
    }
  }

  async updateExercise(
    setGroupId: string,
    exerciseId: string
  ): Promise<string | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${SETGRUP_PREFIX}/${setGroupId}/exercise`,
        { exerciseId }
      );
      const newExerciseId = res.data.exerciseId;
      console.debug(
        `Acualizada el exerciseId del setGroup con ID: ${setGroupId} a: ${newExerciseId}`
      );
      return newExerciseId;
    } catch (error) {
      console.error(
        `Acualizada al actualizar el exerciseId del setGroup con ID: ${setGroupId} a: ${exerciseId}. Error: ${error}`
      );
      return null;
    }
  }

  async updateListOrder(
    setGroupId: string,
    listOrder: number
  ): Promise<UpdateSetGroupListOrderResponse | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${SETGRUP_PREFIX}/${setGroupId}/listOrder`,
        { listOrder }
      );
      const newSetGroups: UpdateSetGroupListOrderResponse = res.data.setGroups;
      console.debug(
        `Acualizado el listOrder del setGroup con ID: ${setGroupId} a: ${listOrder}`
      );
      return newSetGroups;
    } catch (error) {
      console.error(
        `Error al actualizar el listOrder del setGroup con ID: ${setGroupId} a: ${listOrder}. Error: ${error}`
      );
      return null;
    }
  }

  async delete(setGroupId: string): Promise<boolean> {
    try {
      await api.delete(`${WORKOUT_API_PREFIX}${SETGRUP_PREFIX}/${setGroupId}`);
      console.debug(`Eliminado el setGroup con ID: ${setGroupId}`);
      return true;
    } catch (error) {
      console.error(
        `Error al eliminar el setGroup con ID: ${setGroupId}. Error:${error}`
      );
      return false;
    }
  }

  //-----------------ESPECIALES

  async getExerciseHistory(
    userId: string,
    exerciseId: string
  ): Promise<GetSetGroupResponse[] | null> {
    try {
      const res = await api.get(
        `${WORKOUT_API_PREFIX}/users/${userId}/exercises/${exerciseId}${SETGRUP_PREFIX}`
      );
      const setGroups: GetSetGroupResponse[] = res.data;
      console.debug(
        `Obtenido setGroups del user con ID: ${userId} y del ejercicio con ID: ${exerciseId}`
      );
      return setGroups;
    } catch (error) {
      console.error(
        `Error al obtener el ultimo setGroup del usuario: ${userId} y el ejercicio: ${exerciseId}. Error: ${error}`
      );
      return null;
    }
  }

  async replaceSetGroupSetsWithSetGroup(
    setGroupDestinationId: string,
    setGroupSourceId: string
  ): Promise<UpdateSetGroupSetsResponse[] | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${SETGRUP_PREFIX}/${setGroupDestinationId}/sets`,
        { setGroupId: setGroupSourceId }
      );
      const newSets: UpdateSetGroupSetsResponse[] = res.data.sets;
      console.debug(
        `Insertadas las sets del setGroup con ID: ${setGroupSourceId} en el setGroup con ID: ${setGroupDestinationId}`
      );
      return newSets;
    } catch (error) {
      console.error(
        `Error al insertar las sets del setGroup con ID: ${setGroupSourceId} en el setGroup con ID: ${setGroupDestinationId}. Error: ${error}`
      );
      return null;
    }
  }
}

export default new SetGroupService();
