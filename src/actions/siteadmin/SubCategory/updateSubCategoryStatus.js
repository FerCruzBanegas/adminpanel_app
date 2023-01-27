import gql from 'graphql-tag';
import {
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_START,
    CATEGORY_UPDATE_ERROR
} from '../../../constants/index';
import getAllSubCategory from './getAllSubCategory.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export default function updateSubCategoryStatus(id, currentPage, fieldName, fieldValue) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: CATEGORY_UPDATE_START
        });

        try {
            let errorMessage;

            let mutation = gql`
            mutation updateSubCategoryStatus($id: Int, $fieldName: String, $fieldValue: String) {
                updateSubCategoryStatus(id: $id, fieldName: $fieldName, fieldValue: $fieldValue) {
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
                refetchQueries: [{ query: getAllSubCategory, variables: { currentPage, searchList: '' } }]
            });

            if (data && data.updateSubCategoryStatus && data.updateSubCategoryStatus.status == 200) {
                dispatch({
                    type: CATEGORY_UPDATE_SUCCESS
                });
                showToaster({ messageId: 'statusSubCatSuccess', requestContent: { id }, toasterType: 'success' });
            } else {
                dispatch({
                    type: CATEGORY_UPDATE_ERROR
                });

                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateSubCategoryStatus && data.updateSubCategoryStatus.errorMessage }, toasterType: 'error' });

            }
        } catch (err) {
            showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
            dispatch({
                type: CATEGORY_UPDATE_ERROR
            });
        }

    }
};