import { instanceApi } from '../lib/axios';

type Authentication = {
  email: string
  password: string
}

export const POST_LOGIN = async (auth: Authentication) => {
  try {
    const { data } = await instanceApi.post('/login', auth)
    return data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response
  }
}