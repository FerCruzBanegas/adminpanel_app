import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import SubCategory from './SubCategory';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
  const title = intl.formatMessage(messages.subCategoryMenu);
  let adminPrivileges = store.getState().account && store.getState().account.privileges;
  let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (!isAdminAuthenticated) {
    return { redirect: '/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/sub-category', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <SubCategory />
      </AdminLayout>
    ),
  };
}

export default action;
