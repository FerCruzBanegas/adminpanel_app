import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Dashboard from './Dashboard';
import messages from '../../../locale/messages';

function action({ store, intl }) {

  const title = intl && intl.formatMessage(messages.dashboard);
  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (!isAdminAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <Dashboard title={title} />
      </AdminLayout>
    ),
  };
}

export default action;
