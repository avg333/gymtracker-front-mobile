import { api } from "src/boot/axios";

class MuscleGroupService {
  async getAll(muscleSupGroupId) {
    //Implementar sistema de filtros
    try {
      const res = await api.get("muscleSupGroups/" + muscleSupGroupId + "/muscleGroups")
      return res.data
    } catch (error) {
      console.error("Error al obtener todos los programas con los filtros: " + muscleSupGroupId + ". Error: " + error)
      return []
    }
  }

  async getAllMuscleSupGroups() {
    try {
      const res = await api.get("muscleSupGroups")
      return res.data
    } catch (error) {
      console.error("Error al obtener el programa. Error: " + error)
    }
  }

  async getMuscleSupGroup(muscleSupGroupId) {
    try {
      const res = await api.get("muscleSupGroups/" + muscleSupGroupId)
      return res.data
    } catch (error) {
      console.error("Error al obtener el programa. Error: " + error)
    }
  }

  async getMuscleGroup(muscleGroupId) {
    try {
      const res = await api.get("muscleGroups/" + muscleGroupId)
      return res.data
    } catch (error) {
      console.error("Error al obtener el programa. Error: " + error)
    }
  }

  async getAllMuscleGroupMuscleSubGroups(programId) {
    try {
      const res = await api.get("muscleGroups/" + programId + "/muscleSubGroups")
      return res.data
    } catch (error) {
      console.error("Error al obtener el programa con ID: " + programId + ". Error: " + error)
    }
  }

}

export default new MuscleGroupService()
