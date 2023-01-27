import gql from 'graphql-tag';
import { change } from 'redux-form';
import {
	MOBILE_SETTINGS_UPLOAD_START,
	MOBILE_SETTINGS_UPLOAD_ERROR,
	MOBILE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index'

import { setLoaderStart, setLoaderComplete } from '../loader/loader'
import { api } from '../../config';
import { showToaster } from '../../helpers/toastrMessgaes/showToaster';

export function updateMobileSettings({
	appForceUpdate,
	userAndroidVersion,
	userIosVersion,
	partnerAndroidVersion,
	partnerIosVersion,
	stripePublishableKey,
	allowableDistace,
	allowedServices,
	notificationInterval,
	sleepPartnerAndroid,
	sleepPartnerios,
	contactPhoneNumber,
	contactEmail,
	skype,
	maximumEmergencyContact,
	duration,
	job,
	photo,
	description,
	estimatedPrice,
	location,
	requestTimeTone,
	isRequestTimerToneEnable,
	openAppOnRequest,
	requestToneFile,
	defaultScheduleInterval
}) {

	try {
		return async (dispatch, getState, { client }) => {
			dispatch({ type: MOBILE_SETTINGS_UPLOAD_START });
			const mutation = gql`
            mutation updateMobileSettings(
                $appForceUpdate: String
                $userAndroidVersion: String
                $userIosVersion: String
                $partnerAndroidVersion: String
                $partnerIosVersion: String,
                $stripePublishableKey: String,
				$allowableDistace: String,
                $allowedServices: String
                $notificationInterval: String				
                $sleepPartnerAndroid: String
                $sleepPartnerios: String
				$contactPhoneNumber: String
				$contactEmail: String
				$skype: String,
				$maximumEmergencyContact: String
				$duration: String
                $job: String
				$photo: String
				$description: String
				$estimatedPrice: String,
				$location: String
				$requestTimeTone: String
				$isRequestTimerToneEnable: String
				$openAppOnRequest: String
				$requestToneFile: String,
				$defaultScheduleInterval: String
                ) {
                    updateMobileSettings(
                    appForceUpdate: $appForceUpdate
                    userAndroidVersion: $userAndroidVersion
                    userIosVersion: $userIosVersion
                    partnerAndroidVersion: $partnerAndroidVersion
                    partnerIosVersion: $partnerIosVersion,
                    stripePublishableKey: $stripePublishableKey,
                    allowableDistace: $allowableDistace,
                    allowedServices: $allowedServices,
                    notificationInterval: $notificationInterval,
                    sleepPartnerAndroid: $sleepPartnerAndroid,
                    sleepPartnerios: $sleepPartnerios,
					contactPhoneNumber: $contactPhoneNumber,
					contactEmail: $contactEmail,
					skype: $skype,
					maximumEmergencyContact: $maximumEmergencyContact,
					duration: $duration,
					job: $job,
					photo: $photo,
					description: $description,
					estimatedPrice: $estimatedPrice,
					location: $location
					requestTimeTone: $requestTimeTone
					isRequestTimerToneEnable: $isRequestTimerToneEnable
					openAppOnRequest: $openAppOnRequest
					requestToneFile: $requestToneFile
					defaultScheduleInterval: $defaultScheduleInterval
                    ){
                      status
					  errorMessage
                    }
                }
            `
			dispatch(setLoaderStart('MobileSettings'));

			const { data } = await client.mutate({
				mutation,
				variables: {
					appForceUpdate,
					userAndroidVersion,
					userIosVersion,
					partnerAndroidVersion,
					partnerIosVersion,
					stripePublishableKey,
					allowableDistace,
					allowedServices,
					notificationInterval,
					sleepPartnerAndroid,
					sleepPartnerios,
					contactPhoneNumber,
					contactEmail,
					skype,
					maximumEmergencyContact,
					duration,
					job,
					photo,
					description,
					estimatedPrice,
					location,
					requestTimeTone,
					isRequestTimerToneEnable,
					openAppOnRequest,
					requestToneFile,
					defaultScheduleInterval
				}
			});

			dispatch(setLoaderComplete('MobileSettings'));

			if (data && data.updateMobileSettings && data.updateMobileSettings.status == 200) {
				dispatch({ type: MOBILE_SETTINGS_UPLOAD_SUCCESS });
				showToaster({ messageId: 'mobileSettingsSuccess', toasterType: 'success' });
			}
			else {
				let errorMessage = data && data.updateMobileSettings && data.updateMobileSettings.errorMessage || 'Something went wrong';
				dispatch({ type: MOBILE_SETTINGS_UPLOAD_ERROR });
				showToaster({ messageId: 'errorMessage', requestContent: { content: errorMessage }, toasterType: 'error' });
			}
		}
	}
	catch (error) {
		dispatch({ type: MOBILE_SETTINGS_UPLOAD_ERROR });
		showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
	}
}

export function deleteTone(fileName) {
	return async (dispatch, getState, { client }) => {
		dispatch({
			type: MOBILE_SETTINGS_UPLOAD_START
		})

		try {

			dispatch(change("MobileSettingsForm", "requestTimeTone", null));

			const url = api.apiEndpoint + "/deleteTone";
			const resp = await fetch(url, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ fileName }),
			});

			const { status } = await resp.json();

			if (status == 200) {

				const mutation = gql`
				mutation updateTone {
						updateTone {
						status
						}
					}
				`
				const { data } = await client.mutate({
					mutation
				})

				dispatch({
					type: MOBILE_SETTINGS_UPLOAD_SUCCESS
				})

			} else {
				dispatch({
					type: MOBILE_SETTINGS_UPLOAD_ERROR
				})
			}

		} catch (err) {
			dispatch({
				type: MOBILE_SETTINGS_UPLOAD_ERROR
			})
			showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
			return true;
		}
	}
}