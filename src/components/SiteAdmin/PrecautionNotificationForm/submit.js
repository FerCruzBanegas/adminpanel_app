import { updatePrecautionNotification } from '../../../actions/siteadmin/PrecautionNotification/updatePrecautionNotification';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

async function submit(values, dispatch) {

    if (values.description == null || values.description == '<p><br></p>' || values.description == '<p> </p>') {
        showToaster({ messageId: 'addDescription', toasterType: 'error' });
    } else {
        await dispatch(updatePrecautionNotification(values));
    }
}

export default submit;