
import { HomePageCategory } from '../../models';
import { HomePageCategoryCommonType } from '../../types/siteadmin/HomePageCategoryType';

import {
    GraphQLString as StringType,
    GraphQLList as List,
    GraphQLNonNull as NonNull,
    GraphQLInputObjectType as InputObjectType,
} from 'graphql';

const updateHomePageCategory = {

    type: HomePageCategoryCommonType,

    args: {
        homePageCategoryList: {
            type: new NonNull(
                new List(
                    new InputObjectType({
                        name: 'categoryListInputType',
                        fields: {
                            title: { type: new NonNull(StringType) },
                            description: { type: new NonNull(StringType) },
                            logo: { type: new NonNull(StringType) },
                            banner: { type: new NonNull(StringType) },
                        }
                    })
                )
            )
        },
    },

    async resolve(
        { request },
        {
            homePageCategoryList
        }) {
        try {
            if (!request.user || !request.user.admin) {
                return {
                    status: 500,
                    errorMessage: "Oops! Please login with your account and try again."
                };
            }

            if (homePageCategoryList && homePageCategoryList.length === 0) {
                return {
                    status: 400,
                    errorMessage: 'No category found'
                }

            }

            await HomePageCategory.truncate({});

            await HomePageCategory.bulkCreate(homePageCategoryList);

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

export default updateHomePageCategory;
/*
mutation updateHomePageCategory (
  $title: String
  $description: String
  $logo: String
  $banner: String
) {
  updateHomePageAbout (
    title: $title
    description: $description
    logo: $logo
    banner: $banner
  ) {
    status
    errorMessage
  }
}
*/