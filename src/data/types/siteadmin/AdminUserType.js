import {
	GraphQLObjectType as ObjectType,
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLBoolean as BooleanType,
	GraphQLList as List
} from 'graphql';

import { AdminRoles } from '../../models';
import AdminRoleType from '../../types/siteadmin/AdminRolesType';

const AdminUser = new ObjectType({
	name: 'AdminUser',
	fields: {
		id: {
			type: StringType
		},
		email: {
			type: StringType
		},
		password: {
			type: StringType
		},
		isSuperAdmin: {
			type: BooleanType
		},
		roleId: {
			type: IntType
		},
		createdAt: {
			type: StringType
		},
		updatedAt: {
			type: StringType
		},
		adminRole: {
			type: AdminRoleType,
			async resolve(adminUser) {
				return await AdminRoles.findOne({
					where: {
						id: adminUser.roleId
					}
				});
			}
		},
	}
});

const AdminUserType = new ObjectType({
	name: 'AdminUserType',
	fields: {
		result: {
			type: AdminUser
		},
		results: {
			type: new List(AdminUser)
		},
		count: { type: StringType },
		status: { type: IntType },
		errorMessage: {
			type: StringType
		},
		userExistStatus: {
			type: BooleanType
		}
	},
});


export default AdminUserType;