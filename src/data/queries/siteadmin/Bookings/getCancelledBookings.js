import {
	GraphQLInt as IntType,
	GraphQLString as StringType
} from 'graphql';
import sequelize from '../../../sequelize';
import { Booking } from '../../../models';
import BookingMannagementWholeType from '../../../types/siteadmin/BookingManagementWholeType';

const getCancelledBookings = {
	type: BookingMannagementWholeType,

	args: {
		currentPage: { type: IntType },
		searchList: { type: StringType }
	},

	async resolve({ request }, { currentPage, searchList }) {
		try {

			if (request.user && request.user.admin) {
				let limit = 10;
				let offset = 0;
				let keywordFilter = {};


				//Search Filter
				if (searchList) {
					keywordFilter = {
						or: [
							{
								id: {
									or: [
										{ in: [sequelize.literal(`SELECT id FROM Booking WHERE id like '%${searchList}%'`)] },
										{ in: [sequelize.literal(`SELECT id FROM Booking WHERE status like '%${searchList}%'`)] },
										{ in: [sequelize.literal(`SELECT id FROM Booking WHERE totalFare like '%${searchList}%'`)] },
									]
								}
							},
							{ userId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
							{ partnerId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
						]
					};
				}

				if (currentPage) {
					offset = (currentPage - 1) * limit
				}

				const results = await Booking.findAll({
					where: {
						and: [
							keywordFilter,
						],
						status: { in: ['cancelledByUser', 'cancelledByPartner'] },
					},
					limit,
					offset,
					order: [['id', 'DESC']],
				});

				const count = await Booking.count({
					where: {
						and: [
							keywordFilter,
						],
						status: { in: ['cancelledByUser', 'cancelledByPartner'] },
					}
				});

				return {
					status: 200,
					results,
					count
				}

			}
		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}

	}
}

export default getCancelledBookings;
