import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType
} from 'graphql';

const TransactionHistoryType = new ObjectType({
    name: 'TransactionHistoryType',
    fields: {
        id: {
            type: IntType
        },
        bookingId:{
            type: IntType
        },
        userId: {
            type: StringType
        },
        partnerId: {
            type: StringType
        },
        amount: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        transactionId: {
            type: FloatType
        },
        status: {
            type: IntType
        }
    }
});

export default TransactionHistoryType;