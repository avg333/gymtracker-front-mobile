import { api } from 'src/boot/axios';
import { ExerciseFilterRequest } from 'src/types/exercises-api/ExerciseServiceTypes';
import { Exercise } from 'src/types/exercises-api/ExerciseServiceTypes';

const EXERCISES_API_PREFIX = 'exercises-api';
const API = 'exercises';

class ExerciseService {
  async getAll(filter: ExerciseFilterRequest): Promise<Exercise[]> {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/${API}`, {
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
      const exercises = res.data;
      return exercises;
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
      const res = await api.get(`${EXERCISES_API_PREFIX}/${API}/${exerciseId}`);
      const exercise = res.data;
      console.debug('Obtenido el ejercicio con ID:' + exercise.id);
      return exercise;
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
