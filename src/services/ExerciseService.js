import { api } from "src/boot/axios";

const API = "exercises/"

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
      const res = await api.get(API, { params: { name, description, unilateral, loadType, muscleSupGroupIds, muscleGroupIds, muscleSubGroupIds } });
      return res.data;
    } catch (error) {
      console.error("Error al obtener los ejercicios con los filtros: " +
        { name, description, unilateral, loadType, muscleSupGroupIds, muscleGroupIds, muscleSubGroupIds } + ".Error:", error)
      return []
    }
  }

  async getById(idExercise) {
    try {
      const res = await api.get(API + idExercise);
      return res.data;
    } catch (error) {
      console.error("Error al obtener el ejercicio con ID: " + idExercise + ". Error: ", error)
      return {}
    }
  }
}

export default new ExerciseService()
