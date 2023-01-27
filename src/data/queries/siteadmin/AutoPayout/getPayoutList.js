import {
	GraphQLInt as IntType,
	GraphQLString as StringType
} from 'graphql';
import sequelize from '../../../sequelize';
import { Booking } from '../../../models';

import BookingMannagementWholeType from '../../../types/siteadmin/BookingManagementWholeType';

const getPayoutList = {
	type: BookingMannagementWholeType,

	args: {
		currentPage: { type: IntType },
		searchList: { type: StringType }
	},

	async resolve({ request }, { currentPage, searchList }) {

		if (request.user && request.user.admin) {
			let limit = 10;
			let offset = 0;
			let keywordFilter = {};
			if (currentPage) {
				offset = (currentPage - 1) * limit;
			}

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

			let results = await Booking.findAll({
				limit,
				offset,
				where: {
					and: [
						keywordFilter,
					],
					status: { eq: 'completed' }
				},
				order: [['id', 'DESC']],
			});

			let count = await Booking.count({
				where: {
					and: [
						keywordFilter,
					],
					status: { eq: 'completed' }
				}
			});

			return {
				results,
				count
			}

		}
	}
}

export default getPayoutList;
