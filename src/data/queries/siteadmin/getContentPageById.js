import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

import { ContentPageDetails } from '../../models';

import { ContentPageDetailsCommonType } from '../../types/siteadmin/ContentPageDetailsType';

const getContentPageById = {
    type: ContentPageDetailsCommonType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { id }) {
        try {
            const result = await ContentPageDetails.findOne({ where: { id } });
            return {
                status: !result ? 400 : 200,
                errorMessage: !result ? 'No result found' : null,
                result
            };
        }
        catch (error) {
            return {
                status: 400,
                errorMessage: "Something went wrong " + error
            };
        }
    }
}

export default getContentPageById;