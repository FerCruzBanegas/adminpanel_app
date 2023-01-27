import gql from 'graphql-tag';
import histroy from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function addSubCategory(
  id,
  name,
  description,
  image,
  categoryId,
  status
) {

  return async (dispatch, getState, { client }) => {
    try {
      const mutation = gql`
        mutation addSubCategory(
          $id: Int,
          $name: String,
          $description: String,
          $image: String,
          $categoryId: Int,
          $status: String,
        ) {
        addSubCategory(
          id: $id,
          name: $name,
          description: $description,
          image: $image,
          categoryId: $categoryId,
          status: $status
        ){
          status
          errorMessage
        }
      }
    `;

      dispatch(setLoaderStart('AddSubCategory'));

      const { data } = await client.mutate({
        mutation,
        variables: {
          id,
          name,
          description,
          image,
          categoryId,
          status
        }
      });

      dispatch(setLoaderComplete('AddSubCategory'));

      if (data && data.addSubCategory && data.addSubCategory.status === 200) {
        showToaster({ messageId: 'addSubCatSuccess', requestContent: { id }, toasterType: 'success' });
        histroy.push('/siteadmin/sub-category');
      } else if (data && data.addSubCategory && data.addSubCategory.status !== 200) {
        showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.addSubCategory && data.addSubCategory.errorMessage }, toasterType: 'error' });
      }
    } catch (err) {
      showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
    }
  }
}