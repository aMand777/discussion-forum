import { instanceApi } from '../lib/axios';

type User = {
  name: string;
  email: string;
  password: string;
};

export const POST_REGISTER_USER = async (user: User) => {
  try {
    const { data } = await instanceApi.post('/register', user);
    console.log('data===>', data)
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response?.data.message;
  }
};
