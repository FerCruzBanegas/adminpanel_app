import SiteSettingsCommonType from '../../types/siteadmin/SiteSettings/SiteSettingsCommonType';
import { SiteSettings } from '../../models';
import {
	GraphQLString as StringType
} from 'graphql'

const getSiteSettings = {

	type: SiteSettingsCommonType,

	args: { type: { type: StringType } },

	async resolve({ request }, { type }) {
		try {
			let where, errorMessage = "Something went wrong";
			if (type) where = { type };

			const results = await SiteSettings.findAll({ where });

			if (results && results.length === 0) errorMessage = "No record found.";

			return {
				results,
				status: results && results.length > 0 ? 200 : 400,
				errorMessage: results && results.length > 0 ? null : errorMessage
			};
		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}
	}
};

export default getSiteSettings;