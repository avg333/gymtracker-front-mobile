import { api } from "src/boot/axios";

class EnumService {
  async getAll() {
    //Implementar sistema de filtros
    try {
      const res = await api.get("loadTypes")
      return res.data
    } catch (error) {
      console.error("Error al obtener todos los programas con los filtros. Error: " + error)
      return []
    }
  }
}

export default new EnumService()
