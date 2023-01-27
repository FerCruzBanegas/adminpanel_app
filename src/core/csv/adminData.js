import {
    User,
    UserProfile,
    Booking
} from '../../data/models';
import sequelize from '../../data/sequelize';

export async function getUsers(keyword, userType) {
    let where = {
        userType: userType,
        deletedAt: null
    };

    let attributes = [
        [sequelize.col('profile.profileId'), 'ID'],
        [sequelize.col('profile.firstName'), 'FIRST NAME'],
        [sequelize.col('profile.lastName'), 'LAST NAME'],
        ['email', 'EMAIL ADDRESS'],
        [sequelize.col('profile.country'), 'COUNTRY'],
        ['phoneNumber', 'PHONE NUMBER'],
        ['createdAt', 'ACCOUNT CREATED ON'],
        ['userStatus', 'USER STATUS'],
        [
            sequelize.literal(`
                CASE WHEN isBan=true 
                    THEN 'Ban'
                ELSE 
                    'UnBan'
                END
            `),
            'BAN STATUS'
        ]
    ];

    if (userType === 1)
        attributes.push([sequelize.col('profile.walletBalance'), 'WALLET BALANCE'])

    if (keyword && keyword.length > 0 && keyword.toString().trim() != '') {
        where['and'] = [
            {
                id: {
                    or: [
                        { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE profileId like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE lastName like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE country like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT id FROM User WHERE phoneDialCode like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT id FROM User WHERE phoneNumber like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT id FROM User WHERE createdAt like '%${keyword}%'`)] }
                    ]
                }
            }
        ];
    }

    try {
        const data = await User.findAll({
            attributes,
            where,
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: []
            }],
            raw: true,
            order: [['createdAt', 'DESC']],
        });

        return await data;
    }
    catch (e) {
        console.error(e);
        return [];
    }
}

export async function getBookings(keyword, status, pageType) {

    let keywordFilter = {}, statusFilter = {};
    let attributes = [
        ['id', 'Booking ID'],
        [
            sequelize.literal(`(SELECT firstName FROM UserProfile WHERE UserProfile.userId=Booking.userId)`),
            'User Name'
        ],
        [
            sequelize.literal(`(SELECT email FROM User WHERE User.id=Booking.userId)`),
            'User Email'
        ],
        [
            sequelize.literal(`(SELECT firstName FROM UserProfile WHERE UserProfile.userId=Booking.partnerId)`),
            'Provider Name'
        ],
        [
            sequelize.literal(`(SELECT email FROM User WHERE User.id=Booking.partnerId)`),
            'Provider Email'
        ],
        [
            sequelize.literal(`(SELECT name  FROM Category WHERE Category.id=Booking.categoryId)`),
            'Category Name'
        ],
        ['status', 'Status'],
        ['currency', 'Currency'],
        ['totalFare', 'Total Fare'],
        ['travellingPrice', 'Visit Fee'],
        ['userServiceFee', 'User Service Fee'],
        ['partnerServiceFee', 'Provider Service Fee'],
        ['userTotalFare', 'User Total Fare'],
        ['partnerTotalFare', 'Partner Payout Amount']
    ];

    if (pageType === 'payout') {
        status = ['completed'];
        attributes.push([
            sequelize.literal(`
                CASE WHEN paymentType=1 
                    THEN 'Processed via cash'
                WHEN isPayoutPaid=true 
                    THEN 'Completed'
                ELSE 
                    'Pending'
                END
            `),
            'Payout Status'
        ]);
        attributes.push([
            sequelize.literal(`
                CASE WHEN paymentType=1 
                    THEN 
                        CASE WHEN isPayoutPaid=true 
                            THEN 'Paid'
                        ELSE 
                            'Unpaid'
                        END
                ELSE 
                    'Not Required'
                END
            `),
            'Action'
        ]);
    }

    if (status) {
        //Trip Status Filter
        statusFilter = { status: { or: status } }
    }

    if (keyword && keyword.length > 0 && keyword.toString().trim() != '') {
        //Keyword Filter
        keywordFilter = {
            or: [
                {
                    id: {
                        or: [
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE id like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE status like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE totalFare like '%${keyword}%'`)] },
                        ]
                    }
                },
                { userId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${keyword}%'`)] } },
                { partnerId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${keyword}%'`)] } },
            ]
        };
    }

    try {
        const bookingData = await Booking.findAll({
            attributes,
            where: {
                and: [
                    statusFilter,
                    keywordFilter,
                ]
            },
            raw: true,
            order: [['id', 'DESC']]
        });
        return await bookingData;
    }
    catch (e) {
        console.error(e)
        return [];
    }
}