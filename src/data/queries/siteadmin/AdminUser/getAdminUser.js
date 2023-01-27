import { AdminUser } from '../../../models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';

const getAdminUser = {

  type: AdminUserType,

  async resolve({ request }) {

    try {
      if (request.user && request.user.admin) {
        let result = await AdminUser.findOne({
          where: {
            id: request.user.id
          }
        });

        return {
          status: 200,
          result
        }
      } else {
        return {
          status: 400,
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
};

export default getAdminUser;