import { Category, Pricing, SubCategory } from '../../../models';
import CategoryType from '../../../types/siteadmin/Category/CategoryType';
import {
    GraphQLInt as IntType,
} from 'graphql';

const deleteCategory = {
    type: CategoryType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        try {

            if (request.user && request.user.admin) {
                const isCategoryUsed = await SubCategory.findOne({
                    attributes: ['id'],
                    where: {
                        categoryId: id
                    }
                });

                if (isCategoryUsed) {
                    return await {
                        status: 400,
                        errorMessage: "Unable to delete this Category  because it is being used by its Sub Categories. Please remove the Sub Category and then try again."
                    }
                }
                const deleteCategory = await Category.destroy({
                    where: {
                        id
                    }
                })

                return await {
                    status: deleteCategory ? 200 : 400,
                    errorMessage: deleteCategory ? null : "Something went wrong! Please try again."
                }

            } else {
                return {
                    status: 500
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

export default deleteCategory;