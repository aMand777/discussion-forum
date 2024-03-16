/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios.ts';

const users = (() => {
  async function getOwnProfile() {
    try {
      const { data } = await instanceApi.get('/users/me');
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  async function getAll() {
    try {
      const { data } = await instanceApi.get('/users');
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  return {
    getAll,
    getOwnProfile,
  };
})();

export default users;
