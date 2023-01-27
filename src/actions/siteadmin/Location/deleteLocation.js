import gql from 'graphql-tag';
import {
    DELETE_LOCATION_START,
    DELETE_LOCATION_ERROR,
    DELETE_LOCATION_SUCCESS
} from '../../../constants';
import getLocations from './getLocations.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function deleteLocation(id, currentPage) {
    return async (dispatch, getState, { client }) => {
        let errorMessage;
        dispatch({
            type: DELETE_LOCATION_START
        });

        try {

            let mutation = gql`
            mutation deleteLocation($id: Int) {
                deleteLocation(id: $id) {
                  status
                  errorMessage
                }
              }
            `
            const { data } = await client.mutate({
                mutation,
                variables: {
                    id
                },
                refetchQueries: [{ query: getLocations, variables: { currentPage, searchList: '' } }]
            });



            if (data && data.deleteLocation && data.deleteLocation.status == 200) {
                dispatch({
                    type: DELETE_LOCATION_SUCCESS
                })
                showToaster({ messageId: 'delLoc', toasterType: 'success' });
            } else {
                dispatch({
                    type: DELETE_LOCATION_ERROR
                });
                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.deleteLocation && data.deleteLocation.errorMessage }, toasterType: 'error' });
            }

        } catch (err) {
            dispatch({
                type: DELETE_LOCATION_ERROR
            })
            showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
        }
    }
}