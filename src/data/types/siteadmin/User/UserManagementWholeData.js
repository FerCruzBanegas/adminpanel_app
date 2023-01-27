import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLList as List,
    GraphQLString as StringType
} from 'graphql';

import UserType from './UserType';

const UserManagementWholeType = new ObjectType({
    name: 'UserManagementWholeType',
    fields: {
        results: {
            type: new List(UserType)
        },
        result: {
            type: UserType
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

export default UserManagementWholeType;