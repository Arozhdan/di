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
    console.log("Error from axios interceptor: ", error);
    return Promise.reject(error)
  },
)