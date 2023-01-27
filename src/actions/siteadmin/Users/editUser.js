import gql from 'graphql-tag';
import history from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import getAllUsers from './getAllUsers.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function editUser(values) {
  return async (dispatch, getState, { client }) => {
    let errorMessage = 'Oops! something went wrong. Try again!';
    const mutation = gql`
        
        mutation updateUser(
            $id: ID,
            $firstName: String,
            $lastName: String,
            $email: String,
            $phoneDialCode: String
            $phoneNumber: String,
            $userStatus: String,
            $isBan: Int
            $phoneCountryCode: String
            ) {
              updateUser(
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

    dispatch(setLoaderStart('EditUser'));

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
      },
      refetchQueries: [{
        query: getAllUsers,
        variables: {
          currentPage: 1,
          userType: 1
        }
      }]
    });

    dispatch(setLoaderComplete('EditUser'));

    if (data && data.updateUser && data.updateUser.status === 200) {
      history.push('/siteadmin/users')
      showToaster({ messageId: 'updateUser', toasterType: 'success' });
    } else {
      showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateUser && data.updateUser.errorMessage }, toasterType: 'error' });
    }
  }
}