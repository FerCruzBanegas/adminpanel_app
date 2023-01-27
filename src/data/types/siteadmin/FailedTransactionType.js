import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType
} from 'graphql';

import ProfileType from './User/ProfileType';
import { UserProfile } from '../../models';

const FailedTransactionType = new ObjectType({
    name: 'FailedTransactionType',
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
        reason: {
            type: StringType
        },
        partnerDetails: {
            type: ProfileType,
            async resolve(booking) {
                return await UserProfile.findOne({
                    where: { userId: booking.partnerId }
                })
            }
        },
    }
});

export default FailedTransactionType;