
import { api } from '@/api/axios'
export const version = '1.3.8'
export const getConfigJson = (data = {}) => {
  return api.get(`/config.json?t=${new Date().getTime()}`)
}

