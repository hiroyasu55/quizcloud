import axios from 'axios'

const BASE_CONFIG = {
  baseURL: process.env.API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`
  }
}

class Model {
  constructor (data) {
    if (!data) return
    if (data.createdAt) this.createdAt = new Date(data.createdAt)
    if (data.updatedAt) this.updatedAt = new Date(data.updatedAt)
  }

  static requestGet (url, params) {
    const config = Object.assign(BASE_CONFIG, {
      params: params
    })
    return axios.get(url, config)
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error(`Request error, url=${url}, code=${resp.status}`)
        }
        return resp.data
      })
  }

  static requestPut (url, data) {
    const config = Object.assign(BASE_CONFIG, {})
    return axios.put(url, data, config)
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error(`Request error, url=${url}, code=${resp.status}`)
        }
        return resp.data
      })
  }
}

export default Model
