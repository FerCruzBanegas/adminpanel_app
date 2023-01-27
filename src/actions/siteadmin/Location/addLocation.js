import gql from 'graphql-tag';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import histroy from '../../../history';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function addLocation(LocationName, coordinates, description) {

  let coordinatesError = '';
  if (!coordinates || coordinates == '') {
    showToaster({ messageId: 'selectLoc', toasterType: 'error' });
    coordinatesError = 'yes';
  }

  return async (dispatch, getState, { client }) => {
    const mutation = gql`
        mutation addLocation(
  				    $LocationName: String!,
              $coordinates: String!,
              $description: String!
            ) {
            addLocation(
              LocationName: $LocationName
              coordinates: $coordinates
              description: $description
            ){
              status
              errorMessage
            }
          }
        `;


    dispatch(setLoaderStart('AddLocation'));

    if (coordinatesError != '') {
      dispatch(setLoaderComplete('AddLocation'));
    }


    const { data } = await client.mutate({
      mutation,
      variables: {
        LocationName,
        coordinates,
        description
      },

    });

    dispatch(setLoaderComplete('AddLocation'));

    if (data && data.addLocation && data.addLocation.status === 200) {
      showToaster({ messageId: 'addLoc', toasterType: 'success' });
      histroy.push('/siteadmin/location');
    } else if (data && data.addLocation && data.addLocation.status !== 200) {
      showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.addLocation && data.addLocation.errorMessage }, toasterType: 'error' });
    }
  }
}