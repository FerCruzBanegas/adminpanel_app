import {
  ADD_PROMOCODE_START,
  ADD_PROMOCODE_SUCCESS,
  ADD_PROMOCODE_ERROR
} from '../../../constants';

import gql from 'graphql-tag';
import history from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

const addMutation = gql`
mutation( 
  $title: String!, 
  $description: String!, 
  $code: String!, 
  $type: Int,
  $promoValue: Float!, 
  $currency: String,
  $expiryDate: String,
  $imageName: String
) {
  addPromoCode(
      title: $title,
      description: $description,
      code: $code,
      type: $type,
      promoValue: $promoValue,
      currency: $currency,
      expiryDate: $expiryDate,
      imageName: $imageName
  ) {
      status
      errorMessage
  }
}`;

const updateMutation = gql`
mutation( 
  $id: Int!,
  $title: String!, 
  $description: String!, 
  $code: String!, 
  $type: Int,
  $promoValue: Float!, 
  $currency: String,
  $expiryDate: String,
  $isEnable: Boolean,
  $imageName: String
) {
  updatePromoCode(
      id: $id,
      title: $title,
      description: $description,
      code: $code,
      type: $type,
      promoValue: $promoValue,
      currency: $currency,
      expiryDate: $expiryDate,
      isEnable: $isEnable,
      imageName: $imageName
  ) {
      status
      errorMessage
  }
}`;

export function addPromoCode(values) {
  return async (dispatch, getState, { client }) => {
    try {
      let requestContent = {};
      let status, errorMessage = 'Oops! something went wrong! Please try again.';
      dispatch({
        type: ADD_PROMOCODE_START,
        payload: {
          promoCodeLoading: true
        }
      });

      dispatch(setLoaderStart('AddPromoCode'));

      const mutation = values && values.id ? updateMutation : addMutation;
      if (!values.id) values.isEnable = true;

      const { data } = await client.mutate({
        mutation,
        variables: {
          id: values && values.id,
          title: values && values.title,
          description: values && values.description,
          code: values && values.code,
          type: values && values.type,
          promoValue: values && values.promoValue,
          currency: values && values.currency,
          expiryDate: values && values.expiryDate && values.expiryDate !== '' ? values.expiryDate : null,
          isEnable: values && values.isEnable.toString() === "true",
          imageName: values && values.imageName
        }
      });

      if (data && values.id) {
        status = data.updatePromoCode && data.updatePromoCode.status;
        errorMessage = data.updatePromoCode && data.updatePromoCode.errorMessage;
      }
      else if (data && !values.id) {
        status = data.addPromoCode && data.addPromoCode.status;
        errorMessage = data.addPromoCode && data.addPromoCode.errorMessage;
      }

      dispatch(setLoaderComplete('AddPromoCode'));

      if (status !== 200) {
        requestContent = {
          content: errorMessage
        };
        showToaster({ messageId: 'errorMessage', requestContent, toasterType: 'error' });
        dispatch({
          type: ADD_PROMOCODE_ERROR,
          payload: {
            promoCodeLoading: false,
            error: errorMessage
          }
        });
        return '';
      }

      history.push('/siteadmin/promo-code/list');
      requestContent = {
        id: values && values.id
      };
      showToaster({ messageId: 'addPromoCodeSuccess', requestContent, toasterType: 'success' });
      await dispatch({
        type: ADD_PROMOCODE_SUCCESS,
        payload: {
          promoCodeLoading: false
        }
      });

      dispatch(setLoaderComplete('AddPromoCode'));
    }
    catch (error) {
      dispatch(setLoaderComplete('AddPromoCode'));
      let requestContent = {
        content: error
      };
      showToaster({ messageId: 'catchMessage', requestContent, toasterType: 'error' });
      await dispatch({
        type: ADD_PROMOCODE_ERROR,
        payload: {
          promoCodeLoading: false,
          error
        }
      });
    }
  }
}