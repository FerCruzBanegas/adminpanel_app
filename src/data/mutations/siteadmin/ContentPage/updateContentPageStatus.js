
import {
    GraphQLBoolean as BooleanType,
    GraphQLInt as IntType,
} from 'graphql';

import { ContentPageDetails } from '../../../models';

import { ContentPageDetailsCommonType } from '../../../types/siteadmin/ContentPageDetailsType';


const updateContentPageStatus = {

    type: ContentPageDetailsCommonType,

    args: {
        id: { type: IntType },
        isEnable: { type: BooleanType },
    },

    async resolve({ request }, { id, isEnable }) {
        try {
            if (!request.user || !request.user.admin) {
                return {
                    status: 500,
                    errorMessage: "Oops! Please login with your account and try again."
                };
            }

            let updateContent = await ContentPageDetails.update(
                { isEnable: !isEnable },
                { where: { id } }
            );

            if (!updateContent || updateContent.includes(0)) {
                return {
                    status: 400,
                    errorMessage: 'Something went wrong!'
                };
            }

            return { status: 200 };
        }
        catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong! ' + error
            };
        }
    },
};
export default updateContentPageStatus;
