import {
	GraphQLInt as IntType,
	GraphQLString as StringType
} from 'graphql';
import { Currencies, UserProfile, User } from '../../../models';
import CurrenciesType from '../../../types/siteadmin/CurrenciesType';

const removeCurrency = {

	type: CurrenciesType,

	args: {
		id: { type: IntType },
		symbol: { type: StringType }
	},

	async resolve({ request }, { id, symbol }) {
		try {

			if (request.user && request.user.admin == true) {
				let removeCurrency;

				const users = await UserProfile.findOne({
					attributes: ['preferredCurrency'],
					where: {
						preferredCurrency: symbol
					},
					include: [{
						model: User,
						as: 'user',
						attributes: ['id'],
						required: true,
						where: {
							deletedAt: null
						},
					}],
					raw: true
				});


				if (id) {

					if (users) {
						return {
							status: 400,
							errorMessage: 'Oops! This currency is used as the preferred currency.'
						}
					}

					removeCurrency = await Currencies.destroy(
						{
							where: {
								id
							}
						}
					);
				}

				return {
					status: removeCurrency ? 200 : 400
				}

			} else {
				return {
					status: 400,
					errorMessage: 'Something went wrong, Please login.',
				}
			}
		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}
	},
};

export default removeCurrency;