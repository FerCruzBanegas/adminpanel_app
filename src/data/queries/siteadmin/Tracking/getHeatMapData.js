import {
	GraphQLString as StringType,
	GraphQLNonNull as NonNull,
	GraphQLInt as IntType,
} from 'graphql';
import sequelize from '../../../../data/sequelize';

import { UserProfile, User, Booking } from '../../../models';

import MapViewDataCommonType from '../../../types/siteadmin/Tracking/MapViewDataCommonType';

const getHeatMapData = {

	type: MapViewDataCommonType,

	args: {
		id: { type: new NonNull(StringType) },
		period: { type: new NonNull(StringType) },
		limit: { type: IntType },
	},

	async resolve({ request }, { id, period, limit }) {
		try {

			if (request.user && request.user.admin) {

				let periodData = {
					lt: new Date(),
					gt: new Date(new Date() - 24 * 60 * 60 * 1000)
				};

				if (period === '7days') {
					periodData = {
						lt: new Date(),
						gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
					};
				} else if (period === '30days') {
					periodData = {
						lt: new Date(),
						gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
					};
				} else if (period === 'alldays') {
					periodData = {
						lt: new Date()
					};
				}

				if (id === "partners") {

					let queryData = {
						where: {
							userType: 2,
							deletedAt: null,
							isActive: 1,
							activeStatus: 'inactive',
							and: [
								{ lat: { ne: null } },
								{ lat: { ne: 0 } },
								{ lng: { ne: null } },
								{ lng: { ne: 0 } },
							],
						},
						order: sequelize.literal('rand()'),
						include: [
							{
								model: UserProfile,
								as: 'profile',
								required: true
							}
						]
					};

					if (limit > 0) {
						queryData.limit = limit;
					}

					const results = await User.findAll(queryData);

					return await {
						status: 200,
						results,
					};

				} else {

					let queryData = {
						where: {
							status: { notIn: ['cancelledByUser', 'cancelledByPartner'] },
							userLocationLat: {
								ne: null
							},
							userLocationLng: {
								ne: null
							},
							createdAt: periodData
						},
						order: sequelize.literal('rand()'),
					};

					if (limit > 0) {
						queryData.limit = limit;
					}

					const bookingResults = await Booking.findAll(queryData);

					return await {
						status: 200,
						bookingResults,
					};

				}

			} else {
				return {
					status: 500,
					errorMessage: 'Oops! Something went wrong. Please login and continue.'
				};
			}
		} catch (error) {
			return {
				status: 400,
				errorMessage: 'Oops! Something went wrong.' + error.message
			}
		}
	},
};

export default getHeatMapData;