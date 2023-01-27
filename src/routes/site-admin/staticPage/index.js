import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import StaticPage from './StaticPage';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
    const title = intl.formatMessage(messages.staticpageManagement);

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

        // Admin restriction
        if (!restrictUrls('/siteadmin/staticpage/', adminPrivileges, privileges)) {
            return { redirect: '/siteadmin' };
        }
    
    return {
        title,
        component: (
            <AdminLayout>
                <StaticPage />
            </AdminLayout>
        )
    }
}

export default action;