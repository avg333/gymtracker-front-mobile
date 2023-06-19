import { api } from 'src/boot/axios';
import {
  CreateSetRequest,
  CreateSetResponse,
  UpdateSetDataRequest,
  UpdateSetDataResponse,
  GetSetResponse,
} from 'src/types/workouts-api/SetServiceTypes';

const WORKOUT_API_PREFIX = 'workout-api';
const SET_PREFIX = '/sets';

class SetService {
  async getById(setId: string): Promise<GetSetResponse | null> {
    try {
      const res = await api.get(`${WORKOUT_API_PREFIX}${SET_PREFIX}/${setId}`);
      const set: GetSetResponse = res.data;
      console.debug(`Obtenida set con ID: ${set.id}`);
      return set;
    } catch (error) {
      console.error(`Error al crear la set con ID: ${setId}. Error:${error}`);
      return null;
    }
  }

  async create(
    setGroupId: string,
    createSetRequest: CreateSetRequest
  ): Promise<CreateSetResponse | null> {
    try {
      const res = await api.post(
        `${WORKOUT_API_PREFIX}/setGroups/${setGroupId}${SET_PREFIX}`,
        createSetRequest
      );
      const newSet: CreateSetResponse = res.data;
      console.debug(`Creada set con ID: ${newSet.id}`);
      return newSet;
    } catch (error) {
      console.error(
        `Error al crear la set con los datos: ${createSetRequest}. Error:${error}`
      );
      return null;
    }
  }

  async updateData(
    setId: string,
    updateSetDataRequest: UpdateSetDataRequest
  ): Promise<UpdateSetDataResponse | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${SET_PREFIX}/${setId}`,
        updateSetDataRequest
      );
      const newSetData: UpdateSetDataResponse = res.data;
      console.debug(
        `Actualizados los datos de la set con ID: ${setId} a ${newSetData}`
      );
      return newSetData;
    } catch (error) {
      console.error(
        `Error al actualizar los datos de la set con ID: ${setId} con los datos: ${updateSetDataRequest}. Error: ${error}`
      );
      return null;
    }
  }

  async updateListOrder(
    setId: string,
    listOrder: number
  ): Promise<GetSetResponse[] | null> {
    try {
      const res = await api.patch(
        `${WORKOUT_API_PREFIX}${SET_PREFIX}/${setId}`,
        { listOrder }
      );
      const newSets: GetSetResponse[] = res.data.sets;
      console.debug(
        `Actualizados la listOrder de la set con ID: ${setId} a ${listOrder}`
      );
      return newSets;
    } catch (error) {
      console.error(
        `Error al actualizar la listOrder de la set con ID: ${setId} a: ${listOrder}. Error: ${error}`
      );
      return null;
    }
  }

  async delete(setId: string): Promise<boolean> {
    try {
      await api.delete(`${WORKOUT_API_PREFIX}${SET_PREFIX}/${setId}`);
      console.debug(`Eliminada la set con ID: ${setId}`);
      return true;
    } catch (error) {
      console.error(
        `Error al eliminar la set con ID: ${setId}. Error:${error}`
      );
      return false;
    }
  }

  //Especiales

  async getSetDefaultWeight(
    setGroupId: string
  ): Promise<GetSetResponse | null> {
    try {
      const res = await api.get(
        `${WORKOUT_API_PREFIX}/setGroups/${setGroupId}${SET_PREFIX}/newSet`
      );
      const setDefaultData: GetSetResponse = res.data;
      console.debug(`Obtenida set con ID: ${setDefaultData.id}`);
      return setDefaultData;
    } catch (error) {
      console.error(
        `Error al obtener la set por defecto para el setGroup con ID: ${setGroupId}. Error: ${error}`
      );
      return null;
    }
  }
}

export default new SetService();
