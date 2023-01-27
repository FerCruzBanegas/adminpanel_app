import gql from 'graphql-tag';

import {
  SET_CASH_PAYOUT_START,
  SET_CASH_PAYOUT_SUCCESS,
  SET_CASH_PAYOUT_ERROR,
} from '../../../constants';

import getPayoutListQuery from './getPayoutListQuery.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function updateCashPayout(id, payoutStatus, currentPage) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_CASH_PAYOUT_START,
    });

    try {

      let mutation = gql`
        mutation updateCashPayout ($id: Int, $payoutStatus: Boolean){
          updateCashPayout(id: $id, payoutStatus: $payoutStatus){
              status
              errorMessage
            }
        }`;

      const { data } = await client.mutate({
        mutation,
        variables: { id, payoutStatus },
        refetchQueries: [{ query: getPayoutListQuery, variables: { currentPage, searchList: '' } }]
      });

      if (data.updateCashPayout.status == 200) {

        dispatch({
          type: SET_CASH_PAYOUT_SUCCESS,
        });
        showToaster({ messageId: 'updateCashPayout', toasterType: 'success' });

      } else {

        dispatch({
          type: SET_CASH_PAYOUT_ERROR
        });

        showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateCashPayout && data.updateCashPayout.errorMessage }, toasterType: 'error' });

        return false;
      }
    } catch (error) {

      dispatch({
        type: SET_CASH_PAYOUT_ERROR
      });

      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });

      return false;
    }
    return true;
  };
}
