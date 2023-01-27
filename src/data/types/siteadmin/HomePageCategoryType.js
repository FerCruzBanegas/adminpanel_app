import {
    GraphQLObjectType as ObjectType, 
    GraphQLString as StringType
} from 'graphql'

import getCommonType from '../../../helpers/getCommonType';

const HomePageCategoryType = new ObjectType({
    name: 'HomePageCategoryType',
    fields: {
        title: {
            type: StringType
        },
        description: {
            type: StringType
        },
        logo: {
            type: StringType
        },
        banner: {
            type: StringType
        },
    }
});

export const HomePageCategoryCommonType = getCommonType('HomePageCategoryCommonType', HomePageCategoryType);

export default HomePageCategoryType;