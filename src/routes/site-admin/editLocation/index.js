import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditLocation from './EditLocation';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    const title = intl.formatMessage(messages.editLocation);

    //From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/location', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = Number(params.id);

    return {
        title,
        component: (
            <AdminLayout>
                <EditLocation id={id} />
            </AdminLayout>
        ),
    }
}

export default action;