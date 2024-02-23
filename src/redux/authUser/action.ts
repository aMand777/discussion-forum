import { POST_LOGIN } from '../../services/auth.services'
import { GET_USER_LOGGED_IN } from '../../services/users.services'
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAccessToken, removeAccessToken } from '../../utils/storage';
import { Action, Dispatch, UnknownAction } from '@reduxjs/toolkit';
// import { setResponseStatusCreator } from '../status/action';

// const dispatch = useDispatch();

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

export type AuthUser = {
  data?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null,
  status?: {
    isLoading?: boolean;
    message?: string;
  };
} | null;

export type SetAuthUserAction = Action<typeof ActionType.SET_AUTH_USER> & {
  payload: {
    authUser: AuthUser;
  };
};

export type UnsetAuthUserAction = Action<typeof ActionType.UNSET_AUTH_USER>;

export type AuthActionTypes = SetAuthUserAction | UnsetAuthUserAction;

function setAuthUserActionCreator(authUser: AuthUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

type AuthLogin = {
  email: string
  password: string
}

function asyncSetAuthUser(auth: AuthLogin) {
  return async (dispatch: Dispatch<UnknownAction>) => {
    // dispatch(setResponseStatusCreator({isLoading: true}))
    dispatch(showLoading());
    try {
      //   dispatch(setAuthUserActionCreator({status: {isLoading: true},
      // }));
      const response = await POST_LOGIN(auth);
      const { token } = response.data;
      setAccessToken('accessToken', token);
      const isLogin = await GET_USER_LOGGED_IN();
      const { user } = isLogin.data
      dispatch(setAuthUserActionCreator({data: user}));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { message } = error.data;
      dispatch(setAuthUserActionCreator({ status: { isLoading: false, message }, data: null }));
      // dispatch(setResponseStatusCreator({isLoading: true}))
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch: Dispatch<UnknownAction>) => {
    dispatch(unsetAuthUserActionCreator());
    removeAccessToken('accessToken');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
