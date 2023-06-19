import { api } from 'src/boot/axios';

const EXERCISES_API_PREFIX = 'exercises-api'

class MuscleGroupService {
  // Muscle Sup Group
  async getAllMuscleSupGroups() {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/muscleSupGroups`)
      return res.data
    } catch (error) {
      console.error('Error al obtener todos los muscleSupGroups. Error: ', error)
      return []
    }
  }

  // Muscle Group
  async getAllMuscleSupGroupMuscleGroups(muscleSupGroupId) { // NO SE USA
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/muscleSupGroups/${muscleSupGroupId}/muscleGroups`)
      return res.data
    } catch (error) {
      console.error('Error al obtener todos los muscleGroups del muscleSupGroup=' + muscleSupGroupId + '. Error: ', error)
      return []
    }
  }

  async getAllMuscleGroups() {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/muscleGroups`)
      return res.data
    } catch (error) {
      console.error('Error al obtener todos los muscleGroups. Error: ', error)
      return []
    }
  }

  // Muscle Sub Group
  async getAllMuscleGroupMuscleSubGroups(muscleGroupId) { // NO SE USA
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/muscleGroups/${muscleGroupId}/muscleSubGroups`)
      return res.data
    } catch (error) {
      console.error('Error al obtener todos los muscleSubGroups del muscleGroup=' + muscleGroupId + '. Error: ', error)
      return []
    }
  }

  async getAllLoadTypes() {
    try {
      const res = await api.get(`${EXERCISES_API_PREFIX}/loadTypes`)
      return res.data
    } catch (error) {
      console.error('Error al obtener todos los muscleGroups. Error: ', error)
      return []
    }
  }

}

export default new MuscleGroupService()
