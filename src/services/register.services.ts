/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios.ts';

interface User {
  name: string;
  email: string;
  password: string;
}

const register = (() => {
  async function addNewUser(user: User) {
    try {
      const { data } = await instanceApi.post('/register', user);
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  return { addNewUser };
})();

export default register;
