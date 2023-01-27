import {
  DELETE_PROMOCODE_START,
  DELETE_PROMOCODE_SUCCESS,
  DELETE_PROMOCODE_ERROR
} from '../../../constants';

import gql from 'graphql-tag';

import query from '../../../routes/site-admin/promoCode/promoCodeList/getAllPromoCode.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

const mutation = gql`
mutation($id: Int!) {
  deletePromoCode(id: $id) {
      status
      errorMessage
  }
}`;

export function deletePromoCode(id) {
  return async (dispatch, getState, { client }) => {

    try {
      dispatch({
        type: DELETE_PROMOCODE_START,
        payload: {
          promoCodeLoading: true
        }
      });

      const { data } = await client.mutate({
        mutation,
        variables: { id },
        refetchQueries: [{
          query,
          variables: { currentPage: 1 }
        }]
      });

      if (data && data.deletePromoCode && data.deletePromoCode.status === 200) {
        showToaster({ messageId: 'deletePromoCodeSuccess', toasterType: 'success' });
        await dispatch({
          type: DELETE_PROMOCODE_SUCCESS,
          payload: {
            promoCodeLoading: false
          }
        });
      }
      else {
        showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.deletePromoCode && data.deletePromoCode.errorMessage }, toasterType: 'error' });
        await dispatch({
          type: DELETE_PROMOCODE_ERROR,
          payload: {
            promoCodeLoading: false,
            error: data && data.deletePromoCode && data.deletePromoCode.errorMessage
          }
        });
      }
    } catch (error) {
      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
      await dispatch({
        type: DELETE_PROMOCODE_ERROR,
        payload: {
          promoCodeLoading: false,
          error: "Something went wrong! " + error
        }
      });
    }
  }
}