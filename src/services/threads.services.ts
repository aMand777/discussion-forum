import { instanceApi } from '../lib/axios'

export const GET_ALL_THREADS = async () => {
  try {
    const { data } = await instanceApi.get('/threads')
    return data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response?.data.message
  }
}