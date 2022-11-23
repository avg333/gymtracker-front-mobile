import { api } from "src/boot/axios";

const API = "programs"

class ProgramService {
  async countAll(userId) {
    try {
      const res = await api.get("users/" + userId + "/programs/count")
      return res.data
    } catch (error) {
      console.error("Error al obtener todos los programas: " + error)
      return []
    }
  }

  async getAll(userId, page, size, sortParam, sortDesc) {
    try {
      const res = await api.get("users/" + userId + "/programs", { params: { page, size, sortParam, sortDesc } })
      return res.data
    } catch (error) {
      console.error("Error al obtener todos los programas: " + error)
      return []
    }
  }

  async getById(programId) {
    try {
      const res = await api.get(API + "/" + programId)
      return res.data
    } catch (error) {
      console.error("Error al obtener el programa con ID: " + programId + ". Error: " + error)
    }
  }

  async create(userId, dataProgram) {
    try {
      const res = await api.post(process.env.VUE_APP_BASE_URL_API + "users/" + userId + "/programs", dataProgram)
      return res.data
    } catch (error) {
      console.error("Error al crear el programa con los datos: " + dataProgram + ". Error: " + error)
    }
  }

  async update(programId, dataProgram) {
    try {
      const res = await api.put(API + "/" + programId, dataProgram)
      return res.data
    } catch (error) {
      console.error("Error al actualizar el programa con ID: " + programId + " con los datos: " + dataProgram + ". Error: " + error)
    }
  }

  async delete(programId) {
    try {
      await api.delete("/" + programId)
      return true
    } catch (error) {
      console.error("Error al eliminar el programa con ID: " + programId + ". Error: " + error)
    }
  }
}

export default new ProgramService()
