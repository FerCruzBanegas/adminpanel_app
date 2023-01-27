import {
	GraphQLString as StringType,
	GraphQLInt as IntType
} from 'graphql'
import sequelize from '../../sequelize';

import { Reviews } from '../../models'
import ReviewsWholeType from '../../types/siteadmin/ReviewsWholeType'

const getReviews = {

	type: ReviewsWholeType,

	args: {
		currentPage: { type: IntType },
		searchList: { type: StringType }
	},

	async resolve({ request }, { currentPage, searchList }) {
		try {

			let limit = 10;
			let offset = 0;
			let keywordFilter = {};
			let results = [];

			if (currentPage) {
				offset = (currentPage - 1) * limit;
			}

			if (searchList && searchList.toString().trim() !== '') {

				keywordFilter = {
					or: [
						{ authorId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
						{ userId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
						{ ratings: { in: [sequelize.literal(`SELECT ratings FROM Reviews WHERE ratings like '%${searchList}%'`)] } },
						{ bookingId: { in: [sequelize.literal(`SELECT id FROM Booking WHERE id like '%${searchList}%'`)] } },
					]
				};
			}

			results = await Reviews.findAll({
				attributes: [
					'bookingId',
					[sequelize.fn('GROUP_CONCAT', sequelize.col('userId')), 'userId'],
					[sequelize.fn('GROUP_CONCAT', sequelize.col('authorId')), 'authorId'],
					[sequelize.fn('GROUP_CONCAT', sequelize.col('ratings')), 'ratings'],
				],
				group: ['bookingId'],
				limit,
				offset,
				where: {
					and: [
						keywordFilter
					]
				},
				order: [['bookingId', 'DESC']],
			});

			const count = await Reviews.findAll({
				attributes: ['bookingId'],
				group: ['bookingId'],
				where: {
					and: [
						keywordFilter
					]
				},
				raw: true
			});

			return await {
				status: 200,
				count: count && count.length > 0 ? count.length : 0,
				results
			};


		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}
	}
}

export default getReviews;

/*
select a.bookingId, a.userId as userId1, a.ratings as ratings1,
b.userId as userId2, b.ratings as ratings2
from Reviews a, Reviews b
where a.bookingId=696 and b.bookingId=696 and a.bookingId = b.bookingId;
*/