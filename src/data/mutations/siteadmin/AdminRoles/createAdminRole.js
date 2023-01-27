// GrpahQL
import {
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLNonNull as NonNull,
	GraphQLList as List
} from 'graphql';

// Sequelize models
import { AdminRoles, AdminPrivileges } from '../../../models';
import { AdminRolesType } from '../../../types/siteadmin/AdminRolesType';

const createAdminRole = {

	type: AdminRolesType,

	args: {
		id: { type: IntType },
		name: { type: new NonNull(StringType) },
		description: { type: StringType },
		privileges: { type: new NonNull(new List(IntType)) }
	},

	async resolve({ request, response }, {
		id,
		name,
		description,
		privileges
	}) {

		try {
			if (!request.user || !request.user.admin) {
				return {
					status: 500,
					errorMessage: "Oops! Please login with your account and try again."
				};
			}

			let privilegesData = [];
			if (id) {
				let isExistAdminRole = await AdminRoles.findOne({
					where: {
						id
					},
					raw: true
				});

				if (!isExistAdminRole) {
					return await {
						status: 404,
						errorMessage: 'Sorry, unable to find this admin role.'
					};
				}

				const updateRole = await AdminRoles.update({
					name,
					description
				}, {
					where: {
						id
					}
				}
				);

				if (updateRole) {
					if (privileges && privileges.length > 0) {
						privilegesData = privileges.map((item) => {
							return {
								roleId: id,
								previlegeId: item
							};
						});
						await AdminPrivileges.destroy({ where: { roleId: id } });
						await AdminPrivileges.bulkCreate(privilegesData);
					}

					return await {
						status: 200
					};
				} else {
					return await {
						status: 400,
						errorMessage: 'Oops! something went wrong. Please try again.'
					};
				}

			} else { // Create
				const createRole = await AdminRoles.create({
					name,
					description
				});

				if (createRole) {
					let createdId = createRole.dataValues.id;

					if (privileges && privileges.length > 0) {
						privilegesData = privileges.map((item) => {
							return {
								roleId: createdId,
								previlegeId: item
							};
						});
						await AdminPrivileges.bulkCreate(privilegesData);
					}

					return await {
						status: 200
					};
				} else {
					return await {
						status: 400,
						errorMessage: 'Oops! something went wrong. Please try again.'
					};
				}
			}
		}
		catch (error) {
			return {
				status: 400,
				errorMessage: 'Oops! Something went wrong.' + error
			}
		}
	}
}

export default createAdminRole;

/*

mutation ($id: Int, $name: String!, $description: String, $privileges: [Int]!) {
	createAdminRole (id: $id, name: $name, description: $description, privileges: $privileges) {
		status
		errorMessage
	}
}
 
 

*/