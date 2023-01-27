import {
  UPDATE_PRICING_STATUS_START,
  UPDATE_PRICING_STATUS_SUCCESS,
  UPDATE_PRICING_STATUS_ERROR
} from '../../../constants';

import gql from 'graphql-tag';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

const mutation = gql`
mutation($id: Int!, $isActive: Boolean) {
  updatePricingStatus(id: $id, isActive: $isActive) {
      status
      errorMessage    
  }
}`;

export function updatePricingStatus(id, isActive) {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({
        type: UPDATE_PRICING_STATUS_START,
        payload: {
          pricingLoading: true
        }
      });

      const { data } = await client.mutate({
        mutation,
        variables: {
          id,
          isActive
        }
      });

      if (data && data.updatePricingStatus && data.updatePricingStatus.status === 200) {
        showToaster({ messageId: 'statusFareSuccess', toasterType: 'success' });
        await dispatch({
          type: UPDATE_PRICING_STATUS_SUCCESS,
          payload: {
            pricingLoading: false
          }
        });

        return await {
          status: 200
        };
      } else {
        showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updatePricingStatus && data.updatePricingStatus.errorMessage }, toasterType: 'error' });

        await dispatch({
          type: UPDATE_PRICING_STATUS_ERROR,
          payload: {
            pricingLoading: false,
            error: data && data.updatePricingStatus && data.updatePricingStatus.errorMessage
          }
        });

        return await {
          status: 400
        };
      }
    } catch (error) {
      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });

      await dispatch({
        type: UPDATE_PRICING_STATUS_ERROR,
        payload: {
          pricingLoading: false,
          error: "Something went wrong! " + error
        }
      });

      return await {
        status: 400
      };
    }
  }
}