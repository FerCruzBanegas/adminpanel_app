import React from 'react';

import SiteSettings from './SiteSettings'
import AdminLayout from '../../../components/Layout/AdminLayout'

import messages from '../../../locale/messages';

import { restrictUrls } from '../../../helpers/adminPrivileges';

async function action({ store, intl }) {
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) return { redirect: '/login' }
    if (!restrictUrls('/siteadmin/settings/site', adminPrivileges, privileges)) return { redirect: '/siteadmin' };

    return {
        title: intl.formatMessage(messages.siteSettings),
        component: <AdminLayout><SiteSettings /></AdminLayout>
    };
}

export default action