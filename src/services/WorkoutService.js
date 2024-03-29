import { api } from "src/boot/axios";

const API = "workouts"

class WorkoutService {

  async getAllWorkoutDatesByUser(userId) {
    try {
      const res = await api.get("/users/" + userId + "/workouts/dates")
      return res.data
    } catch (error) {
      console.error("Error al obtener las fechas de los workouts del user: " + userId + ". Error: " + error)
    }
  }

  async getAllWorkoutDatesWithExerciseByUser(userId, exerciseId) {
    try {
      const res = await api.get("/users/" + userId + "/exercises/" + exerciseId + "/workouts/dates")
      return res.data
    } catch (error) {
      console.error("Error al obtener las fechas de los workouts del user: " + userId + ". Error: " + error)
    }
  }

  async getById(workoutId, depth) {
    try {
      const res = await api.get(API + "/" + workoutId, { params: { depth } })
      return res.data
    } catch (error) {
      console.error("Error al obtener el programa con ID: " + workoutId + ". Error: " + error)
    }
  }

  async create(userId, dataWorkout) {
    try {
      const res = await api.post("users/" + userId + "/workouts", dataWorkout)
      return res.data
    } catch (error) {
      console.error("Error al crear el programa con los datos: " + dataWorkout + ". Error: " + error)
    }
  }

  async copySetGroupsFromWorkoutToWorkout(workoutDestinationId, workoutSourceId) {
    try {
      const res = await api.post("/workouts/" + workoutDestinationId + "/addSetGroupsFrom/workouts/" + workoutSourceId)
      return res.data
    } catch (error) {
      console.error("Error al copiar en el workout: " + workoutDestinationId + " los setGroups del workout:" + workoutSourceId + ". Error: " + error)
    }
  }

  async copySetGroupsFromSessionToWorkout(workoutDestinationId, sessionSourceId) {
    try {
      const res = await api.post("/workouts/" + workoutDestinationId + "/addSetGroupsFrom/sessions/" + sessionSourceId)
      return res.data
    } catch (error) {
      console.error("Error al copiar en el workout: " + workoutDestinationId + " los setGroups de la sesion:" + sessionSourceId + ". Error: " + error)
    }
  }

  async update(workoutId, dataWorkout) {
    try {
      const res = await api.put(API + "/" + workoutId, dataWorkout)
      return res.data
    } catch (error) {
      console.error("Error al actualizar el programa con ID: " + workoutId + " con los datos: " + dataWorkout + ". Error: " + error)
    }
  }

  async delete(workoutId) {
    try {
      await api.delete(API + "/" + workoutId)
      return true
    } catch (error) {
      console.error("Error al eliminar el programa con ID: " + workoutId + ". Error: " + error)
    }
  }
}

export default new WorkoutService()
