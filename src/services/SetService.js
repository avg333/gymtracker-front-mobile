import { api } from "src/boot/axios";
import { processAxiosResponse, processAxiosError } from "src/utils/responseUtils"

const API = "sets"

class SetService {

  async getAllSetGroupSets(setGroupId, filter) {
    //Implementar sistema de filtros
    try {
      const res = await api.get("setGroups/" + setGroupId + "/sets")
      return processAxiosResponse(res)
    } catch (error) {
      console.error("Error al obtener todos las sesiones del serGroup " + setGroupId + " con los filtros: " + filter + ". Error: " + error)
      return processAxiosError(error)
    }
  }

  async getById(idSet) {
    try {
      const res = await api.get(API + "/" + idSet)
      return processAxiosResponse(res)
    } catch (error) {
      console.error("Error al obtener la sesión con ID: " + idSet + ". Error: " + error)
      return processAxiosError(error)
    }
  }

  async getSetDefaultWeight(setGroupId) {
    try {
      const res = await api.get("setGroups/" + setGroupId + "/sets/newSet")
      return res.data
    } catch (error) {
      console.error("Error al obtener la set por defecto para el setGroup " + setGroupId + ". Error: " + error)
    }
  }

  async create(setGroupId, dataSet) {
    try {
      const res = await api.post("setGroups/" + setGroupId + "/sets", dataSet)
      return res.data
    } catch (error) {
      console.error("Error al crear la sesión con los datos: " + dataSet + ". Error: " + error)
    }
  }

  async update(idSet, dataSet) {
    try {
      const res = await api.put(API + "/" + idSet, dataSet)
      return res.data
    } catch (error) {
      console.error("Error al actualizar la sesión con ID: " + idSet + " con los datos: " + dataSet + ". Error: " + error)
    }
  }

  async delete(idSet) {
    try {
      await api.delete(API + "/" + idSet)
      return true
    } catch (error) {
      console.error("Error al eliminar la sesión con ID: " + idSet + ". Error: " + error)
    }
  }
}

export default new SetService()
