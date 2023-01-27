import gql from 'graphql-tag';
import {
  SET_PAYOUT_START,
  SET_PAYOUT_SUCCESS,
  SET_PAYOUT_ERROR,
} from '../../../constants';

import getPayoutListQuery from './getPayoutListQuery.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function updatePayoutStatus(id, isBanStatus) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_PAYOUT_START,
    });

    try {

      let mutation = gql`
        mutation updatePayout ($id: Int!, $isBanStatus: Boolean!){
          updatePayout(id: $id, isBanStatus: $isBanStatus){
              status
              errorMessage
            }
        }`;

      const { data } = await client.mutate({
        mutation,
        variables: { id, isBanStatus },
        refetchQueries: [{ query: getPayoutListQuery, variables: { currentPage: '1', searchList: '' } }]
      });

      if (data.updatePayout.status === 200) {

        dispatch({
          type: SET_PAYOUT_SUCCESS,
        });

        showToaster({ messageId: 'updatePayout', toasterType: 'success' });

      } else {

        dispatch({
          type: SET_PAYOUT_ERROR,
          payload: {
            error
          }
        });

        showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updatePayout && data.updatePayout.errorMessage }, toasterType: 'error' });

        return false;
      }
    } catch (error) {

      dispatch({
        type: SET_PAYOUT_ERROR,
        payload: {
          error
        }
      });

      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });

      return false;
    }
    return true;
  };
}
