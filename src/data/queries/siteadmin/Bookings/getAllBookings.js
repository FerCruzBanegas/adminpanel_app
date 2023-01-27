import {
	GraphQLInt as IntType,
	GraphQLString as StringType,
	GraphQLBoolean as BooleanType
} from 'graphql';
import sequelize from '../../../sequelize';
import { Booking } from '../../../models';
import BookingManagementWholeType from '../../../types/siteadmin/BookingManagementWholeType';

const getAllBookings = {
	type: BookingManagementWholeType,

	args: {
		currentPage: { type: IntType },
		searchList: { type: StringType },
		bookingType: { type: IntType },
	},

	async resolve({ request }, { currentPage, searchList, bookingType }) {
		try {
			if (request.user && request.user.admin) {
				let limit = 10;
				let offset = 0;
				let statusFilter = {}, keywordFilter = {}, bookingTypeFilter = {};

				//Booking Type Filter
				if (bookingType) bookingTypeFilter = { bookingType };;

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
							statusFilter,
							bookingTypeFilter
						]
					},
					limit,
					offset,
					order: [['createdAt', 'DESC']]
				});

				const count = await Booking.count({
					where: {
						and: [
							keywordFilter,
							statusFilter,
							bookingTypeFilter
						]
					}
				});

				return {
					results,
					count,
					status: 200
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

export default getAllBookings;
