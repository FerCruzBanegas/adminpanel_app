import {
	GraphQLInt as IntType,
	GraphQLString as StringType
} from 'graphql';
import sequelize from '../../../sequelize';
import { FailedTransactionHistory } from '../../../models';
import FailedTransactionListType from '../../../types/siteadmin/FailedTransactionListType';

const getFailedPayoutList = {
	type: FailedTransactionListType,

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
									{ in: [sequelize.literal(`SELECT id FROM FailedTransactionHistory WHERE bookingId like '%${searchList}%'`)] },
									{ in: [sequelize.literal(`SELECT id FROM FailedTransactionHistory WHERE reason like '%${searchList}%'`)] },
									{ in: [sequelize.literal(`SELECT id FROM FailedTransactionHistory WHERE amount like '%${searchList}%'`)] },
								]
							}
						},
						{ userId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
					]
				};
			}

			let results = await FailedTransactionHistory.findAll({
				limit,
				offset,
				where: {
					and: [
						keywordFilter,
					]
				},
				order: [['id', 'DESC']],
			});

			let count = await FailedTransactionHistory.count({
				where: {
					and: [
						keywordFilter,
					]
				},
			});

			return {
				results,
				count
			}
			
		}
	}
}

export default getFailedPayoutList;
