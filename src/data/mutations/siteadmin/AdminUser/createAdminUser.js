// GrpahQL
import {
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLNonNull as NonNull
} from 'graphql';

// Sequelize models
import { AdminUser, AdminRoles } from '../../../models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';

const createAdminUser = {

	type: AdminUserType,

	args: {
		id: { type: StringType },
		email: { type: new NonNull(StringType) },
		password: { type: StringType },
		roleId: { type: new NonNull(IntType) }
	},

	async resolve({ request, response }, {
		id,
		email,
		password,
		roleId
	}) {

		try {

			if (request.user && request.user.admin) {
				let isAlreadyExist = await AdminUser.findOne({
					attributes: ['id', 'email'],
					where: {
						email
					},
					raw: true
				});

				let isValidRoleId = await AdminRoles.findOne({
					attributes: ['id'],
					where: {
						id: roleId
					}
				});

				if (!isValidRoleId) {
					return await {
						status: 400,
						errorMessage: 'Oops, it looks like the chosen role is not valid. Please try with different valid role.'
					};
				}

				if (id != null || id != undefined) { // Update           
					if (isAlreadyExist && isAlreadyExist.id != id) {
						return await {
							status: 400,
							errorMessage: 'Oops! this email address is already exist.'
						};
					} else {
						const updateUser = await AdminUser.update({
							email,
							roleId
						}, {
							where: {
								id
							}
						});

						if (password && password.toString().trim() != '') {
							const updatePassword = await AdminUser.update({
								password: AdminUser.prototype.generateHash(password)
							}, {
								where: {
									id
								}
							});
						}

						return await {
							status: updateUser ? 200 : 400,
							errorMessage: updateUser ? null : 'Oops! something went wrong. Please try again.'
						};

					}
				} else { // Create
					if (isAlreadyExist != null) {
						return await {
							status: 400,
							errorMessage: 'Oops! this email address is already exist.'
						};
					} else {

						const createUser = await AdminUser.create({
							email,
							password: AdminUser.prototype.generateHash(password),
							isSuperAdmin: false,
							roleId
						});

						return await {
							status: createUser ? 200 : 400,
							errorMessage: createUser ? null : 'Oops! something went wrong. Please try again.'
						};

					}
				}
			} else {
				return {
					status: 500,
					errorMessage: 'Oops! Please login and continue.'
				};
			}
		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}
	}
}

export default createAdminUser;

/*

mutation ($id: String, $email: String!, $password: String, $roleId: Int!) {
	createAdminUser (id: $id, email: $email, password: $password, roleId: $roleId) {
		status
		errorMessage
	}
}

*/