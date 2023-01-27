import { User, Booking, Currencies } from '../../models/index'
import AdminDashboardType from '../../types/siteadmin/AdminDashboardType';

const getDashboardCount = {

    type: AdminDashboardType,

    async resolve({ request }) {

        const totalPartnersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 2
            }
        })

        const todayPartnersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 2,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            }
        })

        const weekPartnersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 2,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const monthPartnersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 2,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const totalUsersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 1
            }
        })

        const todayUsersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 1,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            }
        })

        const weekUsersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 1,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const monthUsersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 1,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const totalBookingsCount = await Booking.count({
            where: {
                and: [
                    { status: { ne: 'expired' } },
                    { status: { ne: 'declined' } }
                ]
            }
        })

        const todayBookingsCount = await Booking.count({
            where: {
                and: [
                    { status: { ne: 'expired' } },
                    { status: { ne: 'declined' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            }
        })

        const weekBookingsCount = await Booking.count({
            where: {
                and: [
                    { status: { ne: 'expired' } },
                    { status: { ne: 'declined' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const monthBookingsCount = await Booking.count({
            where: {
                and: [
                    { status: { ne: 'expired' } },
                    { status: { ne: 'declined' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                }
            }
        })


        const todayEarnings = await Booking.findAll({
            attributes: ['userServiceFee', 'partnerServiceFee'],
            where: {
                and: [
                    { status: { eq: 'completed' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            },
            raw: true
        })

        const weeklyEarnings = await Booking.findAll({
            attributes: ['userServiceFee', 'partnerServiceFee'],
            where: {
                and: [
                    { status: { eq: 'completed' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            },
            raw: true
        })

        const monthlyEarnings = await Booking.findAll({
            attributes: ['userServiceFee', 'partnerServiceFee'],
            where: {
                and: [
                    { status: { eq: 'completed' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                }
            },
            raw: true
        })

        const totalEarnings = await Booking.findAll({
            attributes: ['userServiceFee', 'partnerServiceFee'],
            where: {
                and: [
                    { status: { eq: 'completed' } }
                ]
            },
            raw: true
        })

        const currency = await Currencies.findOne({
            where: {
                isBaseCurrency: true
            }
        })

        const prevCurrency = await Currencies.findAll({
            order: [['updatedAt', 'DESC']]['isBaseCurrency', 'DESC'],
            raw: true
        });

        const prevCurrencySymbol = prevCurrency[0].symbol

        return {
            result: {
                totalPartnersCount,
                todayPartnersCount,
                weekPartnersCount,
                monthPartnersCount,
                totalUsersCount,
                todayUsersCount,
                weekUsersCount,
                monthUsersCount,
                totalBookingsCount,
                todayBookingsCount,
                weekBookingsCount,
                monthBookingsCount,
                todayEarnings,
                weeklyEarnings,
                monthlyEarnings,
                totalEarnings,
                currency: prevCurrencySymbol
            }

        }
    }
}

export default getDashboardCount;