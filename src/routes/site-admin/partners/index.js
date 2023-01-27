import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Partners from './Partners';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
  const title = intl.formatMessage(messages.partnerMenu);
  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().account && store.getState().account.privileges;
  let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/site-admin/partners' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/partners', adminPrivileges, privileges)) {  
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <Partners />
      </AdminLayout>
    ),
  };
}

export default action;
