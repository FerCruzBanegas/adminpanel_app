
import React from 'react';
import Layout from '../../components/Layout/HeadLessLayout';
import Login from './Login';

function action({ intl, store }) {
  const title = 'Log In';

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (isAdminAuthenticated) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: (
      <Layout>
        <Login title={title} />
      </Layout>
    ),
  };
}

export default action;
