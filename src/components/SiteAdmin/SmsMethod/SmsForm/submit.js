import { updateSmsMethod } from '../../../../actions/siteadmin/SmsMethod/updateSmsMethod';

async function submit(values, dispatch) {
    await dispatch(updateSmsMethod(values));
}

export default submit;