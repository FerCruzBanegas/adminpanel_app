import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import {
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_START,
    CATEGORY_DELETE_ERROR
} from '../../../constants/index';
import { setLoaderComplete, setLoaderStart } from '../../loader/loader'
import getAllSubCategory from './getAllSubCategory.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export default function deleteSubCategory(id, currentPage) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: CATEGORY_DELETE_START
        });

        dispatch(setLoaderStart('DeleteSubCategory'));
        try {
            let errorMessage;
            let mutation = gql`
            mutation deleteSubCategory($id: Int) {
                deleteSubCategory(id: $id) {
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
                refetchQueries: [{ query: getAllSubCategory, variables: { currentPage, searchList: '' } }]
            });

            dispatch(setLoaderComplete('DeleteSubCategory'));

            if (data && data.deleteSubCategory && data.deleteSubCategory.status == 200) {

                dispatch({
                    type: CATEGORY_DELETE_SUCCESS
                });
                showToaster({ messageId: 'removeSubCatSuccess', toasterType: 'success' });

            } else {

                dispatch({
                    type: CATEGORY_DELETE_ERROR
                });
                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.deleteSubCategory && data.deleteSubCategory.errorMessage }, toasterType: 'error' });
            }
        } catch (err) {
            showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
            dispatch({
                type: CATEGORY_DELETE_ERROR
            });
        }

    }
};