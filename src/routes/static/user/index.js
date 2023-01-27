import React from 'react';
import fetch from 'node-fetch';

import Layout from '../../../components/Layout/Layout';
import Page from '../../../components/Page/Page';
import { siteUrl } from '../../../config';
import User from './User';


const query = `query getEditStaticPage ($id: Int!) {
  getEditStaticPage (id: $id) {
      result{
        id
        pageName
        content
        metaTitle
        metaDescription
        pageBanner
        createdAt
      }
  }
}`;

async function action({ locale }) {
    const dataResult = await new Promise((resolve) => {
        require.ensure([], (require) => {
            try {
                resolve(require(`./user.${locale}.md`));
            } catch (e) {
                resolve(require('./user.md'));
            }
        }, 'user');
    });

    const resp = await fetch(`${siteUrl}/graphql`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { id: 2 }
        }),
        credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.getEditStaticPage && data.getEditStaticPage.result) {

        return {
            title: data.getEditStaticPage.result.metaTitle,
            description: data.getEditStaticPage.result.metaDescription,
            component: <Layout><User data={data} /></Layout>,
        };

    } else {
        return {
            title: dataResult.title,
            component: <Layout><Page {...dataResult} /></Layout>,
        };
    }
}

export default action