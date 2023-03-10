import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { Booking } from '../../../models';
import BookingType from '../../../types/siteadmin/BookingType';

const viewBookingDetails = {

    type: BookingType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { id }) {
        if (request.user && request.user.admin) {
            return await Booking.findOne({
                where: {
                    id
                }
            })

        }
    }
}

export default viewBookingDetails;