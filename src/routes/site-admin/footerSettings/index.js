import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import FooterSettings from './FooterSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

function action({ store, params, intl }) {
  const title = intl.formatMessage(messages.footerSectionSettings);
  
   // From Redux Store
   let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
   let adminPrivileges = store.getState().account && store.getState().account.privileges;
   let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

   if (!isAdminAuthenticated) {
       return { redirect: '/login' }
   }

       // Admin restriction
       if (!restrictUrls('/siteadmin/homepage/footer', adminPrivileges, privileges)) {
        return { redirect: '/siteadmin' };
    }

   return {
       title,
       component: (
           <AdminLayout>
               <FooterSettings title={title} />
           </AdminLayout>
       )
   }
}

export default action;