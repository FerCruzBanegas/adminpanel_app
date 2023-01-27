import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import HomeSettings from './HomeSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

function action({ store, params, intl }) {
    const title = intl.formatMessage(messages.homepageBanner);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/homepage/banner', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <HomeSettings title={title} />
            </AdminLayout>
        )
    }
}

export default action;