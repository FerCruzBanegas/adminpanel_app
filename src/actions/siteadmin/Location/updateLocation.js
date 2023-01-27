import gql from 'graphql-tag';
import histroy from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function updateLocation(LocationName, coordinates, id, description, isActive) {

  return async (dispatch, getState, { client }) => {

    let coordinatesError = '';
    if (!coordinates || coordinates == '' || coordinates == 'null') {
      showToaster({ messageId: 'selectLoc', toasterType: 'error' });
      coordinatesError = 'yes';
      return;
    }
    isActive = Number(isActive);

    const mutation = gql`
        mutation updateLocation(
  				    $LocationName: String!,
              $coordinates: String!,
              $id: Int!,
              $description: String!,
              $isActive: Boolean!
            ) {
              updateLocation(
              LocationName: $LocationName
              coordinates: $coordinates,
              id: $id,
              description: $description,
              isActive: $isActive
            ){
              status
              errorMessage
            }
          }
        `;


    dispatch(setLoaderStart('updateLocation'));

    if (coordinatesError != '') {
      dispatch(setLoaderComplete('updateLocation'));
    }

    const { data } = await client.mutate({
      mutation,
      variables: {
        LocationName,
        coordinates,
        id,
        description,
        isActive
      },

    });

    dispatch(setLoaderComplete('updateLocation'));

    if (data && data.updateLocation && data.updateLocation.status === 200) {
      showToaster({ messageId: 'updateLoc', toasterType: 'success' });
      histroy.push('/siteadmin/location');
    } else if (data && data.updateLocation && data.updateLocation.status !== 200) {
      showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateLocation && data.updateLocation.errorMessage }, toasterType: 'error' });
    }
  }
}