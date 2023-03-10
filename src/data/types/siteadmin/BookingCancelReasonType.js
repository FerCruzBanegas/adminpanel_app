import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType
} from 'graphql';


const BookingCancelReasonType = new ObjectType({
  name: 'BookingCancelReason',
  fields: {
    id: {
      type: StringType
    },

    bookingId: {
      type: IntType
    },

    userId: {
      type: StringType
    },

    partnerId: {
      type: StringType
    },

    reason: {
      type: StringType
    },

    status: {
      type: StringType
    },

    errorMessage: {
      type: StringType
    },
  }
});

export default BookingCancelReasonType;
