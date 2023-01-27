import React from 'react';

import EditContentPage from './EditContentPage'
import AdminLayout from '../../../components/Layout/AdminLayout'

import messages from '../../../locale/messages';

import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) return { redirect: '/login' };

    if (!restrictUrls('/siteadmin/contentpage/', adminPrivileges, privileges)) return { redirect: '/siteadmin' };

    return {
        title: intl.formatMessage(messages.contentpageManagement),
        component: <AdminLayout><EditContentPage id={Number(params.pageId)} /></AdminLayout>
    };
}

export default action;