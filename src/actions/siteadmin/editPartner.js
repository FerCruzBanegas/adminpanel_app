import gql from 'graphql-tag';
import history from '../../history';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import { showToaster } from '../../helpers/toastrMessgaes/showToaster';

export function editPartner(values) {
  try {
    return async (dispatch, getState, { client }) => {
      let errorMessage = 'Oops! something went wrong. Try again!';

      const mutation = gql`
        
        mutation updatePartner(
            $id: ID,
            $firstName: String,
            $lastName: String,
            $email: String,
            $phoneDialCode: String
            $phoneNumber: String,
            $userStatus: String,
            $isBan: Int,
            $phoneCountryCode: String
           
            ) {
              updatePartner(
              id: $id
              firstName: $firstName
              lastName: $lastName
              email:$email
              phoneDialCode: $phoneDialCode
              phoneNumber: $phoneNumber
              userStatus: $userStatus
              isBan: $isBan
              phoneCountryCode: $phoneCountryCode
            )
            {
              status
              errorMessage
            }
          }
        `;

      dispatch(setLoaderStart('EditProvider'));

      const { data } = await client.mutate({
        mutation,
        variables: {
          id: values.id,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneDialCode: values.phoneDialCode,
          phoneNumber: values.phoneNumber,
          userStatus: values.userStatus,
          isBan: values.isBan,
          phoneCountryCode: values.phoneCountryCode
        }
      });

      dispatch(setLoaderComplete('EditProvider'));

      if (data && data.updatePartner && data.updatePartner.status === 200) {
        history.push('/siteadmin/partners');
        showToaster({ messageId: 'editPartnerSuccess', toasterType: 'success' });
      } else {
        errorMessage = (data && data.updatePartner && data.updatePartner.errorMessage) ? data.updatePartner.errorMessage : errorMessage;
        showToaster({ messageId: 'errorMessage', requestContent: { content: errorMessage }, toasterType: 'error' });
      }
    }
  }
  catch (error) {
    showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
  }
}