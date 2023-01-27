import { SmsMethods } from '../../../models';
import { SmsCommonMethodType } from '../../../types/siteadmin/SmsMethod/SmsMethodType';

const getAllSmsMethod = {

	type: SmsCommonMethodType,

	async resolve({ request }) {
		try {
			if (!request.user || !request.user.admin) {
				return {
					status: 500,
					errorMessage: "Oops! Please login with your account and try again."
				};
			}

			let results = await SmsMethods.findAll({
				order: [['id', 'ASC']]
			});

			return {
				status: 200,
				results
			};
		}
		catch (error) {
			return {
				status: 400,
				errorMessage: 'Oops! Something went wrong.' + error.message
			}
		}
	},
};

export default getAllSmsMethod;
