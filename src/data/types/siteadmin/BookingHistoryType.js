import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';


const BookingHistoryType = new ObjectType({
    name: 'BookingHistoryType',
    fields: {
        id: {
            type: IntType
        },
        bookingId: {
            type: IntType
        },
        status: {
            type: StringType
        },
        createdAt: {
            type: StringType
        }
    }
});

export default BookingHistoryType;