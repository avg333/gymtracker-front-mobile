import { api } from 'src/boot/axios';
import {
  GetNewSetDataResponse,
  GetSetResponse,
  PostSetRequest,
  UpdateSetDataRequest,
} from 'src/types/workouts-api/SetServiceTypes';

const WORKOUT_API_PREFIX = 'workout-api';

class SetService {
  async getSetDefaultWeight(
    setGroupId: string
  ): Promise<GetNewSetDataResponse | null> {
    try {
      const res = await api.get(
        `${WORKOUT_API_PREFIX}/setGroups/${setGroupId}/sets/newSet`
      );
      return res.data;
    } catch (error) {
      console.error(
        `Error al obtener la set por defecto para el setGroup con ID: ${setGroupId}. Error: ${error}`
      );
      return null;
    }
  }

  async getById(setId: string): Promise<GetSetResponse | null> {
    try {
      const res = await api.get(`${WORKOUT_API_PREFIX}/sets/${setId}`);
      return res.data;
    } catch (error) {
      console.error(`Error al obtener la set con ID: ${setId}. Error:${error}`);
      return null;
    }
  }

  async create(setGroupId: string, postSetRequest: PostSetRequest) {
    try {
      await api.post(
        `${WORKOUT_API_PREFIX}/setGroups/${setGroupId}/sets`,
        postSetRequest
      );
    } catch (error) {
      console.error(`Error al crear la set. Error:${error}`);
    }
  }

  async updateData(setId: string, updateSetDataRequest: UpdateSetDataRequest) {
    try {
      await api.patch(
        `${WORKOUT_API_PREFIX}/sets/${setId}`,
        updateSetDataRequest
      );
    } catch (error) {
      console.error(
        `Error al actualizar los datos de la set con ID: ${setId}. Error: ${error}`
      );
    }
  }

  async updateListOrder(setId: string, listOrder: number) {
    try {
      await api.patch(`${WORKOUT_API_PREFIX}/sets/${setId}`, {
        listOrder,
      });
    } catch (error) {
      console.error(
        `Error al actualizar la listOrder de la set con ID: ${setId} a: ${listOrder}. Error: ${error}`
      );
    }
  }

  async delete(setId: string) {
    try {
      await api.delete(`${WORKOUT_API_PREFIX}/sets/${setId}`);
    } catch (error) {
      console.error(
        `Error al eliminar la set con ID: ${setId}. Error:${error}`
      );
    }
  }
}

export default new SetService();
