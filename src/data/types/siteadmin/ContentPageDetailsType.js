import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

import getCommonType from '../../../helpers/getCommonType';

const ContentPageDetailsType = new ObjectType({
    name: 'ContentPageDetailsType',
    fields: {
        id: {
            type: IntType
        },
        pageTitle: {
            type: StringType
        },
        metaTitle: {
            type: StringType
        },
        metaDescription: {
            type: StringType
        },
        pageUrl: {
            type: StringType
        },
        content: {
            type: StringType
        },
        isEnable: {
            type: BooleanType
        },
        createdAt: {
            type: StringType
        },
        pageBanner: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});

export const ContentPageDetailsCommonType = getCommonType('ContentPageDetailsCommonType', ContentPageDetailsType);

export default ContentPageDetailsType