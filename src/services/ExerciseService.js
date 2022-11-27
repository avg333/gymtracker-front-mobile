import { api } from "src/boot/axios";

const API = "exercises/"

class ExerciseService {

  async getAll({ name = null, description = null, unilateral = null, loadType = null, muscleSupGroupIds = null, muscleGroupIds = null, muscleSubGroupIds = null } = {}) {
    //Implementar sistema de filtros
    try {
      const res = await api.get(API, { params: { name, description, unilateral, loadType, muscleSupGroupIds, muscleGroupIds, muscleSubGroupIds } })
      return res.data
    } catch (error) {
      return []
    }
  }

  async getById(idExercise) {
    try {
      const res = await api.get(API + idExercise)
      return res.data
    } catch (error) {
      console.error("Error al obtener la sesión con ID: " + idExercise + ". Error: " + error)
    }
  }
}

export default new ExerciseService()
