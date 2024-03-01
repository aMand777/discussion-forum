/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios';

export const GET_LEADERBOARDS = async () => {
  try {
    const { data } = await instanceApi.get('/leaderboards')
    return data
  } catch (error: any) {
    throw error.response
  }
}