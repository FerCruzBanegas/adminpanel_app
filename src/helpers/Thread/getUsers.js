import { Booking, User } from '../../data/models';

export async function getUsers(id) {

    const bookingData = await Booking.findOne({
        attributes: ['partnerId', 'userId'],
        where: { id },
        raw: true
    });

    let userId = bookingData && bookingData.userId, partnerId = bookingData && bookingData.partnerId;

    return await {
        userId,
        partnerId,
    };
}

export async function getUserDetails(id) {
    return await User.findOne({
        attributes: ['id', 'email'],
        where: {
            id,
            deletedAt: null,
            isBan: false
        },
        raw: true
    });
}