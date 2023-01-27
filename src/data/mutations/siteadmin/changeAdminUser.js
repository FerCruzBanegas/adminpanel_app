import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import AdminUserLoginType from '../../types/siteadmin/AdminUserLoginType';
import { AdminUser } from '../../models';

const changeAdminUser = {

  type: AdminUserLoginType,

  args: {
    email: { type: StringType },
    password: { type: new NonNull(StringType) }
  },

  async resolve({ request }, { email, password }) {
    try {

      if (request.user && request.user.admin) {

        let userId = request.user.id, adminEmail = request.user.email;

        if (email) {
          adminEmail = email;
        }

        const checkAdminUser = await AdminUser.findOne({
          attributes: ['id', 'email'],
          where: {
            email,
            isSuperAdmin: 0
          },
        });

        if (checkAdminUser) {
          return {
            status: 400,
            errorMessage: "Oops! this email address is already exist."
          };
        }

        const updateAdmin = await AdminUser.update(
          {
            email: adminEmail,
            password: AdminUser.prototype.generateHash(password)
          },
          {
            where: {
              id: userId
            }
          }
        );

        return {
          status: updateAdmin ? 200 : 400,
          errorMessage: !updateAdmin ? 'Oops! Something went wrong!' : null
        }

      } else {
        return {
          status: 500,
          errorMessage: "Oops! Please login and continue."
        }
      }
    } catch (error) {
      return {
        status: 400,
        errorMessage: 'Something went wrong.' + error.message
      }
    }
  },
};

export default changeAdminUser;

/*

mutation changeAdminUser($email: String, $password: String!) {
  changeAdminUser (email: $email, password: $password) {
    status
  }
}

*/