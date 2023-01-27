import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql';

const EarningsType = new ObjectType({
    name: 'Earnings',
    fields: {
        userServiceFee: { type: StringType },
        partnerServiceFee: { type: StringType }
    }
})

const AdminDashboard = new ObjectType({
    name: 'AdminDashboard',
    fields: {
        totalPartnersCount: { type: IntType },
        todayPartnersCount: { type: IntType },
        weekPartnersCount: { type: IntType },
        monthPartnersCount: { type: IntType },
        totalUsersCount: { type: IntType },
        todayUsersCount: { type: IntType },
        weekUsersCount: { type: IntType },
        monthUsersCount: { type: IntType },
        totalBookingsCount: { type: IntType },
        todayBookingsCount: { type: IntType },
        weekBookingsCount: { type: IntType },
        monthBookingsCount: { type: IntType },
        todayEarnings: { type: new List(EarningsType) },
        weeklyEarnings: { type: new List(EarningsType) },
        monthlyEarnings: { type: new List(EarningsType) },
        totalEarnings: { type: new List(EarningsType) },
        currency: { type: StringType }
    }
})

const AdminDashboardType = new ObjectType({
    name: 'AdminDashboardType',
    fields: {
        result: {
            type: AdminDashboard
        },
        count: {
            type: IntType
        },
        errorMessage: { type: StringType },
        status: { type: IntType },
    }
});

export default AdminDashboardType;