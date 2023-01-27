import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { Booking } from '../../../models';
import { BookingCommonType } from '../../../types/siteadmin/BookingType';

const updatePayout = {

    type: BookingCommonType,

    args: {
        id: { type: new NonNull(IntType) },
        isBanStatus: { type: new NonNull(BooleanType) },
    },

    async resolve({ request }, { id, isBanStatus }) {
        try {

            if (request.user && request.user.admin) {
                let update = await Booking.update({
                    isBanStatus
                },
                    {
                        where: {
                            id
                        }
                    }
                );

                return {
                    status: update ? 200 : 400,
                    errorMessage: update ? null : "Oops! Couldn't update status!"
                }

            } else {
                return {
                    status: 500,
                    errorMessage: 'Please login with your account and continue.'
                }
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: error
            }
        }
    }
}

export default updatePayout;