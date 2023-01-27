import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLList as List,
    GraphQLString as StringType
} from 'graphql';

import BookingType from './BookingType';

const BookingManagementWholeType = new ObjectType({
    name: 'BookingManagementWholeType',
    fields: {
        results: {
            type: new List(BookingType)
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

export default BookingManagementWholeType;