import {
	CREATE_ADMIN_ROLES_START,
	CREATE_ADMIN_ROLES_SUCCESS,
	CREATE_ADMIN_ROLES_ERROR,
	DELETE_ADMIN_ROLES_START,
	DELETE_ADMIN_ROLES_SUCCESS,
	DELETE_ADMIN_ROLES_ERROR,
	ADMIN_PRIVILEGES_START,
	ADMIN_PRIVILEGES_SUCCESS,
	ADMIN_PRIVILEGES_ERROR
} from '../../../constants';

import query from '../../../routes/site-admin/adminRoles/adminRolesQuery.graphql';
import { closeAdminRolesModal } from '../modalActions';
import createAdminRoleQuery from './createAdminRoleQuery.graphql';
import deleteAdminQuery from './deleteAdminQuery.graphql';
import getPrivilegesQuery from './getPrivileges.graphql';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function createAdminRole(
	id,
	name,
	description,
	privileges
) {
	return async (dispatch, getState, { client }) => {
		await dispatch({
			type: CREATE_ADMIN_ROLES_START,
			payload: {
				createAdminRoleLoading: true
			}
		});

		try {
			const { data } = await client.mutate({
				mutation: createAdminRoleQuery,
				variables: {
					id,
					name,
					description,
					privileges
				},
				refetchQueries: [{ query }]
			});

			if (data && data.createAdminRole && data.createAdminRole.status === 200) {
				await dispatch({
					type: CREATE_ADMIN_ROLES_SUCCESS,
					payload: {
						createAdminRoleLoading: false
					}
				});
				dispatch(closeAdminRolesModal());
				showToaster({ messageId: 'adminRoleSuccess', requestContent: { id  }, toasterType: 'success' });
			} else {
				await dispatch({
					type: CREATE_ADMIN_ROLES_ERROR,
					payload: {
						createAdminRoleLoading: false,
						error: data && data.createAdminRole && data.createAdminRole.errorMessage
					}
				});
				showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.createAdminRole && data.createAdminRole.errorMessage }, toasterType: 'error' });
			}
		} catch (error) {
			await dispatch({
				type: CREATE_ADMIN_ROLES_ERROR,
				payload: {
					createAdminRoleLoading: false,
					error
				}
			});
			showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
		}
	}
}

export function deleteAdminRole(id) {
	return async (dispatch, getState, { client }) => {
		await dispatch({
			type: DELETE_ADMIN_ROLES_START,
			payload: {
				deleteAdminRoleLoading: true
			}
		});

		try {
			const { data } = await client.mutate({
				mutation: deleteAdminQuery,
				variables: {
					id
				},
				refetchQueries: [{ query }]
			});

			if (data && data.deleteAdminRole && data.deleteAdminRole.status === 200) {
				await dispatch({
					type: DELETE_ADMIN_ROLES_SUCCESS,
					payload: {
						deleteAdminRoleLoading: false
					}
				});
				dispatch(closeAdminRolesModal());
				showToaster({ messageId: 'adminDeleteSuccess', toasterType: 'success' });
			} else {
				showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.deleteAdminRole && data.deleteAdminRole.errorMessage }, toasterType: 'error' });
				await dispatch({
					type: DELETE_ADMIN_ROLES_ERROR,
					payload: {
						deleteAdminRoleLoading: false,
						error: data && data.deleteAdminRole && data.deleteAdminRole.errorMessage
					}
				});
			}
		} catch (error) {
			showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
			await dispatch({
				type: DELETE_ADMIN_ROLES_ERROR,
				payload: {
					deleteAdminRoleLoading: false,
					error
				}
			});
		}
	}
}

export function getPrivileges() {
	return async (dispatch, getState, { client }) => {
		await dispatch({
			type: ADMIN_PRIVILEGES_START
		});

		try {
			const { data } = await client.query({
				query: getPrivilegesQuery
			});

			if (data && data.getPrivileges && data.getPrivileges.status === 200) {
				await dispatch({
					type: ADMIN_PRIVILEGES_SUCCESS,
					payload: {
						privileges: data.getPrivileges.results
					}
				});
			} else {
				await dispatch({
					type: ADMIN_PRIVILEGES_ERROR,
				});
			}
		} catch (error) {
			await dispatch({
				type: ADMIN_PRIVILEGES_ERROR,
			});
		}
	}
}