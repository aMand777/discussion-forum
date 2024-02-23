/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { GET_USER_LOGGED_IN } from '../../services/users.services'
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

export type SetPreloadAction = Action<typeof ActionType.SET_IS_PRELOAD> & {
  payload: {
    isPreload: boolean;
  };
};

function setIsPreloadActionCreator(isPreload: boolean) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch: Dispatch<UnknownAction>) => {
    try {
      // preload process
      const authUser = await GET_USER_LOGGED_IN();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // fallback process
      dispatch(setAuthUserActionCreator(null));
    } finally {
      // end preload process
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
