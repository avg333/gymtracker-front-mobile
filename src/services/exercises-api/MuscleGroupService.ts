import { api } from 'src/boot/axios';
import {
  GetLoadTypeResponse,
  GetMuscleSupGroupResponse,
  GetMuscleSubGroupResponse,
  GetMuscleGroupResponse,
} from 'src/types/exercises-api/MuscleGroupServiceTypes';

const EXERCISES_API_PREFIX = 'exercises-api';

class MuscleGroupService {
  // Muscle Sup Group
  async getAllMuscleSupGroups(): Promise<GetMuscleSupGroupResponse[]> {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/muscleSupGroups`);
      return res.data;
    } catch (error) {
      console.error(
        'Error al obtener todos los muscleSupGroups. Error: ',
        error
      );
      return [];
    }
  }

  // Muscle Group
  async getAllMuscleSupGroupMuscleGroups(
    muscleSupGroupId: string
  ): Promise<GetMuscleGroupResponse[]> {
    // NO SE USA
    try {
      const res = await api.get(
        `${EXERCISES_API_PREFIX}/muscleSupGroups/${muscleSupGroupId}/muscleGroups`
      );
      return res.data;
    } catch (error) {
      console.error(
        'Error al obtener todos los muscleGroups del muscleSupGroup=' +
          muscleSupGroupId +
          '. Error: ',
        error
      );
      return [];
    }
  }

  async getAllMuscleGroups(): Promise<GetMuscleGroupResponse[]> {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/muscleGroups`);
      return res.data;
    } catch (error) {
      console.error('Error al obtener todos los muscleGroups. Error: ', error);
      return [];
    }
  }

  // Muscle Sub Group
  async getAllMuscleGroupMuscleSubGroups(
    muscleGroupId: string
  ): Promise<GetMuscleSubGroupResponse[]> {
    // NO SE USA
    try {
      const res = await api.get(
        `${EXERCISES_API_PREFIX}/muscleGroups/${muscleGroupId}/muscleSubGroups`
      );
      return res.data;
    } catch (error) {
      console.error(
        'Error al obtener todos los muscleSubGroups del muscleGroup=' +
          muscleGroupId +
          '. Error: ',
        error
      );
      return [];
    }
  }

  async getAllLoadTypes(): Promise<GetLoadTypeResponse[]> {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/loadTypes`);
      return res.data;
    } catch (error) {
      console.error('Error al obtener todos los muscleGroups. Error: ', error);
      return [];
    }
  }
}

export default new MuscleGroupService();
