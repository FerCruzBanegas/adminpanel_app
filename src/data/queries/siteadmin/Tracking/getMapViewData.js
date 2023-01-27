import {
	GraphQLString as StringType,
	GraphQLNonNull as NonNull,
	GraphQLInt as IntType,
} from 'graphql';
import sequelize from '../../../../data/sequelize';

import { UserProfile, User } from '../../../../data/models';

import MapViewDataCommonType from '../../../types/siteadmin/Tracking/MapViewDataCommonType';

const getMapViewData = {

	type: MapViewDataCommonType,

	args: {
		id: { type: new NonNull(StringType) },
		period: { type: new NonNull(StringType) },
		limit: { type: IntType },
	},

	async resolve({ request }, { id, period, limit }) {
		try {
			if (request.user && request.user.admin) {
				let where, periodData;

				periodData = {
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

				let userFilter = {
					userType: 1,
					deletedAt: null,
					createdAt: periodData
				};

				let partnerFilter = {
					userType: 2,
					deletedAt: null,
					and: [
						{ lat: { ne: null } },
						{ lat: { ne: 0 } },
						{ lng: { ne: null } },
						{ lng: { ne: 0 } },
					],
				};


				if (id === 'all') {
					where = {
						or: [
							userFilter,
							{
								and: [
									partnerFilter,
									{
										isActive: 1,
										activeStatus: 'active',
										userStatus: 'active',
									},
								],
							},
							{
								and: [
									partnerFilter,
									{
										isActive: 1,
										activeStatus: 'inactive',
										userStatus: 'active',
									},
								],
							},
							{
								and: [
									partnerFilter,
									{
										userStatus: { in: ['pending', 'inactive'] },
										createdAt: periodData
									}
								],
							}
						],
					}
				} else if (id === 'users') {
					where = userFilter;
				} else if (id === 'availablePartners') {
					where = {
						and: [
							partnerFilter,
							{
								isActive: 1,
								activeStatus: 'inactive',
								userStatus: 'active'
							}
						]
					}
				} else if (id === 'unAvailablePartners') {
					where = {
						and: [
							partnerFilter,
							{
								isActive: 1,
								activeStatus: 'active',
								userStatus: 'active'
							}
						]
					}
				} else if (id === 'unActivatedPartners') {
					where = {
						and: [
							partnerFilter,
							{
								userStatus: { in: ['pending', 'inactive'] },
								createdAt: periodData
							}
						]
					}
				}

				let queryData = {
					where,
					order: sequelize.literal('rand()'),
					include: [
						{
							model: UserProfile,
							where: {
								and: [
									{ lat: { ne: null } },
									{ lat: { ne: 0 } },
									{ lng: { ne: null } },
									{ lng: { ne: 0 } },
								],
							},
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

export default getMapViewData;