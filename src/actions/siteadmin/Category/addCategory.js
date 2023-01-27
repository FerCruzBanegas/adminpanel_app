import gql from 'graphql-tag';
import histroy from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function addCategory(
  id,
  name,
  description,
  logoImage,
  bannerImage,
  isPopular,
  isJobPhotoRequired,
  travellingPrice,
  userServiceFeeValue,
  partnerServiceFeeValue,
  pricingType,
  status,
  currency
) {

  return async (dispatch, getState, { client }) => {
    try {

      const mutation = gql`
        mutation addCategory(
          $id: Int,
          $name: String,
          $description: String,
          $logoImage: String,
          $bannerImage: String,
          $isPopular: Boolean,
          $isJobPhotoRequired: Boolean,
          $travellingPrice: Float,
          $userServiceFeeValue: Float,
          $partnerServiceFeeValue: Float,
          $pricingType: String,
          $status: String,
          $currency: String
        ) {
        addCategory(
          id: $id,
          name: $name,
          description: $description,
          logoImage: $logoImage,
          bannerImage: $bannerImage,
          isPopular: $isPopular,
          isJobPhotoRequired: $isJobPhotoRequired,
          travellingPrice: $travellingPrice,
          userServiceFeeValue: $userServiceFeeValue,
          partnerServiceFeeValue: $partnerServiceFeeValue,
          pricingType: $pricingType,
          status: $status,
          currency: $currency
        ){
          status
          errorMessage
        }
      }
    `;

      dispatch(setLoaderStart('AddCategory'));

      const { data } = await client.mutate({
        mutation,
        variables: {
          id,
          name,
          description,
          logoImage,
          bannerImage,
          isPopular: String(isPopular) === 'true' ? 1 : 0,
          isJobPhotoRequired: String(isJobPhotoRequired) === 'true' ? 1 : 0,
          travellingPrice,
          userServiceFeeValue,
          partnerServiceFeeValue,
          pricingType,
          status,
          currency
        }
      });

      dispatch(setLoaderComplete('AddCategory'));

      if (data && data.addCategory && data.addCategory.status === 200) {
        showToaster({ messageId: 'addCatSuccess', requestContent: { id }, toasterType: 'success' });
        histroy.push('/siteadmin/category');
      } else if (data && data.addCategory && data.addCategory.status !== 200) {
        showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.addCategory && data.addCategory.errorMessage }, toasterType: 'error' });
      }
    } catch (err) {
      showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
    }
  }
}