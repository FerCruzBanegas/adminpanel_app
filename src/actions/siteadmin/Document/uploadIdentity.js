import { change } from 'redux-form';

import {
	IDENTITY_IMAGE_UPLOAD_ERROR,
	IDENTITY_IMAGE_UPLOAD_START,
	IDENTITY_IMAGE_UPLOAD_SUCCESS
} from '../../../constants/index';
import uploadIdentityImage from './uploadIdentityImage.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export default function uploadIdentity(userId, imageName) {

	return async (dispatch, getState, { client }) => {
		dispatch({
			type: IDENTITY_IMAGE_UPLOAD_START
		})

		try {

			const { data } = await client.mutate({
				mutation: uploadIdentityImage,
				variables: {
					userId,
					imageName,
					type: 'identity'
				}
			});

			if (data && data.uploadIdentityImage && data.uploadIdentityImage.status == 200) {
				dispatch({
					type: IDENTITY_IMAGE_UPLOAD_SUCCESS
				})
				showToaster({ messageId: 'userExp', toasterType: 'success' });
				await dispatch(change("EditPartnerForm", 'identityDocument', data.uploadIdentityImage.identityDoc));
			} else {
				showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.uploadIdentityImage && data.uploadIdentityImage.errorMessage }, toasterType: 'error' });
				dispatch({
					type: IDENTITY_IMAGE_UPLOAD_ERROR
				})
			}
		} catch (err) {
			showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
			dispatch({
				type: IDENTITY_IMAGE_UPLOAD_ERROR
			})
		}
	}
}