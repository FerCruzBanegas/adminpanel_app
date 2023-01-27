import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
import { StaticPage, TempImages } from '../../models';
import StaticPageType from '../../types/siteadmin/StaticPageType';

const updateStaticPage = {

    type: StaticPageType,

    args: {
        id: { type: IntType },
        content: { type: StringType },
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
        pageBanner: { type: StringType }
    },

    async resolve({ request }, {
        id,
        content,
        metaTitle,
        metaDescription,
        pageBanner
    }) {
        try {
            if (request.user && request.user.admin == true) {

                await TempImages.update({
                    fileName: null
                }, {
                    where: {
                        tableName: 'StaticPage',
                        fieldName: 'staticPage'
                    }
                });

                const updateStaticPage = await StaticPage.update({
                    content,
                    metaTitle,
                    metaDescription,
                    pageBanner
                }, {
                    where: {
                        id: id
                    }
                });

                return {
                    status: updateStaticPage ? 200 : 400,
                    errorMessage: updateStaticPage ? null : 'SSomething went wrong. Please try again'
                }

            } else {
                return {
                    status: 400
                }
            }
        } catch (err) {
            return {
                status: 400,
                errorMessage: "Something went wrong. Please try again"
            };
        }
    },
};

export default updateStaticPage;
