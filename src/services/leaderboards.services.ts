import { instanceApi } from '../lib/axios';

export const GET_LEADERBOARDS = async () => {
  try {
    const { data } = await instanceApi.get('/leaderboards')
    return data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response
  }
}