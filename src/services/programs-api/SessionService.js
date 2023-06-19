import { api } from 'src/boot/axios';

const API = 'sessions'

class SessionService {

  async getAllProgramSessions(programId, page, size, sortParam, sortDesc,) {
    //Implementar sistema de filtros
    try {
      const res = await api.get('programs/' + programId + '/sessions', { params: { page, size, sortParam, sortDesc } })
      return res.data
    } catch (error) {
      console.error('Error al obtener todos las sesiones del programa ' + programId + ': ' + error)
      return []
    }
  }

  async getById(idSession) {
    try {
      const res = await api.get(API + '/' + idSession)
      return res.data
    } catch (error) {
      console.error('Error al obtener la sesión con ID: ' + idSession + '. Error: ' + error)
    }
  }

  async create(programId, dataSession) {
    try {
      const res = await api.post('programs/' + programId + '/sessions', dataSession)
      return res.data
    } catch (error) {
      console.error('Error al crear la sesión con los datos: ' + dataSession + '. Error: ' + error)
    }
  }

  async update(idSession, dataSession) {
    try {
      const res = await api.put(API + '/' + idSession, dataSession)
      return res.data
    } catch (error) {
      console.error('Error al actualizar la sesión con ID: ' + idSession + ' con los datos: ' + dataSession + '. Error: ' + error)
    }
  }

  async delete(idSession) {
    try {
      await api.delete(API + '/' + idSession)
      return true
    } catch (error) {
      console.error('Error al eliminar la sesión con ID: ' + idSession + '. Error: ' + error)
    }
  }
}

export default new SessionService()
