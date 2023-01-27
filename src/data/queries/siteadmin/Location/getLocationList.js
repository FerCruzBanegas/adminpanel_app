import {
	GraphQLInt as IntType,
	GraphQLString as StringType
} from 'graphql';

import sequelize from '../../../sequelize';
import { Location } from '../../../models';
import LocationListType from '../../../types/siteadmin/LocationListType';

const getLocationList = {
	type: LocationListType,

	args: {
		currentPage: { type: IntType },
		searchList: { type: StringType }
	},

	async resolve({ request }, { currentPage, searchList }) {
		try {

			if (request.user && request.user.admin) {
				let limit = 10;
				let offset = 0;
				let keywordFilter;
				if (currentPage) {
					offset = (currentPage - 1) * limit

					keywordFilter = [
						{
							id: {
								or: [
									{ in: [sequelize.literal(`SELECT id FROM Location WHERE locationName like '%${searchList}%'`)] },
									{ in: [sequelize.literal(`SELECT id FROM Location WHERE description like '%${searchList}%'`)] },
									{ in: [sequelize.literal(`SELECT id FROM Location WHERE isActive like '%${searchList}%'`)] },
								]
							}
						}
					]

					let results = await Location.findAll({
						limit,
						offset,
						order: [['id', 'DESC']],
						where: {
							or: keywordFilter,
						},
						raw: true
					});
					let count = await Location.count({
						where: {
							or: keywordFilter,
						},
					});

					return {
						results: results && results.length > 0 ? results : [],
						count: results && results.length > 0 ? count : 0,
					}
				}

			} else {
				return {
					status: 500,
					errorMessage: 'Please login'
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

export default getLocationList;
