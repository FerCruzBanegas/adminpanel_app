import {
	GraphQLString as StringType,
	GraphQLID as ID,
	GraphQLInt as IntType
} from 'graphql';
import { User, UserProfile, Country, Booking } from '../../../models';
import UserType from '../../../types/siteadmin/User/UserType';
import { sendNotifications } from '../../../../helpers/push-notification/sendNotifications'
import { sendSocketNotification } from '../../../../core/socketNotifications/sendSocketNotification';

const updateUser = {
	type: UserType,

	args: {
		id: { type: ID },
		firstName: { type: StringType },
		lastName: { type: StringType },
		email: { type: StringType },
		phoneDialCode: { type: StringType },
		phoneNumber: { type: StringType },
		userStatus: { type: StringType },
		isBan: { type: IntType },
		phoneCountryCode: { type: StringType },
	},

	async resolve({ request }, {
		id, firstName, lastName, email,
		phoneDialCode, phoneNumber, userStatus, isBan, phoneCountryCode }) {
		try {

			if (request.user && request.user.admin) {
				const checkUserExist = await User.findOne({
					attributes: ['email', 'phoneNumber', 'phoneCountryCode'],
					where: {
						or: [{
							email
						}, {
							phoneNumber,
							phoneCountryCode,
							phoneDialCode
						}],
						id: {
							ne: id
						},
						deletedAt: null
					},
					raw: true
				});

				if (checkUserExist) {
					if (checkUserExist && checkUserExist.email === email) {
						return {
							status: 400,
							errorMessage: 'Oops, the provided email is already exits with the other user.'
						};
					} else {
						return {
							status: 400,
							errorMessage: 'Oops, the provided phone number is already exits with the other user.'
						};
					}
				}
				const userStatusData = await Booking.findOne({
					attributes: ['id'],
					where: {
						and: [
							{ or: [{ partnerId: id }, { userId: id }] },
							{
								status: { in: ['approved', 'created', 'started', 'arrived', 'reviewed', 'scheduled'] },
							}
						]
					},
					raw: true
				});

				const existingStatus = await User.findOne({
					attributes: ['isBan', 'userStatus', 'userType'],
					where: {
						id,
						deletedAt: null
					},
					raw: true
				});

				if (userStatusData && userStatusData.id && (existingStatus.isBan != isBan || existingStatus.userStatus != userStatus)) {
					return {
						status: 400,
						errorMessage: "Oops! it looks like the user has an active booking and so we are unable to delete them right now."
					}
				}

				let pushNotificationContent = {
					name: firstName
				}

				const updateUser = await User.update({
					email,
					phoneDialCode,
					phoneNumber,
					userStatus,
					isBan,
					phoneCountryCode
				}, {
					where: {
						id
					}
				});

				if (updateUser) {
					let getCountry, where;
					if (phoneCountryCode.length > 2) {
						where = {
							countryName: phoneCountryCode
						};
					} else {
						where = { countryCode: phoneCountryCode };
					}
					getCountry = await Country.findOne({
						attributes: ['countryName'],
						where,
						raw: true
					});

					const updateUserProfile = await UserProfile.update({
						firstName,
						lastName,
						country: getCountry && getCountry.countryName
					}, {
						where: {
							userId: id
						}
					});

					const userProfile = await UserProfile.findOne({
						attributes: ['preferredLanguage'],
						where: {
							userId: id
						}
					});

					if (isBan) {
						sendSocketNotification(`partnerApprove-${id}`, {
							status: 200,
							data: {
								id,
								userStatus,
								isBan
							}
						});
						sendNotifications('banService', pushNotificationContent, id, existingStatus.userType, userProfile.preferredLanguage);
					}

					return await {
						status: updateUserProfile ? 200 : 400,
						errorMessage: updateUserProfile ? null : "Something went wrong! Please try again."
					}
				} else {
					return {
						status: 400,
						errorMessage: 'Oops! Something went wrong, unable to update the user information.'
					};
				}
			} else {
				return {
					status: 500,
					errorMessage: 'Oops! Please login as an admin and continue the action'
				};
			}
		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}
	}
}

export default updateUser;