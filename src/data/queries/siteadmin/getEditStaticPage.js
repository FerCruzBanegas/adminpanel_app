import {
    GraphQLInt as IntType,
} from 'graphql';

import { StaticPage } from '../../models';
import StaticPageType from '../../types/siteadmin/StaticPageType';

const getEditStaticPage = {

    type: StaticPageType,

    args: {
        id: { type: IntType },
    },

    async resolve({ request }, { id }) {
        try {

            let result = await StaticPage.findOne({
                where: {
                    id
                }
            });

            return {
                status: result ? 200 : 400,
                result,
                errorMessage: result ? null : 'No record found'
            }

        } catch (error) {
            return {
                errorMessage: 'Something went wrong ' + error,
                status: 400
            };
        }
    }
};

export default getEditStaticPage;