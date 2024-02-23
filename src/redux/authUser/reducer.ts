import { ActionType, AuthActionTypes, AuthUser } from './action';

function authUserReducer(authUser: AuthUser = null, action: AuthActionTypes): AuthUser | null {
switch (action.type) {
  case ActionType.SET_AUTH_USER:
    if ('payload' in action) {
      return action.payload.authUser;
    }
    return authUser;
  case ActionType.UNSET_AUTH_USER:
    return null;
  default:
    return authUser;
}
}

export default authUserReducer;