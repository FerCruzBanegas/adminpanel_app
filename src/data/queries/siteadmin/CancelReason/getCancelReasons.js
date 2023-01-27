import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';
import sequelize from '../../../sequelize';
import { BookingCancelReason } from '../../../models';
import CancelReasonWholeType from '../../../types/siteadmin/CancelReasonWholeType';

const getCancelReasons = {
    type: CancelReasonWholeType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {

        if (request.user && request.user.admin) {
            let limit = 10;
            let offset = 0;
            let results, count, keywordFilter;
            if (currentPage) {
                offset = (currentPage - 1) * limit
                keywordFilter = [
                    {
                        bookingId: {
                            or: [
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE pickUpLocation like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE dropOffLocation like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE id like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE tripStart like '%${searchList}%'`)] },
                            ]
                        }
                    },
                    { userId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
                    { partnerId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
                    { reason: { in: [sequelize.literal(`SELECT reason FROM BookingCancelReason WHERE reason like '%${searchList}%'`)] } },
                    { cancelStatus: { in: [sequelize.literal(`SELECT cancelStatus FROM BookingCancelReason WHERE cancelStatus like '%${searchList}%'`)] } }
                ];

                if (searchList && searchList != '') {

                    results = await BookingCancelReason.findAll({
                        limit,
                        offset,
                        where: {
                            or: keywordFilter
                        },
                        order: [['id', 'DESC']],
                    });
                    count = await BookingCancelReason.count({
                        where: {
                            or: keywordFilter
                        }
                    });

                } else {
                    results = await BookingCancelReason.findAll({
                        limit,
                        offset,
                        order: [['id', 'DESC']],
                    });
                    count = await BookingCancelReason.count({});
                }

                return {
                    results,
                    count
                }
            }

        }

    }
}

export default getCancelReasons;

//GraphQL

// query{
//     getCancelledBookings{
//      riderLocation
//       pickUpLocation
//       dropOffLocation
//       status
//       baseFare
//     }
// }
