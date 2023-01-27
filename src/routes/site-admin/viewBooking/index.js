import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ViewBooking from './ViewBooking';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, query, intl }) {
    const title = intl.formatMessage(messages.bookingDetails);

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().account && store.getState().account.privileges;
    let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/jobs', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = Number(params.id)
    const from = params.from

    return {
        title,
        component: (
            <AdminLayout>
                <ViewBooking id={id} from={from} />
            </AdminLayout>
        )
    }
}

export default action;