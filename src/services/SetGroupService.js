import { api } from "src/boot/axios";

const API = "setGroups"

class SetGroupService {

  async getAllSessionSetGroups(sessionId, filter) {
    //Implementar sistema de filtros
    try {
      const res = await api.get("sessions/" + sessionId + "/setGroups")
      return res.data
    } catch (error) {
      console.error("Error al obtener todos las sesiones del programa " + sessionId + " con los filtros: " + filter + ". Error: " + error)
      return []
    }
  }

  async getAllWorkoutSetGroups(workoutId, filter) {
    //Implementar sistema de filtros
    try {
      const res = await api.get("workouts/" + workoutId + "/setGroups")
      return res.data
    } catch (error) {
      console.error("Error al obtener todos las sesiones del workout " + workoutId + " con los filtros: " + filter + ". Error: " + error)
      return []
    }
  }

  async getById(idSetGroup) {
    try {
      const res = await api.get(API + "/" + idSetGroup)
      return res.data
    } catch (error) {
      console.error("Error al obtener la sesión con ID: " + idSetGroup + ". Error: " + error)
    }
  }

  async create(dataSetGroup) {
    try {
      const res = await api.post(API, dataSetGroup)
      return res.data
    } catch (error) {
      console.error("Error al crear la sesión con los datos: " + dataSetGroup + ". Error: " + error)
    }
  }

  async update(idSetGroup, dataSetGroup) {
    try {
      const res = await api.put(API + "/" + idSetGroup, dataSetGroup)
      return res.data
    } catch (error) {
      console.error("Error al actualizar la sesión con ID: " + idSetGroup + " con los datos: " + dataSetGroup + ". Error: " + error)
    }
  }

  async delete(idSetGroup) {
    try {
      await api.delete(API + "/" + idSetGroup)
      return true
    } catch (error) {
      console.error("Error al eliminar la sesión con ID: " + idSetGroup + ". Error: " + error)
    }
  }
}

export default new SetGroupService()
