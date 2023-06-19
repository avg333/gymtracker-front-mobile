import { api } from 'src/boot/axios';

const EXERCISES_API_PREFIX = 'exercises-api'
const API = 'exercises'

class ExerciseService {

  async getAll(
    {
      name = null,
      description = null,
      unilateral = null,
      loadType = null,
      muscleSupGroupIds = null,
      muscleGroupIds = null,
      muscleSubGroupIds = null
    } = {}) {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/${API}`, { params: { name, description, unilateral, loadType, muscleSupGroupIds, muscleGroupIds, muscleSubGroupIds } });
      const exercises = res.data;
      return exercises;
    } catch (error) {
      console.error('Error al obtener los ejercicios con los filtros: ' +
        { name, description, unilateral, loadType, muscleSupGroupIds, muscleGroupIds, muscleSubGroupIds } + '.Error:', error)
      return []
    }
  }

  async getById(exerciseId) {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/${API}/${exerciseId}`);
      const exercise = res.data;
      console.debug('Obtenido el ejercicio con ID:' + exercise.id)
      return exercise;
    } catch (error) {
      console.error('Error al obtener el ejercicio con ID: ' + exerciseId + '. Error: ', error)
      return {}
    }
  }
}

export default new ExerciseService()
