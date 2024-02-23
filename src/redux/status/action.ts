import { Action } from '@reduxjs/toolkit';

const ActionType = {
  RESPONSE_STATUS: 'RESPONSE_STATUS',
};

export type SetResponseStatus = Action<typeof ActionType.RESPONSE_STATUS> & {
  payload: {
    isLoading: boolean;
    message: string;
  };
};

export type Status = {
  isLoading: boolean;
  message: string;
};

function setResponseStatusCreator(responseStatus: Status) {
  return {
    type: ActionType.RESPONSE_STATUS,
    payload: {
      responseStatus,
    },
  };
}

// function setResponseStatus(status: Status) {
//   return (dispatch: Dispatch<UnknownAction>) => {
//     dispatch(setResponseStatusCreator(status));
//   };
// }

export { setResponseStatusCreator, ActionType };
