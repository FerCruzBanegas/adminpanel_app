import {
  GraphQLInt as IntType,
  GraphQLString as StringType
} from 'graphql';
import sequelize from '../../../sequelize';

import { UserProfile, User } from '../../../models';
import UserManagementWholeData from '../../../types/siteadmin/User/UserManagementWholeData';

const getAllUsers = {

  type: UserManagementWholeData,

  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType },
    userType: { type: IntType },
  },

  async resolve({ request }, { currentPage, searchList, userType }) {
    try {
      if (request.user && request.user.admin) {
        let limit = 10;
        let offset = 0;
        let keywordFilter;
        if (currentPage) {
          offset = (currentPage - 1) * limit;
        }
        keywordFilter = [
          {
            id: {
              or: [
                { in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${searchList}%'`)] },
                { in: [sequelize.literal(`SELECT id FROM User WHERE phoneDialCode like '%${searchList}%'`)] },
                { in: [sequelize.literal(`SELECT id FROM User WHERE phoneNumber like '%${searchList}%'`)] },
                { in: [sequelize.literal(`SELECT id FROM User WHERE createdAt like '%${searchList}%'`)] },
                { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE profileId like '%${searchList}%'`)] },
                { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] },
                { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE lastName like '%${searchList}%'`)] },
                { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE country like '%${searchList}%'`)] },
              ]
            }
          },
        ]
        let results = await User.findAll({
          limit,
          offset,
          where: {
            and: keywordFilter,
            userType,
            deletedAt: null
          },
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: UserProfile,
              as: 'profile',
              required: true
            }
          ]

        });

        let count = User.count({
          where: {
            and: keywordFilter,
            userType,
            deletedAt: null
          }
        });

        return {
          results: results && results.length > 0 ? results : [],
          count: results && results.length > 0 ? count : 0,
          errorMessage: results && results.length > 0 ? null : 'No records found'
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

export default getAllUsers;
