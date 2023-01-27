import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import ManageNotifications from './ManageNotifications'
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
  const title = intl.formatMessage(messages.manageNotifications);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().account && store.getState().account.privileges;
	let siteName =  store.getState().siteSettings && store.getState().siteSettings.data && store.getState().siteSettings.data.siteName;
  let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;
  
  if (!isAdminAuthenticated) {
    return { redirect: '/login' };
  }
  
  // Admin restriction
  if (!restrictUrls('/siteadmin/notifications', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <ManageNotifications siteName={siteName} />
      </AdminLayout>
    ),
  };
}

export default action;