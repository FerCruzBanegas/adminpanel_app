import {
	GraphQLInt as IntType
} from 'graphql';
import { Location, Pricing } from '../../../models';
import LocationType from '../../../types/siteadmin/LocationType';

const deleteLocation = {
	type: LocationType,

	args: {
		id: { type: IntType }
	},

	async resolve({ request }, { id }) {
		try {

			if (request.user && request.user.admin) {
				const isFareUsed = await Pricing.findOne({
					attributes: ['id'],
					where: {
						isActive: true,
						locationId: id
					}
				});

				if (isFareUsed) {
					return await {
						status: 400,
						errorMessage: "Sorry, unable to delete. The chosen location is used on the manage fare. Please remove the fare and try again."
					}
				}

				const deleteLocation = await Location.destroy({
					where: {
						id
					}
				});

				return {
					status: deleteLocation ? 200 : 400,
					errorMessage: deleteLocation ? null : 'Oops! Something went wrong.',
				}

			} else {
				return {
					status: 500,
				}
			}
		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}
	}
}

export default deleteLocation;

/*
mutation deleteLocation($id: Int) {
								deleteLocation(id: $id) {
									status
								}
							}
*/