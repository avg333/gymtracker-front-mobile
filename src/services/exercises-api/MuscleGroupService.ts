import { api } from 'src/boot/axios';
import {
  GetLoadTypeResponse,
  GetMuscleSupGroupResponse,
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

  async getAllLoadTypes(): Promise<GetLoadTypeResponse[]> {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/loadTypes`);
      return res.data;
    } catch (error) {
      console.error('Error al obtener todos los loadTypes. Error: ', error);
      return [];
    }
  }
}

export default new MuscleGroupService();
