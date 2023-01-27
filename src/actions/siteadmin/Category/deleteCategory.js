import gql from 'graphql-tag';
import {
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_START,
    CATEGORY_DELETE_ERROR
} from '../../../constants/index';
import { setLoaderComplete, setLoaderStart } from '../../loader/loader'
import getAllCategory from './getAllCategory.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export default function deleteCategory(id, currentPage) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: CATEGORY_DELETE_START
        });

        dispatch(setLoaderStart('DeleteCategory'));
        try {
            let errorMessage;
            let mutation = gql`
            mutation deleteCategory($id: Int) {
                deleteCategory(id: $id) {
                  status
                  errorMessage
                }
              }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id
                },
                refetchQueries: [{ query: getAllCategory, variables: { currentPage, searchList: '' } }]
            });

            dispatch(setLoaderComplete('DeleteCategory'));

            if (data && data.deleteCategory && data.deleteCategory.status == 200) {
                dispatch({
                    type: CATEGORY_DELETE_SUCCESS
                });
                showToaster({ messageId: 'removeCatSuccess', toasterType: 'success' });
            } else {
                dispatch({
                    type: CATEGORY_DELETE_ERROR
                });
                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.deleteCategory && data.deleteCategory.errorMessage }, toasterType: 'error' });
            }
        } catch (err) {
            showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
            dispatch({
                type: CATEGORY_DELETE_ERROR
            });
        }

    }
};