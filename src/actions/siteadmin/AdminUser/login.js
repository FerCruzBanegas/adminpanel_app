

import gql from 'graphql-tag';
import {
	CREATE_ADMIN_USER_START,
	CREATE_ADMIN_USER_SUCCESS,
	CREATE_ADMIN_USER_ERROR,
} from '../../../constants';
import { setRuntimeVariable } from '../../runtime';
import history from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import { getAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';
import { getPrivileges } from '../../../actions/siteadmin/AdminRoles/manageAdminRoles';

const query = gql`
query (
    $email: String!,
    $password: String!) {
    adminUserLogin (
        email: $email,
        password: $password
    ) {
        status
        token
        isSuperAdmin
        errorMessage
    }
}
`;

export function login(
	email,
	password,
) {
	return async (dispatch, getState, { client }) => {
		await dispatch({
			type: CREATE_ADMIN_USER_START,

		});

		dispatch(setLoaderStart('AdminLogin'));


		try {
			const { data } = await client.query({
				query,
				variables: {
					email,
					password,
				},
				fetchPolicy: 'network-only'
			});

			dispatch(setLoaderComplete('AdminLogin'));

			if (data && data.adminUserLogin && data.adminUserLogin.status == 200) {
				await dispatch({
					type: CREATE_ADMIN_USER_SUCCESS,
				});
				dispatch(setRuntimeVariable({
					name: 'isAdminAuthenticated',
					value: true,
				}));

				dispatch(setRuntimeVariable({
					name: 'isSuperAdmin',
					value: data && data.adminUserLogin && data.adminUserLogin.isSuperAdmin
				}));
				dispatch(getAdminUser());
				dispatch(getPrivileges());

				history.push('/siteadmin');
				return false;


			} else {

				if (data && data.adminUserLogin && data.adminUserLogin.isSuperAdmin) {
					dispatch(setRuntimeVariable({
						name: 'isAdminAuthenticated',
						value: true,
					}));
					dispatch(setRuntimeVariable({
						name: 'isSuperAdmin',
						value: data && data.adminUserLogin && data.adminUserLogin.isSuperAdmin
					}));
					dispatch(getAdminUser());
					dispatch(getPrivileges());

				}
				await dispatch({
					type: CREATE_ADMIN_USER_ERROR,
				});

				return data && data.adminUserLogin && data.adminUserLogin.errorMessage;
			}


		} catch (error) {
			await dispatch({
				type: CREATE_ADMIN_USER_ERROR,

			});
			dispatch(setLoaderComplete('AdminLogin'));
			return false;
		}
	}
}