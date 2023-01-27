import { updateStaticPage } from '../../../actions/siteadmin/updateStaticPage';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

async function submit(values, dispatch) {

    if (values.content == null || values.content == '<p><br></p>' || values.content == '<p> </p>') {
        showToaster({ messageId: 'addCmsContent', toasterType: 'error' });
    } else {
        await dispatch(updateStaticPage(values));
    }
}

export default submit;