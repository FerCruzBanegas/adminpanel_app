import {
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLBoolean as BooleanType,
} from 'graphql';

import { SmsMethods } from '../../../models';
import { SmsCommonMethodType } from '../../../types/siteadmin/SmsMethod/SmsMethodType';


const updateSmsMethod = {

	type: SmsCommonMethodType,

	args: {
		id: { type: IntType },
		status: { type: StringType },
		accountId: { type: StringType },
		securityId: { type: StringType },
		phoneNumber: { type: StringType },
		phoneCountryCode: { type: StringType },
		phoneDialCode: { type: StringType },
		updateStatus: { type: BooleanType }

	},

	async resolve({ request }, {
		id,
		status,
		accountId,
		securityId,
		phoneNumber,
		phoneCountryCode,
		phoneDialCode,
		updateStatus
	}) {
		try {
			if (!request.user || !request.user.admin) {
				return {
					status: 500,
					errorMessage: "Oops! Please login and continue."
				};
			}


			const result = await SmsMethods.update(
				{
					status,
					accountId,
					securityId,
					phoneNumber,
					phoneCountryCode,
					phoneDialCode
				},
				{ where: { id } }
			);

			if (result && updateStatus) {
				const result = await SmsMethods.update(
					{
						status: 0
					},
					{ where: { id: { ne: id } } }
				);
			}

			if (!result || result.includes(0)) {
				return {
					status: 400,
					errorMessage: 'Oops! Something went wrong! Unable to update the promo code. Please try again.'
				};
			}


			return { status: 200 };

		}
		catch (error) {
			return {
				status: 400,
				errorMessage: 'Something went wrong.' + error.message
			};
		}
	}
};

export default updateSmsMethod;