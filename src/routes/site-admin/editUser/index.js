import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import EditUser from './EditUser';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    const title = intl.formatMessage(messages.editUser);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/users', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = Number(params.id);
    return {
        title,
        component: (
            <AdminLayout>
                <EditUser title={title} id={id} ></EditUser>
            </AdminLayout>
        )
    }
}

export default action;
