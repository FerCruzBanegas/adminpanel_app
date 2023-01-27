import {
  ADMIN_LOAD_COMMON_SETTINGS_SUCCESS,
  ADMIN_PRIVILEGES_SUCCESS
} from '../constants';

export default function commonSettings(state = {}, action) {
  switch (action.type) {
    case ADMIN_LOAD_COMMON_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case ADMIN_PRIVILEGES_SUCCESS:
      return {
        ...state,
        privileges: action.payload.privileges,
      };
    default:
      return state;
  }
}
