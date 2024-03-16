/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios.ts';

interface Authentication {
  email: string;
  password: string;
}

const auth = (() => {
  async function postLogin(user: Authentication) {
    try {
      const { data } = await instanceApi.post('/login', user);
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  return { postLogin };
})();

export default auth;
