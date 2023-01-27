import { addCategory } from '../../../actions/siteadmin/Category/addCategory';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

async function submit(values, dispatch) {
	if (!values.logoImage) {
		showToaster({ messageId: 'categoryLogo', toasterType: 'error' });
		return;
	}

	if (!values.bannerImage) {
		showToaster({ messageId: 'categoryBanner', toasterType: 'error' });
		return;
	}

	await dispatch(
		addCategory(
			values.id,
			values.name,
			values.description,
			values.logoImage,
			values.bannerImage,
			values.isPopular,
			values.isJobPhotoRequired,
			values.travellingPrice,
			values.userServiceFeeValue,
			values.partnerServiceFeeValue,
			values.pricingType,
			values.status,
			values.currency,
		)
	)
}

export default submit;