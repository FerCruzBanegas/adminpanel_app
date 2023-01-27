import SubCategoryCommonType from '../../../types/siteadmin/SubCategory/SubCategoryCommonType';
import { SubCategory } from '../../../models/index';

const getActiveSubCategories = {

    type: SubCategoryCommonType,

    async resolve({ request }) {

        try {

            const results = await SubCategory.findAll({
                where: {
                    status: 'active'
                }
            });
            return {
                results: results && results.length > 0 ? results : [],
                status: results && results.length > 0 ? 200 : 400,
                errorMessage: results && results.length > 0 ? null : "No record found."
            }

        } catch (error) {
            return {
                errorMessage: 'Something went wrong ' + error,
                status: 400
            };
        }

    }
};

export default getActiveSubCategories;