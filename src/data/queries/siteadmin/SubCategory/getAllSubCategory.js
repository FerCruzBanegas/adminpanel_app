
import {
  GraphQLInt as IntType,
  GraphQLString as StringType
} from 'graphql';
import sequelize from '../../../sequelize';

import { SubCategory } from '../../../models';
import SubCategoryCommonType from '../../../types/siteadmin/SubCategory/SubCategoryCommonType';

const getAllSubCategory = {

  type: SubCategoryCommonType,

  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType }
  },

  async resolve({ request }, { currentPage, searchList }) {
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
                  { in: [sequelize.literal(`SELECT id FROM SubCategory WHERE name like '%${searchList}%'`)] },
                  { in: [sequelize.literal(`SELECT id FROM SubCategory WHERE id like '%${searchList}%'`)] },
                  { in: [sequelize.literal(`SELECT id FROM SubCategory WHERE status like '%${searchList}%'`)] },
                ]
              }
            },
          ];

        let results = await SubCategory.findAll({
          where: {
            and: keywordFilter
          },
          limit,
          offset,
          order: [['createdAt', 'DESC']],
        });

        let count = await SubCategory.count({
          where: {
            and: keywordFilter
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

export default getAllSubCategory;
