import gql from 'graphql-tag';
import {
    USER_DELETE_SUCCESS,
    USER_DELETE_START,
    USER_DELETE_ERROR
} from '../../../constants/index';
import getAllUsers from './getAllUsers.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export default function deleteUser(profileId, currentPage, userType) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: USER_DELETE_START,
            payload: {
                deleteLoading: true
            }
        });

        try {
            let errorMessage;
            let mutation = gql`
            mutation deleteUser($profileId: Int) {
                deleteUser(profileId: $profileId) {
                  status
                  errorMessage
                }
              }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    profileId
                },
                refetchQueries: [{ query: getAllUsers, variables: { currentPage, userType } }]
            });

            if (data && data.deleteUser && data.deleteUser.status === 200) {
                dispatch({
                    type: USER_DELETE_SUCCESS,
                    payload: {
                        deleteLoading: false
                    }
                });
                showToaster({ messageId: 'delUser', requestContent: { userType }, toasterType: 'success' });
            } else {
                dispatch({
                    type: USER_DELETE_ERROR,
                    payload: {
                        deleteLoading: false
                    }
                });

                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.deleteUser && data.deleteUser.errorMessage }, toasterType: 'error' });
            }
        } catch (err) {
            showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
            dispatch({
                type: USER_DELETE_ERROR,
                payload: {
                    deleteLoading: false
                }
            });
        }

    }
};