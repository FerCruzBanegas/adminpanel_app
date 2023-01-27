import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

import { TempImages, ContentPageDetails } from '../../../models';

import { ContentPageDetailsCommonType } from '../../../types/siteadmin/ContentPageDetailsType';

import routes from '../../../../routes/index';

const updateContentPageDetails = {

    type: ContentPageDetailsCommonType,

    args: {
        id: { type: IntType },
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
        pageUrl: { type: StringType },
        pageTitle: { type: StringType },
        content: { type: StringType },
        pageBanner: { type: StringType }
    },

    async resolve({ request }, {
        id,
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

            const isURLUsed = await ContentPageDetails.findOne({
                where: {
                    pageUrl,
                    id: { ne: id }
                }
            });

            const isURLExists = routes.children.find(item => item && item.path && item.path.slice(1) === pageUrl);

            if (isURLUsed || isURLExists) {
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

            const updateContent = await ContentPageDetails.update(
                {
                    metaTitle,
                    metaDescription,
                    pageUrl,
                    pageTitle,
                    content,
                    pageBanner
                },
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
    }
};
export default updateContentPageDetails;

/**
 mutation updateContentPageDetails(
  $id: Int,
  $metaTitle: String,
  $metaDescription: String,
  $pageUrl: String,
  $pageTitle: String,
  $content: String,
  $pageBanner: String
) {
  updateContentPageDetails(
    id: $id,
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