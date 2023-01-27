import gql from 'graphql-tag';

import {
    CANCEL_REASON_DELETE_SUCCESS,
    CANCEL_REASON_DELETE_START,
    CANCEL_REASON_DELETE_ERROR
} from '../../../constants/index';
import removeMutation from './removeMutation.graphql';
import getAllCancelReason from './getAllCancelReason.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export default function removeCancelReason(id, currentPage) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: CANCEL_REASON_DELETE_START
        });

        try {

            const { data } = await client.mutate({
                mutation: removeMutation,
                variables: {
                    id
                },
                refetchQueries: [{ query: getAllCancelReason, variables: { currentPage, searchList: '' } }]
            });

            if (data && data.removeCancelReason && data.removeCancelReason.status === 200) {
                dispatch({
                    type: CANCEL_REASON_DELETE_SUCCESS
                });
                showToaster({ messageId: 'removeCancelSuccess', toasterType: 'success' });
            } else {
                dispatch({
                    type: CANCEL_REASON_DELETE_ERROR
                });

                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.removeCancelReason && data.removeCancelReason.errorMessage }, toasterType: 'error' });
            }
        } catch (err) {
            dispatch({
                type: CANCEL_REASON_DELETE_ERROR
            });
            showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
        }

    }
};