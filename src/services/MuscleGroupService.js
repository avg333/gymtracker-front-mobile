import axios from "axios";
import authHeader from '@/utils/auth-header'

const API = process.env.VUE_APP_BASE_URL_API + "muscleGroups/"

class MuscleGroupService {
    async getAll(filter) {
        //Implementar sistema de filtros
        try {
            const res = await axios.get(API, { headers: authHeader() })
            return res.data
        } catch (error) {
            console.error("Error al obtener todos los programas con los filtros: " + filter + ". Error: " + error)
            return []
        }
    }

    async getAllMuscleGroupMuscleSubGroups(programId) {
        try {
            const res = await axios.get(API + programId + "/muscleSubGroups", { headers: authHeader() })
            return res.data
        } catch (error) {
            console.error("Error al obtener el programa con ID: " + programId + ". Error: " + error)
        }
    }

}

export default new MuscleGroupService()