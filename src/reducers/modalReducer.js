import {
  OPEN_ADMIN_ROLES_MODAL,
  CLOSE_ADMIN_ROLES_MODAL,
  OPEN_ADMIN_USER_MODAL,
  CLOSE_ADMIN_USER_MODAL,
  OPEN_HEADER_MODAL,
  CLOSE_HEADER_MODAL,
  EDIT_BOOKING_MODAL,
  CANCEL_BOOKING_MODAL,
  OPEN_CURRENCY_MODAL,
  IMAGE_LIGHTBOX_OPEN,
  IMAGE_LIGHTBOX_CLOSE,
} from '../constants';

export default function modalReducer(state = {}, action) {
  switch (action.type) {
    case OPEN_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: action.payload.adminRolesModalType
      };

    case CLOSE_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: null
      };

    case OPEN_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: action.payload.adminUserModalType
      };

    case CLOSE_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: null
      };

    case OPEN_HEADER_MODAL:
      return {
        ...state,
        [action.payload.modalType]: action.payload.actionValue
      };

    case CLOSE_HEADER_MODAL:
      return {
        ...state,
        [action.payload.modalType]: action.payload.actionValue
      };

    case EDIT_BOOKING_MODAL:
      return {
        ...state,
        editBookingModal: action.payload.editBookingModal
      };

    case CANCEL_BOOKING_MODAL:
      return {
        ...state,
        cancelBookingModal: action.payload.cancelBookingModal
      };

    case OPEN_CURRENCY_MODAL:
      return {
        ...state,
        currencyModal: action.payload.currencyModal,
      };

    case IMAGE_LIGHTBOX_OPEN:
      return {
        ...state,
        imageLightBox: action.imageLightBox,
        currentIndex: action.currentIndex
      };

    case IMAGE_LIGHTBOX_CLOSE:
      return {
        ...state,
        imageLightBox: action.imageLightBox
      };

    default:
      return {
        ...state,
      };
  }
}
