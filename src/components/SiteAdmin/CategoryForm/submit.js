import { updateHomePageCategory } from '../../..../../../actions/siteadmin/updateHomePageCategory'
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

async function submit(values, dispatch) {
    if (!values || !values.categoryList || values.categoryList.length === 0) {
        showToaster({ messageId: 'noCategory', toasterType: 'error' });
        return;
    }

    let havingDataWithoutImage = values.categoryList.find(item => !item.logo || !item.banner)
    if (havingDataWithoutImage) {
        showToaster({ messageId: 'pleaseUpload', toasterType: 'error' });
        return;
    }

    await dispatch(updateHomePageCategory(values))
}

export default submit;