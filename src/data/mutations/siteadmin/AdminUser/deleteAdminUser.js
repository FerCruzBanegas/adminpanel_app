// GrpahQL
import {
	GraphQLString as StringType,
	GraphQLNonNull as NonNull
} from 'graphql';

// Sequelize models
import { AdminUser } from '../../../models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';

const deleteAdminUser = {

	type: AdminUserType,

	args: {
		id: { type: new NonNull(StringType) }
	},

	async resolve({ request, response }, { id }) {

		try {

			if (request.user && request.user.admin) {
				const deleteUser = await AdminUser.destroy({ where: { id } });

				return await {
					status: deleteUser ? 200 : 400,
					errorMessage: deleteUser ? null : 'Oops! something went wrong. Please try again.'
				};
			} else {
				return {
					status: 500,
					errorMessage: 'Oops! Please login and continue.'
				};
			}

		} catch (error) {
			return {
				status: 400,
				errorMessage: 'Oops! something went wrong. ' + error
			}
		}
	}
}

export default deleteAdminUser;

/*

mutation ($id: String!) {
	deleteAdminUser (id: $id) {
		status
		errorMessage
	}
}
 
 

*/