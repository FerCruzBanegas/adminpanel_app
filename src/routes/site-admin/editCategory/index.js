import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditCategory from './EditCategory';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    const title = intl.formatMessage(messages.editCategory);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    const id = Number(params.id);

    // Admin restriction
    if (!restrictUrls('/siteadmin/category', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <EditCategory title={title} id={id} />
            </AdminLayout>
        )
    }
}

export default action;