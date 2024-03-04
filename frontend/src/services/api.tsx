import axios from 'axios'

const api = axios.create({
  baseURL: 'https://caderno-de-notas.onrender.com'
})

export default api