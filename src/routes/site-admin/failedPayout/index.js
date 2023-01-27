import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import FailedPayout from './FailedPayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

function action({ store, intl }) {
    
    const title = intl.formatMessage(messages.manageFailedPayout);

    //From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/failed-payout/', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <FailedPayout />
            </AdminLayout>
        ),
    }
}

export default action;