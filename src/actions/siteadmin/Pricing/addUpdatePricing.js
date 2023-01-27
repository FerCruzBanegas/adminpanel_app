import gql from 'graphql-tag';
import {
  ADD_UPDATE_PRICING_START,
  ADD_UPDATE_PRICING_SUCCESS,
  ADD_UPDATE_PRICING_ERROR
} from '../../../constants';
import history from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

const mutation = gql`
mutation($id: Int, $locationId: Int!, $categoryId: Int!, $subCategoryId: Int!, $isActive: Boolean, 
  $currency: String!, $isPriceEditable: Boolean, $basePrice: Float, $multiplierValue: Float) {
  addUpdatePricing(id: $id, locationId: $locationId,  categoryId: $categoryId, subCategoryId: $subCategoryId,
  isActive: $isActive, currency: $currency, isPriceEditable: $isPriceEditable, basePrice: $basePrice, multiplierValue: $multiplierValue
) {
      status
      errorMessage    
  }
}`;

export function addUpdatePricing(
  id,
  locationId,
  categoryId,
  subCategoryId,
  isActive,
  currency,
  isPriceEditable,
  basePrice,
  multiplierValue
) {
  return async (dispatch, getState, { client }) => {
    try {
      dispatch({
        type: ADD_UPDATE_PRICING_START,
        payload: {
          pricingLoading: true
        }
      });

      dispatch(setLoaderStart('PricingForm'));

      const { data } = await client.mutate({
        mutation,
        variables: {
          id,
          locationId,
          categoryId,
          subCategoryId,
          isActive,
          currency,
          isPriceEditable,
          basePrice,
          multiplierValue
        }
      });

      if (data && data.addUpdatePricing && data.addUpdatePricing.status === 200) {
       
        history.push('/siteadmin/pricing/list');
        showToaster({ messageId: 'addFareSuccess', requestContent: { id }, toasterType: 'success' });
        
        await dispatch({
          type: ADD_UPDATE_PRICING_SUCCESS,
          payload: {
            pricingLoading: false
          }
        });

        dispatch(setLoaderComplete('PricingForm'));

        return await {
          status: 200
        };
      } else {
        showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.addUpdatePricing && data.addUpdatePricing.errorMessage }, toasterType: 'error' });
        await dispatch({
          type: ADD_UPDATE_PRICING_ERROR,
          payload: {
            pricingLoading: false,
            error: data && data.addUpdatePricing && data.addUpdatePricing.errorMessage
          }
        });

        dispatch(setLoaderComplete('PricingForm'));

        return await {
          status: 400
        };
      }
    } catch (error) {
      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });

      await dispatch({
        type: ADD_UPDATE_PRICING_ERROR,
        payload: {
          pricingLoading: false,
          error: "Something went wrong! " + error
        }
      });

      dispatch(setLoaderComplete('PricingForm'));

      return await {
        status: 400
      };
    }
  }
}