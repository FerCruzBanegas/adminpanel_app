import gql from 'graphql-tag';
import {
    ADD_CANCEL_REASON_START,
    ADD_CANCEL_REASON_SUCCESS,
    ADD_CANCEL_REASON_ERROR
} from '../../../constants/index';
import history from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import updateMutation from './updateMutation.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function addCancelReason(values) {

    return async (dispatch, getState, { client }) => {

        values.isActive = Number(values.isActive);

        try {

            dispatch({
                type: ADD_CANCEL_REASON_START
            })

            dispatch(setLoaderStart('AddCancellation'));

            const { data } = await client.mutate({
                mutation: updateMutation,
                variables: {
                    id: values && values.id,
                    reason: values && values.reason,
                    userType: values && values.userType,
                    isActive: values && values.isActive
                }
            })

            if (data.updateCancelReason && data.updateCancelReason.status === 200) {
                history.push('/siteadmin/cancel-reasons');

                showToaster({ messageId: 'addCancelSuccess', requestContent: { id: values && values.id }, toasterType: 'success' });

                dispatch(setLoaderComplete('AddCancellation'));

                await dispatch({
                    type: ADD_CANCEL_REASON_SUCCESS,
                });

            } else {
                dispatch(setLoaderComplete('AddCancellation'));
                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateCancelReason && data.updateCancelReason.errorMessage }, toasterType: 'error' });

                await dispatch({
                    type: ADD_CANCEL_REASON_ERROR,
                });
            }

        } catch (err) {
            showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
            dispatch({ type: ADD_CANCEL_REASON_ERROR })
        }
    }
}