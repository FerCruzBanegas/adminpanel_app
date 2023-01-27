// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

// Authentication Utils
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Sequelize models
import { AdminUser } from '../../../data/models';

import AdminUserLoginType from '../../types/siteadmin/AdminUserLoginType';

import { auth } from '../../../config';


const adminUserLogin = {

  type: AdminUserLoginType,

  args: {
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },

  async resolve({ request, response }, {
    email,
    password,
  }) {

    try {

      // Check if user already logged in
      if (!request.user) {

        // Check if the user is already exists
        const userLogin = await AdminUser.findOne({
          attributes: ['id', 'email', 'password', 'isSuperAdmin'],
          where: { email },
        });

        // Let the user in
        if (userLogin) {
          if (bcrypt.compareSync(password, userLogin.password)) {
            const expiresIn = 60 * 60 * 24 * 1; // 24 hours
            const token = jwt.sign({ id: userLogin.id, email: userLogin.email, admin: true }, auth.jwt.secret, { expiresIn });
            response.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
            return {
              id: userLogin.id,
              isSuperAdmin: userLogin.isSuperAdmin,
              status: 200,
              token
            };
          } else {
            return {
              status: 400,
              errorMessage: "Wrong Password. Please try again",
            };
          }
        } else {
          return {
            status: 400,
            errorMessage: "No account exists for this email. Make sure it's typed in correctly, or “sign up” instead",
          };
        }
      } else {
        if (request.user.admin == true) {
          const checkSuperAdmin = await AdminUser.findOne({
            attributes: ['id', 'isSuperAdmin'],
            where: { id: request.user.id },
            raw: true
          });
          return {
            id: checkSuperAdmin.id,
            isSuperAdmin: checkSuperAdmin.isSuperAdmin,
            status: 400,
            errorMessage: "You are already logged in!",
          };
        }else{
          return {
            status: 400,
            errorMessage: "You are already logged in as User, please logout in the main site to continue!",
          };
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

export default adminUserLogin;

/*

query (
    $email: String!,
    $password: String!) {
    adminUserLogin (
        email: $email,
        password: $password
    ) {
        status
        token
        errorType
        errorMessage
    }
}

*/
