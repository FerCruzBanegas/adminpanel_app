import { AdminRoles } from '../../../models';
import { AdminRolesType } from '../../../types/siteadmin/AdminRolesType';

const getAllAdminRoles = {

  type: AdminRolesType,

  async resolve({ request }) {

    try {
      const results = await AdminRoles.findAll({
        order: [['updatedAt', 'DESC']]
      });

      return {
        results: results && results.length > 0 ? results : [],
        status: 200
      }

    } catch (error) {
      return {
        errorMessage: 'Something went wrong ' + error,
        status: 400
      };
    }

  }
};

export default getAllAdminRoles;