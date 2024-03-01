/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios'

export const GET_USER_LOGGED_IN = async () => {
  try {
    const { data } = await instanceApi.get('/users/me')
    return data
  } catch (error: any) {
    throw error.response
  }
}

export const GET_ALL_USERS = async () => {
  try {
    const { data } = await instanceApi.get('/users')
    return data
  } catch (error: any) {
    throw error.response
  }
}