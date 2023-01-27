import {
    GraphQLString as StringType,
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType,
    GraphQLList as List
} from 'graphql';

import { UserProfile, Category, BookingPromoCode, BookingCancelReason, BookingReviewImage, BookingHistory, OrderItems, ScheduleBooking, ScheduleBookingHistory } from '../../models';
import CategoryType from './Category/CategoryType';
import ProfileType from './User/ProfileType';
import BookingCancelReasonType from './BookingCancelReasonType';
import BookingPromoCodeType from './PromoCode/BookingPromoCodeType';
import ThreadsType from './Thread/ThreadsType';
import BookingReviewImageType from './BookingReviewImageType';
import BookingHistoryType from './BookingHistoryType';
import OrderItemsType from './OrderItemsType';
import ScheduleBookingType from './ScheduleBooking/ScheduleBookingType';
import ScheduleBookingHistoryType from './ScheduleBooking/ScheduleBookingHistoryType';

import { Threads } from '../../models';

import getCommonType from '../../../helpers/getCommonType';

const BookingType = new ObjectType({
    name: 'BookingType',
    fields: {
        id: { type: IntType },
        userLocation: { type: StringType },
        userLocationLat: { type: FloatType },
        userLocationLng: { type: FloatType },
        userId: { type: StringType },
        partnerId: { type: StringType },
        pricingType: { type: StringType },
        status: { type: StringType },
        errorMessage: { type: StringType },
        totalRideDistance: { type: FloatType },
        userServiceFee: { type: FloatType },
        partnerServiceFee: { type: FloatType },
        estimatedTotalFare: { type: FloatType },
        discountAmount: { type: FloatType },
        specialBookingFare: { type: FloatType },
        totalFare: { type: FloatType },
        totalRideDistance: { type: FloatType },
        paymentType: { type: FloatType },
        paymentStatus: { type: StringType },
        transactionId: { type: StringType },
        currency: { type: StringType },
        userTotalFare: { type: FloatType },
        userPayableFare: { type: FloatType },
        partnerTotalFare: { type: FloatType },
        additionalFee: { type: FloatType },
        additionalDescription: { type: StringType },
        createdAt: { type: StringType },
        updatedAt: { type: StringType },
        notes: { type: StringType },
        reviewDescription: { type: StringType },
        additonalDescription: { type: StringType },
        travellingPrice: { type: FloatType },
        tipsAmount: { type: FloatType },
        isPayoutPaid: { type: BooleanType },
        isBanStatus: { type: BooleanType },
        isTipGiven: { type: BooleanType },
        tipsPartnerTotalFare: { type: FloatType },
        tipsTotalFare: { type: FloatType },
        bookingType: { type: IntType },
        partnerDetails: {
            type: ProfileType,
            async resolve(booking) {
                return await UserProfile.findOne({
                    where: { userId: booking.partnerId }
                })
            }
        },
        userDetails: {
            type: ProfileType,
            async resolve(booking) {
                return await UserProfile.findOne({
                    where: { userId: booking.userId }
                })
            }
        },
        promoCode: {
            type: BookingPromoCodeType,
            async resolve(booking) {
                return await BookingPromoCode.findOne({
                    where: { bookingId: booking.id }
                })
            }
        },
        cancelReason: {
            type: BookingCancelReasonType,
            async resolve(booking) {
                return await BookingCancelReason.findOne({
                    where: { bookingId: booking.id }
                })
            }
        },
        categoryDetails: {
            type: CategoryType,
            async resolve(booking) {
                return await Category.findOne({
                    where: { id: booking.categoryId }
                })
            }
        },
        messageData: {
            type: ThreadsType,
            resolve(booking) {
                return Threads.findOne({
                    where: {
                        bookingId: booking.id,
                    }
                });
            }
        },
        reviewImage: {
            type: new List(BookingReviewImageType),
            async resolve(booking) {
                return await BookingReviewImage.findAll({
                    where: { orderId: booking.orderId },
                });
            },
        },
        bookingHistory: {
            type: new List(BookingHistoryType),
            async resolve(booking) {
                return await BookingHistory.findAll({
                    where: { bookingId: booking.id },
                });
            },
        },
        orderItemsList: {
            type: new List(OrderItemsType),
            async resolve(booking) {
                return await OrderItems.findAll({
                    where: { orderId: booking.orderId }
                });
            }
        },
        scheduleBooking: {
            type: ScheduleBookingType,
            async resolve(booking) {
                return await ScheduleBooking.findOne({
                    where: { bookingId: booking.id }
                })
            }
        },
        scheduleBookingHistory: {
            type: new List(ScheduleBookingHistoryType),
            async resolve(booking) {
                return await ScheduleBookingHistory.findAll({
                    where: { bookingId: booking.id },
                    order: [['createdAt', 'ASC']]
                })
            }
        },
    }
});

export const BookingCommonType = getCommonType('BookingCommonType', BookingType);

export default BookingType;