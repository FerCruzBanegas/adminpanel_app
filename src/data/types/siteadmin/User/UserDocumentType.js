import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLID as ID
} from 'graphql';

const UserDocumentType = new ObjectType({
    name: 'UserDocumentType',
    fields: {
        id: { type: ID },
        userId: { type: StringType },
        imageName: { type: StringType },
        type: { type: StringType }
    },
});

export default UserDocumentType;
