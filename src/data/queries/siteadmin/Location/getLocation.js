import {
    GraphQLInt as IntType
} from 'graphql';
import { Location } from '../../../models';
import LocationListType from '../../../types/siteadmin/LocationListType';

const getLocation = {
    type: LocationListType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        try {

            if (request.user && request.user.admin) {
                let result = await Location.findOne({
                    where: {
                        id
                    }
                });
                return {
                    status: 200,
                    result
                }
            } else {
                return {
                    status: 500,
                    errorMessage: 'Please login'
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

export default getLocation;