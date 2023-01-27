import { AdminUser } from '../../../models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';
const getAllAdminUsers = {

  type: AdminUserType,

  async resolve({ request }) {

    try {
      const results = await AdminUser.findAll({
        where: {
          isSuperAdmin: {
            ne: true
          }
        },
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

export default getAllAdminUsers;