import {
	GraphQLString as StringType,
	GraphQLID as ID,
	GraphQLInt as IntType
} from 'graphql';
import { User, UserProfile, Country, Booking } from '../../../models';
import UserType from '../../../types/siteadmin/User/UserType';
import { sendNotifications } from '../../../../helpers/push-notification/sendNotifications'
import { sendSocketNotification } from '../../../../core/socketNotifications/sendSocketNotification';

const updatePartner = {
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
		phoneCountryCode: { type: StringType }
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

				const partnerStatus = await Booking.findOne({
					attributes: ['id'],
					where: {
						and: [
							{ or: [{ partnerId: id }, { userId: id }] },
							{
								status: { in: ['approved', 'created', 'started', 'arrived', 'reviewed', 'started', 'scheduled'] },
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

				if (partnerStatus && partnerStatus.id && (existingStatus.isBan != isBan || existingStatus.userStatus != userStatus)) {
					return {
						status: 400,
						errorMessage: "Can't Change the status as currently, they are doing service, Please try again later"
					}
				}

				if (userStatus || isBan) {
					sendSocketNotification(`partnerApprove-${id}`, {
						status: 200,
						data: {
							id,
							userStatus,
							isBan
						}
					});
				}

				let country;
				if (phoneCountryCode.length > 2) {
					country = await Country.findOne({
						attributes: ['countryName'],
						where: { countryName: phoneCountryCode },
						raw: true
					});
				} else {
					country = await Country.findOne({
						attributes: ['countryName'],
						where: { countryCode: phoneCountryCode },
						raw: true
					});
				}


				const updateUser = await User.update({
					email,
					phoneDialCode,
					phoneNumber,
					phoneCountryCode,
					userStatus,
					isBan
				}, {
					where: {
						id
					}
				});

				if (userStatus && userStatus !== 'active') {
					const updateUserActiveStatus = await User.update({
						isActive: false
					}, {
						where: {
							id
						}
					});
				}

				let pushNotificationContent = {
					name: firstName
				}

				const userProfile = await UserProfile.findOne({
					attributes: ['preferredLanguage'],
					where: {
						userId: id
					}
				});

				if (isBan) {
					sendNotifications('banService', pushNotificationContent, id, existingStatus.userType, userProfile.preferredLanguage);
				}

				if (updateUser) {
					const updateUserProfile = await UserProfile.update({
						firstName,
						lastName,
						country: country && country.countryName
					}, {
						where: {
							userId: id
						}
					});

					return await {
						status: 200
					};
				} else {
					return {
						errorMessage: 'Oops! Something went wrong, unable to update the user information.'
					};
				}
			} else {
				return {
					errorMessage: 'Please login as an admin and continue the action.'
				};
			}
		} catch (err) {
			return {
				status: 400,
				errorMessage: "Something went wrong. Please try again"
			};
		}
	}
}

export default updatePartner;

//GraphQL

// mutation updatePartner(
//     $id: ID,
//     $firstName: String,
//     $lastName: String,
//     $email: String,
//     $password: String,
//     $phoneNumber: String,
// 		$userStatus: String
//     ) {
//     updatePartner(
//       id: $id
//       firstName: $firstName
//       lastName: $lastName
//       email:$email
//       password: $password
//       phoneNumber: $phoneNumber
// 			userStatus: $userStatus
//     )
//     {
//       status
//     }
//   }


// {
//     "id": "e061c360-0f5d-11ea-a0d1-e52d223bb23c",
//     "firstName": "Syed",
//     "lastName": "Radical",
//     "email": "sg@radical.com",
//     "phoneNumber": "9090909090",
//     "password": "qwerty123",
//     "userStatus": "active"
//   }