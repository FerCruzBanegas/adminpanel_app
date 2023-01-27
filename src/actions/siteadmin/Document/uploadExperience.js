import { change } from 'redux-form';
import {
	EXPERIENCE_IMAGE_UPLOAD_ERROR,
	EXPERIENCE_IMAGE_UPLOAD_START,
	EXPERIENCE_IMAGE_UPLOAD_SUCCESS
} from '../../../constants/index';
import uploadIdentityImage from './uploadIdentityImage.graphql';
import removeExperienceMutation from './removeUserExperience.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function uploadExperience(userId, imageName) {

	return async (dispatch, getState, { client }) => {

		try {

			dispatch({
				type: EXPERIENCE_IMAGE_UPLOAD_START
			})

			const { data } = await client.mutate({
				mutation: uploadIdentityImage,
				variables: {
					userId,
					imageName,
					type: 'experience'
				},
			})

			if (data && data.uploadIdentityImage && data.uploadIdentityImage.status == 200) {
				dispatch({
					type: EXPERIENCE_IMAGE_UPLOAD_SUCCESS
				});
				showToaster({ messageId: 'userExp', toasterType: 'success' });
				await dispatch(change("EditPartnerForm", 'experienceDocument', data.uploadIdentityImage.experienceDoc));
			} else {
				showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.uploadIdentityImage && data.uploadIdentityImage.errorMessage }, toasterType: 'error' });
				dispatch({
					type: EXPERIENCE_IMAGE_UPLOAD_ERROR
				});
			}
		} catch (err) {
			showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
			dispatch({
				type: EXPERIENCE_IMAGE_UPLOAD_ERROR
			})
		}
	}
}

export function removeExperience(userId, fileName, type) {
	return async (dispatch, getState, { client }) => {

		try {

			dispatch({
				type: EXPERIENCE_IMAGE_UPLOAD_START
			});

			const { data } = await client.mutate({
				mutation: removeExperienceMutation,
				variables: {
					imageName: fileName,
					userId
				}
			});

			let toasterName;

			if (data && data.removeExperienceDocument && data.removeExperienceDocument.status == 200) {

				dispatch({
					type: EXPERIENCE_IMAGE_UPLOAD_SUCCESS
				});
				if (type === 'experienceDocument') {
					toasterName = 'Experience';
					await dispatch(change("EditPartnerForm", type, data.removeExperienceDocument.experienceDoc));
				} else {
					toasterName = 'User';
					await dispatch(change("EditPartnerForm", type, data.removeExperienceDocument.identityDoc));
				}
				showToaster({ messageId: 'removeDoc', requestContent: { type: toasterName }, toasterType: 'success' });
			} else {
				showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.removeExperienceDocument && data.removeExperienceDocument.errorMessage }, toasterType: 'error' });
				dispatch({
					type: EXPERIENCE_IMAGE_UPLOAD_ERROR
				});
			}


		} catch (error) {
			showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
			dispatch({
				type: EXPERIENCE_IMAGE_UPLOAD_ERROR
			})
		}
	}

}