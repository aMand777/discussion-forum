/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios.ts';

const leaderboards = (() => {
  async function getAll() {
    try {
      const { data } = await instanceApi.get('/leaderboards');
      return data;
    } catch (error: any) {
      throw error.response;
    }
  }

  return { getAll };
})();

export default leaderboards;
