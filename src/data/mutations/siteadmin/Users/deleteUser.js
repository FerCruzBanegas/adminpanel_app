import {
	GraphQLInt as IntType
} from 'graphql';
import { User, UserProfile, Booking } from '../../../models';
import UserProfileType from '../../../types/siteadmin/User/UserProfileType';
import { sendSocketNotification } from '../../../../core/socketNotifications/sendSocketNotification';

const deleteUser = {
	type: UserProfileType,

	args: {
		profileId: { type: IntType }
	},

	async resolve({ request }, { profileId }) {
		try {

			if (request.user && request.user.admin) {

				const findUser = await UserProfile.findOne({
					attributes: ['userId'],
					where: {
						profileId
					},
					raw: true
				});

				const userId = findUser && findUser.userId;

				const booking = await Booking.findOne({
					attributes: ['id'],
					where: {
						and: [
							{ or: [{ userId }, { partnerId: userId }] },
							{
								or: [{
									status: { in: ['created', 'started', 'approved', 'arrived', 'reviewed', 'scheduled'] }
								}
								]
							}
						]
					}
				});

				if (!booking) {
					const deletedUser = await User.update({
						deletedAt: new Date()
					}, {
						where: {
							id: userId
						}
					});

					if (deletedUser) {
						const errorThrow = 'Oops! We are unable to find your account. Please contact support for help.';
						sendSocketNotification('loginCheck-' + userId, { userId }, errorThrow);
					}

					return await {
						status: deletedUser ? 200 : 400,
						errorMessage: deletedUser ? null : "Something went wrong! Please try again."
					}
				} else {
					return await {
						status: 400,
						errorMessage: "Oops! it looks like the service provider has an active booking and so we are unable to delete them right now."
					}
				}
			} else {
				return {
					status: 500,
					errorMessage: "Please login for this action."
				}
			}
		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}

	}
};

export default deleteUser;