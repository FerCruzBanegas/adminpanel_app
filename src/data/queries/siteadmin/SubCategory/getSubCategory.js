import { SubCategory } from '../../../models';
import SubCategoryCommonType from '../../../types/siteadmin/SubCategory/SubCategoryCommonType';

import {
    GraphQLInt as IntType
} from 'graphql';

const getSubCategory = {
    type: SubCategoryCommonType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        try {
            if (request.user && request.user.admin) {
                let result = await SubCategory.findOne({
                    where: {
                        id
                    }
                })
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
}

export default getSubCategory;