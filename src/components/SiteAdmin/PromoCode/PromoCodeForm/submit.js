import { addPromoCode } from '../../../../actions/siteadmin/PromoCode/addPromoCode';
import { showToaster } from '../../../../helpers/toastrMessgaes/showToaster';

async function submit(values, dispatch) {
    if (!values || !values.imageName) {
        showToaster({ messageId: 'pleaseUpload', toasterType: 'error' });
        return;
    }
    await dispatch(addPromoCode(values));
}

export default submit;