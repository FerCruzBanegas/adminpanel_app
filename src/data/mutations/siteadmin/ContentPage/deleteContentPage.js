import {
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType,
} from 'graphql';

import { ContentPageDetails } from '../../../models';

import { ContentPageDetailsCommonType } from '../../../types/siteadmin/ContentPageDetailsType';

const deleteContentPage = {

    type: ContentPageDetailsCommonType,

    args: { id: { type: new NonNull(IntType) } },

    async resolve({ request, response }, { id }) {
        try {
            if (!request.user || !request.user.admin) {
                return {
                    status: 500,
                    errorMessage: "Oops! Please login with your account and try again."
                };
            }

            const contentPage = await ContentPageDetails.findOne({
                where: {
                    id
                }
            });

            if (!contentPage) {
                return {
                    status: 400,
                    errorMessage: "Oops! Invalid request"
                };
            }

            await ContentPageDetails.destroy({ where: { id } });

            return { status: 200 };
        }
        catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong! ' + error
            };
        }
    }
}

export default deleteContentPage;

/**
 mutation deleteContentPage ($id: Int!) {
    deleteContentPage (id: $id) {
        status
        errorMessage
    }
}
 */