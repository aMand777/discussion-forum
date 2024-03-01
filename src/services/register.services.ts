/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios';

interface User {
  name: string;
  email: string;
  password: string;
}

export const POST_REGISTER_USER = async (user: User) => {
  try {
    const { data } = await instanceApi.post('/register', user);
    return data;
  } catch (error: any) {
    throw error.response?.data.message;
  }
};
