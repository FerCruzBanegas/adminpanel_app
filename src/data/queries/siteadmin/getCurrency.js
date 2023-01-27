import {
	GraphQLInt as IntType,
	GraphQLString as StringType
} from 'graphql';
import sequelize from '../../sequelize';
import { Currencies } from '../../models';
import CurrencyListType from '../../types/siteadmin/CurrencyListType';

const getCurrency = {

	type: CurrencyListType,

	args: {
		currentPage: { type: IntType },
		searchList: { type: StringType }
	},

	async resolve({ request }, { currentPage, searchList }) {

		try {

			let limit = 10;
			let offset = 0;

			if (currentPage) {
				offset = (currentPage - 1) * limit
			}

			let keywordFilter = [
				{
					id: {
						or: [
							{ in: [sequelize.literal(`SELECT id from Currencies where id like '%${searchList}%'`)] },
							{ in: [sequelize.literal(`SELECT id from Currencies where symbol like '%${searchList}%'`)] },
						]
					}
				}
			]

			let results = await Currencies.findAll({
				limit,
				offset,
				where: {
					and: keywordFilter
				},
				order: [
					['isBaseCurrency', 'DESC'],
					['id', 'DESC']
				]
			});

			let count = await Currencies.count({
				where: {
					and: keywordFilter
				}
			});

			return {
				results,
				count
			}

		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}
	}

};

export default getCurrency;