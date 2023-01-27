import { toastr } from 'react-redux-toastr';
import { getToastContent } from './getToastContent';

export async function showToaster({ messageId, requestContent, lang, toasterType }) {
    const { title, message } = await getToastContent({ messageId, requestContent, lang });
    if (toasterType === 'success') {
        toastr.success(title, message);
    } else if(toasterType === 'error') {
        toastr.error(title, message);
    }
    return true;
}

export default {
    showToaster
}
