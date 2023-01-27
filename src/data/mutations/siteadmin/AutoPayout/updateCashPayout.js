import {
	GraphQLInt as IntType,
	GraphQLBoolean as BooleanType
} from 'graphql';
import { Booking, TransactionHistory } from '../../../models';
import BookingType from '../../../types/siteadmin/BookingType';

const updateCashPayout = {

	type: BookingType,

	args: {
		id: { type: IntType },
		payoutStatus: { type: BooleanType },
	},

	async resolve({ request }, { id, payoutStatus }) {
		try {

			if (request.user && request.user.admin) {
				let bookingData = await Booking.findOne({
					where: {
						id
					}
				});

				let updatePayout = await Booking.update({
					isPayoutPaid: payoutStatus
				},
					{
						where: {
							id
						}
					});

				let partnerTotalFare = bookingData && bookingData.partnerTotalFare;

				if (bookingData.tipsAmount > 0) {
					partnerTotalFare = partnerTotalFare + bookingData && bookingData.tipsAmount;
				}

				let transaction = await TransactionHistory.create({
					bookingId: bookingData.id,
					partnerId: bookingData.partnerId,
					userId: bookingData.userId,
					amount: partnerTotalFare,
					currency: bookingData.currency,
					transactionId: bookingData.id
				});

				return {
					status: updatePayout ? 200 : 400,
					errorMessage: updatePayout ? null : 'Something went wrong!',
				}

			} else {
				return {
					status: 500,
					errorMessage: 'Please login with your account and continue.'
				}
			}
		} catch (error) {
			return {
				status: 400,
				errorMessage: error
			}
		}
	}
}

export default updateCashPayout;