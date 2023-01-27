import fetch from 'node-fetch';
import { pushNotificationMessage } from './pushNotificationMessage';
import { siteUrl } from '../../config';
import { showToaster } from '../../helpers/toastrMessgaes/showToaster';

export async function sendNotifications(type, requestContent, userId, userType, lang) {

    let content = {};

    if (type !== 'notification') {
        const { title, message } = await pushNotificationMessage(type, requestContent, lang);
        content = requestContent;
        content['title'] = title;
        content['message'] = message;
    } else {
        content = requestContent;
    }

    const resp = await fetch(siteUrl + '/push-notification', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            userId,
            userType
        }),
        // credentials: 'include'
    });

    const { status, errorMessge } = await resp.json();

    showToaster({ messageId: 'pushNotificationSent', toasterType: 'success' });

    return await {
        status,
        errorMessge
    };
}

export default {
    sendNotifications
}
