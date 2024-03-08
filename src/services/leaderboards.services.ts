/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceApi } from '../lib/axios.ts';

// eslint-disable-next-line import/prefer-default-export
export const GET_LEADERBOARDS = async () => {
  try {
    const { data } = await instanceApi.get('/leaderboards');
    return data;
  } catch (error: any) {
    throw error.response;
  }
};
