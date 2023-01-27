import fetch from 'node-fetch';
import { api } from '../../config';

export async function sendSocketNotification(endPoint, content, failedMessage) {

    const response = await fetch(api.apiEndpoint + '/socketNotification', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            endPoint,
            content,
            failedMessage
        }),
        credential: 'include'
    });

    const { status, errorMessage } = await response.json();
    return { status, errorMessage };
}