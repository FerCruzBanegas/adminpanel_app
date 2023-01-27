import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const StaticPage = new ObjectType({
    name: 'StaticPage',
    fields: {
        id: {
            type: IntType
        },
        pageName: {
            type: StringType
        },
        content: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        metaTitle: {
            type: StringType
        },
        metaDescription: {
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

const StaticPageType = new ObjectType({
    name: 'StaticPageType',
    fields: {
        result: {
            type: StaticPage
        },
        count: {
            type: IntType
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default StaticPageType;