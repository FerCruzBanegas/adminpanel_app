import UpdateSiteSettingsType from '../../types/siteadmin/UpdateSiteSettingsType';
import { SiteSettings } from '../../models';

const updateTone = {

	type: UpdateSiteSettingsType,

	async resolve({ request }) {
		try {

			if (!request.user || !request.user.admin) {
				return {
					status: 500,
					errorMessage: "Oops! Please login with your account and try again."
				};
			}

			const removeTone = await SiteSettings.update({ value: null }, { where: { name: 'requestTimeTone' } })
			return {
				status: 200
			}


		} catch (err) {
			return {
				status: 400,
				errorMessage: "Something went wrong. Please try again"
			}
		}

	},
};


export default updateTone;
