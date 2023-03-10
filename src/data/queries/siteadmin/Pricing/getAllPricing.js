import {
	GraphQLInt as IntType,
	GraphQLString as StringType
} from 'graphql';

import sequelize from '../../../sequelize';

import { Pricing } from '../../../models'
import PricingCommonType from '../../../types/siteadmin/Pricing/PricingCommonType';

const getAllPricing = {

	type: PricingCommonType,

	args: {
		currentPage: { type: IntType },
		searchKeyword: { type: StringType }
	},

	async resolve({ request }, { currentPage, searchKeyword }) {
		try {
			if (request.user && request.user.admin) {
				let limit = 10, offset = 0, keywordFilter = {};
				let commonFilter = {
					and: [
						{
							categoryId: {
								ne: null
							}
						},
						{
							locationId: {
								ne: null
							}
						}
					]
				};

				if (currentPage) {
					offset = (currentPage - 1) * limit;
				}

				if (searchKeyword) {
					keywordFilter = {
						or: [{
							locationId: {
								in: [sequelize.literal(`SELECT id FROM Location WHERE locationName LIKE '%${searchKeyword}%'`)]
							}
						}, {
							categoryId: {
								in: [sequelize.literal(`SELECT id FROM Category WHERE name LIKE '%${searchKeyword}%'`)]
							}
						}, {
							subCategoryId: {
								in: [sequelize.literal(`SELECT id FROM SubCategory WHERE name LIKE '%${searchKeyword}%'`)]
							}
						}, {
							id: {
								in: [sequelize.literal(`SELECT id FROM Pricing WHERE basePrice LIKE '%${searchKeyword}%'`)]
							}
						}
						]
					};
				}

				const results = await Pricing.findAll({
					where: {
						and: [
							commonFilter,
							keywordFilter
						]
					},
					limit,
					offset
				});

				const count = await Pricing.count({
					where: {
						and: [
							commonFilter,
							keywordFilter
						]
					}
				});

				return await {
					results,
					count,
					status: 200
				};
			} else {
				return {
					status: 500,
					errorMessage: 'Please login with your account and continue.'
				};
			}
		} catch (error) {
			return {
				status: 400,
				errorMessage: 'Sorry something went wrong, ' + error
			};
		}
	}
}

export default getAllPricing;