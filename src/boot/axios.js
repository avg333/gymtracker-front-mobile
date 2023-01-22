import axios from "axios";
import { useLoginStore } from "stores/login-store";
import { Loading } from 'quasar'

const localUrl = "http://192.168.1.90:8081/api/"
const preProdUrl = "https://gymtracker-back.fly.dev/api/"

const api = axios.create({ baseURL: process.env.DEV ? localUrl : preProdUrl });

api.interceptors.request.use((request) => {
  Loading.show()
  const useStore = useLoginStore()
  const authHeader = useStore.getAuthHeader
  if (authHeader) {
    request.headers.Authorization = authHeader
  }
  return request
})

api.interceptors.response.use((response) => {
  Loading.hide()
  return response;
}, (error) => {
  Loading.hide()
  return Promise.reject(error);
});

export { api };
