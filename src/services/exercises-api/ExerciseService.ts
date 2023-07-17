import { api } from 'src/boot/axios';
import {
  ExerciseFilterRequest,
  Exercise,
  ExerciseSimple,
} from 'src/types/exercises-api/ExerciseServiceTypes';

const EXERCISES_API_PREFIX = 'exercises-api';

class ExerciseService {
  async getAll(filter: ExerciseFilterRequest): Promise<ExerciseSimple[]> {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/exercises/filter`, {
        params: {
          name: filter.name,
          description: filter.description,
          unilateral: filter.unilateral,
          loadType: filter.loadType,
          muscleSupGroupIds: filter.muscleSupGroupIds,
          muscleGroupIds: filter.muscleGroupIds,
          muscleSubGroupIds: filter.muscleSubGroupIds,
        },
      });
      return res.data;
    } catch (error) {
      console.error(
        'Error al obtener los ejercicios con los filtros. Error:',
        error
      );
      return [];
    }
  }

  async getById(exerciseId: string): Promise<Exercise | null> {
    try {
      const res = await api.get(
        `${EXERCISES_API_PREFIX}/exercises/${exerciseId}`
      );
      return res.data;
    } catch (error) {
      console.error(
        'Error al obtener el ejercicio con ID: ' + exerciseId + '. Error: ',
        error
      );
      return null;
    }
  }
}

export default new ExerciseService();
