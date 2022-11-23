import axios from "axios";
import authHeader from '@/utils/auth-header'

const API = process.env.VUE_APP_BASE_URL_API + "measures"

class MeasureService {
    async getAllFromUser(userId, filter) {
        //Implementar sistema de filtros
        try {
            const res = await axios.get(process.env.VUE_APP_BASE_URL_API + "users/" + userId + "/measures", { headers: authHeader() })
            return res.data
        } catch (error) {
            console.error("Error al obtener todos los measures con los filtros: " + filter + ". Error: " + error)
            return []
        }
    }

    async getById(idMeasure) {
        try {
            const res = await axios.get(API + "/" + idMeasure, { headers: authHeader() })
            return res.data
        } catch (error) {
            console.error("Error al obtener el measure con ID: " + idMeasure + ". Error: " + error)
        }
    }

    async create(dataMeasure) {
        try {
            const res = await axios.post(API, dataMeasure, { headers: authHeader() })
            return res.data
        } catch (error) {
            console.error("Error al crear el measure con los datos: " + dataMeasure + ". Error: " + error)
        }
    }

    async update(idMeasure, dataMeasure) {
        try {
            const res = await axios.put(API + "/" + idMeasure, dataMeasure, { headers: authHeader() })
            return res.data
        } catch (error) {
            console.error("Error al actualizar el measure con ID: " + idMeasure + " con los datos: " + dataMeasure + ". Error: " + error)
        }
    }

    async delete(idMeasure) {
        try {
            await axios.delete(API + "/" + idMeasure, { headers: authHeader() })
            return true
        } catch (error) {
            console.error("Error al eliminar el measure con ID: " + idMeasure + ". Error: " + error)
        }
    }
}

export default new MeasureService()