import {
  UPDATE_SMS_START,
  UPDATE_SMS_SUCCESS,
  UPDATE_SMS_ERROR
} from '../../../constants';

import gql from 'graphql-tag';
import history from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';


const updateMutation = gql`
mutation( 
  $id: Int!
  $status: String
  $accountId: String 
  $securityId: String
  $phoneNumber: String
  $phoneDialCode: String
  $phoneCountryCode: String
  $updateStatus: Boolean
) {
  updateSmsMethod(
      id: $id,
      status: $status,
      accountId: $accountId,
      securityId: $securityId,
      phoneNumber: $phoneNumber,
      phoneDialCode: $phoneDialCode,
      phoneCountryCode: $phoneCountryCode,
      updateStatus: $updateStatus
  ) {
      status
      errorMessage
  }
}`;

export function updateSmsMethod(values) {
  return async (dispatch, getState, { client }) => {
    try {
      let status, errorMessage;
      dispatch({
        type: UPDATE_SMS_START,
        payload: {
          loading: true
        }
      });

      dispatch(setLoaderStart('UpdateSmsMethod'));

      const { data } = await client.mutate({
        mutation: updateMutation,
        variables: {
          id: values && values.id,
          status: values && values.status,
          accountId: values && values.accountId,
          securityId: values && values.securityId,
          phoneNumber: values && values.phoneNumber,
          phoneDialCode: values && values.phoneDialCode,
          phoneCountryCode: values && values.phoneCountryCode,
          updateStatus: values && values.updateStatus
        }
      });

      if (data) {
        status = data.updateSmsMethod && data.updateSmsMethod.status;
        errorMessage = data.updateSmsMethod && data.updateSmsMethod.errorMessage;
      }

      dispatch(setLoaderComplete('UpdateSmsMethod'));

      if (status !== 200) {
        showToaster({ messageId: 'errorMessage', requestContent: { content: errorMessage }, toasterType: 'error' });
        dispatch({
          type: UPDATE_SMS_ERROR,
          payload: {
            loading: false,
            error: errorMessage
          }
        });
        return '';
      }

      history.push('/siteadmin/sms-methods');
      showToaster({ messageId: 'updateSms', toasterType: 'success' });
      await dispatch({
        type: UPDATE_SMS_SUCCESS,
        payload: {
          loading: false
        }
      });

      dispatch(setLoaderComplete('UpdateSmsMethod'));
    }
    catch (error) {
      dispatch(setLoaderComplete('UpdateSmsMethod'));
      showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
      await dispatch({
        type: UPDATE_SMS_ERROR,
        payload: {
          loading: false,
          error
        }
      });
    }
  }
}