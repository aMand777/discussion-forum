/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios.ts';

interface Authentication {
  email: string;
  password: string;
}

// eslint-disable-next-line import/prefer-default-export
export const POST_LOGIN = async (auth: Authentication) => {
  try {
    const { data } = await instanceApi.post('/login', auth);
    return data;
  } catch (error: any) {
    throw error.response;
  }
};
