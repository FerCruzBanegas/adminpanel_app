import {
    GraphQLString as StringType
} from 'graphql';

import { ContentPageDetails } from '../../models';
import { ContentPageDetailsCommonType } from '../../types/siteadmin/ContentPageDetailsType';

const getContentPage = {
    type: ContentPageDetailsCommonType,

    args: { pageUrl: { type: StringType } },

    async resolve({ request }, { pageUrl }) {
        try {
            const result = await ContentPageDetails.findOne({
                where: {
                    pageUrl,
                    isEnable: true
                }
            });

            return {
                status: 200,
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

export default getContentPage;

/**
query getContentPage ($pageUrl: String) {
        getContentPage (pageUrl: $pageUrl) {
            status
            errorMessage
            result{
            id
            metaTitle
            metaDescription
            pageUrl
            pageTitle
            content
            isEnable
            pageBanner
            }
        }
    }
 */