import { ActionType, SetResponseStatus, Status } from './action'

const InitialStatus : Status = {
  isLoading: false,
  message: '',
}

function responseStatusReducer(responseStatus = InitialStatus, action: SetResponseStatus): Status {
  switch (action.type) {
    case ActionType.RESPONSE_STATUS:
      return action.payload;
    default:
      return responseStatus;
  }
}

export default responseStatusReducer