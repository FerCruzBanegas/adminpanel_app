import SiteSettingsCommonType from '../../types/siteadmin/SiteSettings/SiteSettingsCommonType';
import { SiteSettings } from '../../models';

const getEmailLogo = {

  type: SiteSettingsCommonType,

  async resolve() {
    try {

      const results = await SiteSettings.findAll({
        where: {
          name: {
            in: ['homeLogo', 'siteName']
          },
        }
      });

      return {
        results,
        status: results ? 200 : 400,
        errorMessage: results ? null : 'Oops! No record found.'
      };
    } catch (error) {
      return {
        errorMessage: 'Something went wrong ' + error,
        status: 400
      };
    }
  }
};

export default getEmailLogo;