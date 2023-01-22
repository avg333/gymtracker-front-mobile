import { api } from "src/boot/axios";

const API = "measures/"

class MeasureService {
  async getAllFromUser(userId, filter) {
    //Implementar sistema de filtros
    try {
      const res = await api.get("users/" + userId + "/measures", { headers: authHeader() })
      return res.data
    } catch (error) {
      console.error("Error al obtener todos los measures con los filtros: " + filter + ". Error: " + error)
      return []
    }
  }

  async getById(idMeasure) {
    try {
      const res = await api.get(API + "/" + idMeasure, { headers: authHeader() })
      return res.data
    } catch (error) {
      console.error("Error al obtener el measure con ID: " + idMeasure + ". Error: " + error)
    }
  }

  async create(dataMeasure) {
    try {
      const res = await api.post(API, dataMeasure, { headers: authHeader() })
      return res.data
    } catch (error) {
      console.error("Error al crear el measure con los datos: " + dataMeasure + ". Error: " + error)
    }
  }

  async update(idMeasure, dataMeasure) {
    try {
      const res = await api.put(API + "/" + idMeasure, dataMeasure, { headers: authHeader() })
      return res.data
    } catch (error) {
      console.error("Error al actualizar el measure con ID: " + idMeasure + " con los datos: " + dataMeasure + ". Error: " + error)
    }
  }

  async delete(idMeasure) {
    try {
      await api.delete(API + "/" + idMeasure, { headers: authHeader() })
      return true
    } catch (error) {
      console.error("Error al eliminar el measure con ID: " + idMeasure + ". Error: " + error)
    }
  }
}

export default new MeasureService()
