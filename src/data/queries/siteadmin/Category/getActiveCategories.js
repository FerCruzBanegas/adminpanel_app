import CategoryCommonType from '../../../types/siteadmin/Category/CategoryCommonType';
import { Category } from '../../../models/index';

const getActiveCategories = {

    type: CategoryCommonType,

    async resolve({ request }) {

        try {

            const results = await Category.findAll({ where: { status: 'active' } });

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

export default getActiveCategories;