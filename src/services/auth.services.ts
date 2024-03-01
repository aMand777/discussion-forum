/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios';

interface Authentication {
  email: string
  password: string
}

export const POST_LOGIN = async (auth: Authentication) => {
  try {
    const { data } = await instanceApi.post('/login', auth);
    return data;
  } catch (error: any) {
    throw error.response;
  }
}