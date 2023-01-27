import { reset } from 'redux-form';
import { sendNotifications } from '../../../helpers/push-notification/sendNotifications'
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

async function submit(values, dispatch) {
	try {
		let content = {
			title: values.title + ' Notification!',
			message: values.message
		}
		let userType = values.to;

		dispatch(setLoaderStart('sendNotification'));
		await sendNotifications('notification', content, null, userType);
		dispatch(reset('ManageNotificationsForm'));
		dispatch(setLoaderComplete('sendNotification'));
	} catch (error) {
		showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
	}
}

export default submit;
