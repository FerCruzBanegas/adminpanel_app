import {
	GraphQLString as StringType,
	GraphQLNonNull as NonNull,
} from 'graphql';
import { Location } from '../../../models';
import LocationType from '../../../types/siteadmin/LocationType';

const addLocation = {
	type: LocationType,

	args: {
		LocationName: { type: new NonNull(StringType) },
		coordinates: { type: new NonNull(StringType) },
		description: { type: new NonNull(StringType) },
	},

	async resolve({ request }, { LocationName, coordinates, description }) {
		try {

			let formattedCoordinates, geometryCoordinates;

			if (request.user && request.user.admin) {
				formattedCoordinates = coordinates.replace(/[{}/[\]\\]/g, '');
				formattedCoordinates = formattedCoordinates.replace('"lat":', '[');
				formattedCoordinates = formattedCoordinates.replace(/,"lat":/gi, '], [');
				formattedCoordinates = formattedCoordinates.replace(/,"lng":/gi, ', ');
				formattedCoordinates = '[' + formattedCoordinates + ']]';
				formattedCoordinates = JSON.parse(formattedCoordinates);
				formattedCoordinates.push(formattedCoordinates[0]); // First item should be added again to the last item(So MySQL polygon draw completes)

				if (formattedCoordinates.length < 4) {
					return {
						status: 400,
						errorMessage: 'Geo location is now drawn completely. Try zooming the map and draw closed location boundary.'
					}
				}

				geometryCoordinates = {
					type: 'Polygon',
					coordinates: [formattedCoordinates]
				};

				const addLocation = await Location.create({
					locationName: LocationName,
					coordinates,
					geometryCoordinates,
					description
				});

				return {
					status: addLocation ? 200 : 400,
					errorMessage: addLocation ? null : 'Oops! Something went wrong.',
				}

			} else {
				return {
					status: 500,
					errorMessage: 'Please login with your account and continue.'
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

export default addLocation;