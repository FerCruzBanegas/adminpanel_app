import {
	CREATE_ADMIN_USER_START,
	CREATE_ADMIN_USER_SUCCESS,
	CREATE_ADMIN_USER_ERROR,
	DELETE_ADMIN_USER_START,
	DELETE_ADMIN_USER_SUCCESS,
	DELETE_ADMIN_USER_ERROR,
	GET_ADMIN_USER_START,
	GET_ADMIN_USER_SUCCESS,
	GET_ADMIN_USER_ERROR
} from '../../../constants';

import { setRuntimeVariable } from '../../runtime';
import { closeAdminUserModal } from '../modalActions';

import createAdminUserMutation from './createAdminUserQuery.graphql';
import deleteAdminUserMutation from './deleteAdminUserQuery.graphql';
import getAdminUserQuery from './getAdminUserQuery.graphql';
import query from '../../../routes/site-admin/adminUser/adminUserQuery.graphql';
import getPrivilegesQuery from '../AdminRoles/getPrivileges.graphql';

import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function createAdminUser(
	id,
	email,
	password,
	roleId
) {
	return async (dispatch, getState, { client }) => {
		await dispatch({
			type: CREATE_ADMIN_USER_START,
			payload: {
				createAdminUserLoading: true
			}
		});

		try {
			const { data } = await client.mutate({
				mutation: createAdminUserMutation,
				variables: {
					id,
					email,
					password,
					roleId
				},
				refetchQueries: [{ query }]
			});

			if (data && data.createAdminUser && data.createAdminUser.status === 200) {
				await dispatch({
					type: CREATE_ADMIN_USER_SUCCESS,
					payload: {
						createAdminUserLoading: false
					}
				});
				dispatch(closeAdminUserModal());
				showToaster({ messageId: 'adminUserSuccess', requestContent: { id }, toasterType: 'success' });
			} else {
				showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.createAdminUser && data.createAdminUser.errorMessage }, toasterType: 'error' });
				await dispatch({
					type: CREATE_ADMIN_USER_ERROR,
					payload: {
						createAdminUserLoading: false,
						error: data && data.createAdminUser && data.createAdminUser.errorMessage
					}
				});
			}
		} catch (error) {
			showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
			await dispatch({
				type: CREATE_ADMIN_USER_ERROR,
				payload: {
					createAdminUserLoading: false,
					error
				}
			});
		}
	}
}

export function deleteAdminUser(id) {
	return async (dispatch, getState, { client }) => {
		await dispatch({
			type: DELETE_ADMIN_USER_START,
			payload: {
				deleteAdminUserLoading: true
			}
		});

		try {
			const { data } = await client.mutate({
				mutation: deleteAdminUserMutation,
				variables: {
					id
				},
				refetchQueries: [{ query }]
			});

			if (data && data.deleteAdminUser && data.deleteAdminUser.status === 200) {
				await dispatch({
					type: DELETE_ADMIN_USER_SUCCESS,
					payload: {
						deleteAdminUserLoading: false
					}
				});
				dispatch(closeAdminUserModal());
				showToaster({ messageId: 'adminUserDeleteSuccess', toasterType: 'success' });
			} else {
				showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.deleteAdminUser && data.deleteAdminUser.errorMessage }, toasterType: 'error' });
				await dispatch({
					type: DELETE_ADMIN_USER_ERROR,
					payload: {
						deleteAdminUserLoading: false,
						error: data && data.deleteAdminUser && data.deleteAdminUser.errorMessage
					}
				});
			}
		} catch (error) {
			showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });

			await dispatch({
				type: DELETE_ADMIN_USER_ERROR,
				payload: {
					deleteAdminUserLoading: false,
					error
				}
			});
		}
	}
}

export function getAdminUser() {
	return async (dispatch, getState, { client }) => {
		let privileges;

		const privilegesData = await client.query({
			query: getPrivilegesQuery
		});

		let privilegesResult = privilegesData.data.getPrivileges && privilegesData.data.getPrivileges.results;

		let defaultPrivileges = privilegesResult && privilegesResult.length > 0 && privilegesResult.map((item) => item.id);

		try {
			await dispatch({
				type: GET_ADMIN_USER_START,
				payload: {
					getAdminUserLoading: true
				}
			});

			const { data } = await client.query({
				query: getAdminUserQuery,
				fetchPolicy: 'network-only'
			});

			if (data && data.getAdminUser && data.getAdminUser.result && data.getAdminUser.result.id) {
				dispatch(setRuntimeVariable({
					name: 'isSuperAdmin',
					value: data.getAdminUser.result.isSuperAdmin
				}));

				if (data.getAdminUser.result.isSuperAdmin) {
					privileges = defaultPrivileges;
				} else {
					privileges = data.getAdminUser.result.adminRole && data.getAdminUser.result.adminRole.privileges || []
				}

				await dispatch({
					type: GET_ADMIN_USER_SUCCESS,
					payload: {
						getAdminUserLoading: false,
						id: data.getAdminUser.result.id,
						email: data.getAdminUser.result.email,
						isSuperAdmin: data.getAdminUser.result.isSuperAdmin,
						roleId: data.getAdminUser.result.roleId,
						privileges
					}
				});

				return account;
			} else {
				await dispatch({
					type: GET_ADMIN_USER_ERROR,
					payload: {
						getAdminUserLoading: false,
						error: data && data.getAdminUser && data.getAdminUser.errorMessage
					}
				});
				return false;
			}
		} catch (error) {
			await dispatch({
				type: GET_ADMIN_USER_ERROR,
				payload: {
					getAdminUserLoading: false,
					error
				}
			});
			return false;
		}
	}
}