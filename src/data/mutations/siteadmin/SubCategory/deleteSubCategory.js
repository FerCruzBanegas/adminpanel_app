import { SubCategory, Pricing } from '../../../models';
import SubCategoryCommonType from '../../../types/siteadmin/SubCategory/SubCategoryCommonType';
import {
    GraphQLInt as IntType,
} from 'graphql';

const deleteSubCategory = {
    type: SubCategoryCommonType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        try {

            if (request.user && request.user.admin) {
                const isFareUsed = await Pricing.findOne({
                    attributes: ['id'],
                    where: {
                        isActive: true,
                        subCategoryId: id
                    }
                });

                if (isFareUsed) {
                    return await {
                        status: 400,
                        errorMessage: "Sorry, unable to delete. The chosen category is used on the manage fare. Please remove the fare and try again."
                    }
                }

                const deleteSubCategory = await SubCategory.destroy({
                    where: {
                        id
                    }
                })

                return await {
                    status: deleteSubCategory ? 200 : 400,
                    errorMessage: deleteSubCategory ? null : "Something went wrong! Please try again."
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

export default deleteSubCategory;