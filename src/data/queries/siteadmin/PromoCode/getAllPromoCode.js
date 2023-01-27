import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';
import sequelize from '../../../sequelize';

import { PromoCode } from '../../../models';

import PromoCodeCommonType from '../../../types/siteadmin/PromoCode/PromoCodeCommonType';

const getAllPromoCode = {

    type: PromoCodeCommonType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {
        try {
            if (!request.user || !request.user.admin) {
                return {
                    status: 500,
                    errorMessage: "Oops! Please login with your account and try again."
                };
            }

            let limit = 10, offset = 0, keywordFilter = [];
            if (currentPage) offset = (currentPage - 1) * limit;

            if (searchList) {
                keywordFilter = [
                    {
                        id: {
                            or: [
                                { in: [sequelize.literal(`SELECT id FROM PromoCode WHERE id like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM PromoCode WHERE code like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM PromoCode WHERE title like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM PromoCode WHERE promoValue like '%${searchList}%'`)] },

                            ]
                        }
                    },
                ];
            }

            let results = await PromoCode.findAll({
                where: { and: keywordFilter },
                limit,
                offset,
                order: [['updatedAt', 'DESC']]
            });

            let count = PromoCode.count({ where: { and: keywordFilter } });

            return {
                status: 200,
                results,
                count
            };
        }
        catch (error) {
            return {
                status: 400,
                errorMessage: 'Oops! Something went wrong.' + error.message
            }
        }
    },
};

export default getAllPromoCode;

/*

query($currentPage: Int) {
    getAllPromoCode(currentPage: $currentPage) {
        status
        errorMessage
        count
        results {
          id
          title
          description
          code
          type
          promoValue
          currency
          expiryDate
          isEnable
          createdAt
          updatedAt
        }
    }
}

*/