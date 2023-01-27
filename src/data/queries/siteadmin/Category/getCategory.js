import {
    GraphQLInt as IntType
} from 'graphql';
import { Category } from '../../../models';
import CategoryCommonType from '../../../types/siteadmin/Category/CategoryCommonType';

const getCategory = {
    type: CategoryCommonType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        try {
            if (request.user && request.user.admin) {
                let result = await Category.findOne({
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

export default getCategory;