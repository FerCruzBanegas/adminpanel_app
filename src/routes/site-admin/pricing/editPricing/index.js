import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import NotFound from '../../../../components/NotFound/NotFound';
import EditPricing from './EditPricing';
import messages from '../../../../locale/messages';
import { restrictUrls } from '../../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
  const title = intl.formatMessage(messages.editFare);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().account && store.getState().account.privileges;
  let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/login' };
  }
  // Admin restriction
  if (!restrictUrls('/siteadmin/pricing/', adminPrivileges, privileges)) {
    return { redirect: '/siteadmin' };
  }

  if (!params || !params.id) {
    return {
      title,
      component: (
        <AdminLayout>
          <NotFound title={'Page Not Found'} />;
        </AdminLayout>
      ),
    };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <EditPricing id={params.id} />
      </AdminLayout>
    ),
  };
}

export default action;
