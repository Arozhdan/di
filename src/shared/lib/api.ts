import axios from "axios"

export const $api = axios.create({
  baseURL: __API__,
  withCredentials: true,
})

// interceptors
$api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      alert("Unauthorized, the page will be reloaded")
      window.location.reload()
    }
    return Promise.reject(error)
  },
)