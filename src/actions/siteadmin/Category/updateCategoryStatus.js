import gql from 'graphql-tag';
import {
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_START,
    CATEGORY_UPDATE_ERROR
} from '../../../constants/index';
import getAllCategory from './getAllCategory.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export default function updateCategoryStatus(id, currentPage, fieldName, fieldValue) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: CATEGORY_UPDATE_START
        });

        try {
            let errorMessage;

            let mutation = gql`
            mutation updateCategoryStatus($id: Int, $fieldName: String, $fieldValue: String) {
                updateCategoryStatus(id: $id, fieldName: $fieldName, fieldValue: $fieldValue) {
                  status
                  errorMessage
                }
              }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    fieldName,
                    fieldValue
                },
                refetchQueries: [{ query: getAllCategory, variables: { currentPage, searchList: '' } }]
            });

            if (data && data.updateCategoryStatus && data.updateCategoryStatus.status == 200) {
                dispatch({
                    type: CATEGORY_UPDATE_SUCCESS
                });
                showToaster({ messageId: 'addCatSuccess', requestContent: { id }, toasterType: 'success' });
            } else {
                dispatch({
                    type: CATEGORY_UPDATE_ERROR
                });
                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateCategoryStatus && data.updateCategoryStatus.errorMessage }, toasterType: 'error' });
            }
        } catch (err) {
            showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
            dispatch({
                type: CATEGORY_UPDATE_ERROR
            });
        }

    }
};