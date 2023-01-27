import { ContentPageDetails } from '../../models';

import { ContentPageDetailsCommonType } from '../../types/siteadmin/ContentPageDetailsType';

const getContentPageDetails = {

    type: ContentPageDetailsCommonType,

    async resolve({ requset }) {
        try {
            const results = await ContentPageDetails.findAll({
                order: [['createdAt', 'DESC']],
            });
            return {
                status: 200,
                results
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

export default getContentPageDetails;

/**
 query getContentPageDetails {
        getContentPageDetails {
            status
            errorMessage
            results{
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