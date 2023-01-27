import { addSubCategory } from '../../../actions/siteadmin/SubCategory/addSubCategory';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

async function submit(values, dispatch) {
	if (!values.image) {
		showToaster({ messageId: 'subCategoryImage', toasterType: 'error' });
		return;
	}

	await dispatch(
		addSubCategory(
			values.id,
			values.name,
			values.description,
			values.image,
			values.categoryId,
			values.status
		)
	)
}

export default submit;