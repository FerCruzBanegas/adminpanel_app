import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import SafetySettings from './SafetySettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params }) {
    const title = "User Apps Section"

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/homepage/user', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }


    return {
        title,
        component: (
            <AdminLayout>
                <SafetySettings title={title} />
            </AdminLayout>
        )
    }
}

export default action;