import { GraphQLString as StringType } from 'graphql';

import { SiteSettings } from '../../models';

import UpdateSiteSettingsType from '../../types/siteadmin/UpdateSiteSettingsType';

const updateMobileSettings = {

	type: UpdateSiteSettingsType,

	args: {
		appForceUpdate: { type: StringType },
		userAndroidVersion: { type: StringType },
		userIosVersion: { type: StringType },
		partnerAndroidVersion: { type: StringType },
		partnerIosVersion: { type: StringType },
		stripePublishableKey: { type: StringType },
		allowableDistace: { type: StringType },
		allowedServices: { type: StringType },
		notificationInterval: { type: StringType },
		sleepPartnerAndroid: { type: StringType },
		sleepPartnerios: { type: StringType },
		contactPhoneNumber: { type: StringType },
		contactEmail: { type: StringType },
		skype: { type: StringType },
		maximumEmergencyContact: { type: StringType },
		duration: { type: StringType },
		job: { type: StringType },
		photo: { type: StringType },
		description: { type: StringType },
		estimatedPrice: { type: StringType },
		location: { type: StringType },
		requestTimeTone: { type: StringType },
		isRequestTimerToneEnable: { type: StringType },
		openAppOnRequest: { type: StringType },
		requestToneFile: { type: StringType },
		defaultScheduleInterval: { type: StringType },
	},

	async resolve({ request }, {
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
			if (!request.user || !request.user.admin) {
				return {
					status: 500,
					errorMessage: "Oops! Please login with your account and try again."
				};
			}

			let appSettingsFields = {
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
			};

			await Promise.all([
				Object.keys(appSettingsFields).map(async (item) => {
					await SiteSettings.update({ value: appSettingsFields[item] }, { where: { name: item } })
				})
			]);

			return { status: 200 };
		} catch (err) {
			return {
				status: 400,
				errorMessage: "Something went wrong. Please try again"
			};
		}
	},
};

export default updateMobileSettings;