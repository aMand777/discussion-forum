import { instanceApi } from '../lib/axios'

export const GET_USER_LOGGED_IN = async () => {
  try {
    const { data } = await instanceApi.get('/users/me')
    return data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response
  }
}

export const GET_ALL_USERS = async () => {
  try {
    const { data } = await instanceApi.get('/users')
    return data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response?.data.message
  }
}