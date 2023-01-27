import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import EditPartner from './EditPartner';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    const title = intl.formatMessage(messages.editPartner);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/partners', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = Number(params.id);
    return {
        title,
        component: (
            <AdminLayout>
                <EditPartner title={title} id={id} ></EditPartner>
            </AdminLayout>
        )
    }
}

export default action;
