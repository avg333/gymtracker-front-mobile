import { api } from "src/boot/axios";

class MuscleGroupService {
  // Muscle Sup Group
  async getAllMuscleSupGroups() {
    try {
      const res = await api.get("muscleSupGroups")
      return res.data
    } catch (error) {
      console.error("Error al obtener todos los muscleSupGroups. Error: ", error)
      return []
    }
  }

  async getMuscleSupGroup(muscleSupGroupId) {
    try {
      const res = await api.get("muscleSupGroups/" + muscleSupGroupId)
      return res.data
    } catch (error) {
      console.error("Error al obtener el muscleSupGroup con ID=" + muscleSupGroupId + ". Error: ", error)
      return {}
    }
  }

  // Muscle Group
  async getAllMuscleSupGroupMuscleGroups(muscleSupGroupId) { // NO SE USA
    try {
      const res = await api.get("muscleSupGroups/" + muscleSupGroupId + "/muscleGroups")
      return res.data
    } catch (error) {
      console.error("Error al obtener todos los muscleGroups del muscleSupGroup=" + muscleSupGroupId + ". Error: ", error)
      return []
    }
  }

  async getMuscleGroup(muscleGroupId) {
    try {
      const res = await api.get("muscleGroups/" + muscleGroupId)
      return res.data
    } catch (error) {
      console.error("Error al obtener el muscleGroup con ID=" + muscleGroupId + ". Error: ", error)
      return {}
    }
  }

  // Muscle Sub Group
  async getAllMuscleGroupMuscleSubGroups(muscleGroupId) { // NO SE USA
    try {
      const res = await api.get("muscleGroups/" + muscleGroupId + "/muscleSubGroups")
      return res.data
    } catch (error) {
      console.error("Error al obtener todos los muscleSubGroups del muscleGroup=" + muscleGroupId + ". Error: ", error)
      return []
    }
  }

}

export default new MuscleGroupService()
