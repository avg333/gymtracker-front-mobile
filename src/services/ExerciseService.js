import { api } from "src/boot/axios";

const API = "exercises"

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
      const res = await api.get(API + "/" + idExercise);
      return res.data;
    } catch (error) {
      console.error("Error al obtener el ejercicio con ID: " + idExercise + ". Error: ", error)
      return {}
    }
  }

  async create(exerciseData) {
    try {
      const res = await api.post(API, exerciseData)
      return res.data
    } catch (error) {
      console.error("Error al crear el ejercicio con los datos: " + exerciseData + ". Error: ", error)
    }
  }

  async update(exerciseId, exerciseData) {
    try {
      const res = await api.put(API + "/" + exerciseId, exerciseData)
      return res.data
    } catch (error) {
      console.error("Error al actualizar el ejercicio con ID: " + exerciseId + " con los datos: " + exerciseData + ". Error: ", error)
    }
  }

  async delete(exerciseId) {
    try {
      await api.delete(API + "/" + exerciseId)
      return true
    } catch (error) {
      console.error("Error al eliminar el ejercicio con ID: " + exerciseId + ". Error: " + error)
    }
  }
}

export default new ExerciseService()
