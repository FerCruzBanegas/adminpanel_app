import {
  GET_ADMIN_USER_SUCCESS
} from '../constants';

export default function account(state = {}, action) {
  switch (action.type) {

    case GET_ADMIN_USER_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        isSuperAdmin: action.payload.isSuperAdmin,
        roleId: action.payload.roleId,
        privileges: action.payload.privileges,
      };

    default:
      return {
        ...state,
      };
  }
}
