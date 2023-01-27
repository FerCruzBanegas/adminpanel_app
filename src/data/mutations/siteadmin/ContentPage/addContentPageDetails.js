import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

import { ContentPageDetails, TempImages } from '../../../models';

import { ContentPageDetailsCommonType } from '../../../types/siteadmin/ContentPageDetailsType';

const addContentPageDetails = {

    type: ContentPageDetailsCommonType,

    args: {
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
        pageUrl: { type: StringType },
        pageTitle: { type: StringType },
        content: { type: StringType },
        pageBanner: { type: StringType }
    },

    async resolve({ request }, {
        metaTitle,
        metaDescription,
        pageUrl,
        pageTitle,
        content,
        pageBanner
    }) {
        try {
            if (!request.user || !request.user.admin) {
                return {
                    status: 500,
                    errorMessage: "Oops! Please login with your account and try again."
                };
            }

            const isURLUsed = await ContentPageDetails.findOne({ where: { pageUrl } });

            if (isURLUsed) {
                return {
                    status: 400,
                    errorMessage: "The page URL already exist!"
                };
            }

            await TempImages.update(
                { fileName: null },
                {
                    where: {
                        tableName: 'ContentPage',
                        fieldName: 'pageBanner'
                    }
                }
            );

            const result = await ContentPageDetails.create({
                metaTitle,
                metaDescription,
                pageUrl,
                pageTitle,
                content,
                pageBanner: pageBanner
            });

            return {
                status: !result ? 400 : 200,
                errorMessage: !result ? 'Something went wrong!' : null
            };
        }
        catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong! ' + error
            };
        }
    }
};

export default addContentPageDetails;

/**
 mutation addContentPageDetails(
  $metaTitle: String,
  $metaDescription: String,
  $pageUrl: String,
  $pageTitle: String,
  $content: String,
  $pageBanner: String
) {
  addContentPageDetails(
    metaTitle: $metaTitle,
    metaDescription: $metaDescription,
    pageUrl: $pageUrl,
    pageTitle: $pageTitle,
    content: $content,
    pageBanner: $pageBanner
  ) {
      status
      errorMessage
  }
}
 */