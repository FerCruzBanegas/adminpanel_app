import { updateMobileSettings } from '../../../actions/siteadmin/updateMobileSettings'
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

async function submit(values, dispatch) {

    if (values.isRequestTimerToneEnable == '1' && !values.requestTimeTone) {
        showToaster({ messageId: 'timer', toasterType: 'error' });

        return;
    }

    await dispatch(updateMobileSettings(values));
}

export default submit;