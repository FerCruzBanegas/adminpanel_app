import { Location } from '../../../models';
import LocationListType from '../../../types/siteadmin/LocationListType';

const getAllLocation = {
	type: LocationListType,

	async resolve({ request }) {
		try {
			if (request.user && request.user.admin) {
				let results = await Location.findAll({
					order: [['id', 'DESC']],
				});

				let count = await Location.count();

				return {
          results: results && results.length > 0 ? results : [],
          count: results && results.length > 0 ? count : 0,
          errorMessage: results && results.length > 0 ? null : 'No records found'
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

export default getAllLocation;

// GraphQL

/*

query {
		getAllLocation {
				count
				LocationData {
						id
						locationName
				}
		}
}

*/
