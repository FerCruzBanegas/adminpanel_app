import React from 'react';

import AdminLayout from '../../../components/Layout/AdminLayout';

import CategorySettings from './CategorySettings';

import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    const title = intl.formatMessage(messages.topFeatures);
    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) return { redirect: '/login' };
    if (!restrictUrls('/siteadmin/homepage/topfeature', adminPrivileges, privileges)) return { redirect: '/siteadmin' };

    return {
        title,
        component: <AdminLayout><CategorySettings title={title} /></AdminLayout>
    };
}

export default action;