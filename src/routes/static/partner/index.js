import React from 'react';
import fetch from 'node-fetch';

import Layout from '../../../components/Layout/Layout';
import Page from '../../../components/Page/Page';
import Partner from './Partner';

import { siteUrl } from '../../../config';


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
                resolve(require(`./partner.${locale}.md`));
            } catch (e) {
                resolve(require('./partner.md'));
            }
        }, 'partner');
    });

    const resp = await fetch(`${siteUrl}/graphql`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { id: 3 }
        }),
        credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.getEditStaticPage && data.getEditStaticPage.result) {

        return {
            title: data.getEditStaticPage.result.metaTitle,
            description: data.getEditStaticPage.result.metaDescription,
            component: <Layout><Partner data={data}/></Layout>,
        };

    } else {
        return {
            title: dataResult.title,
            component: <Layout><Page {...dataResult} /></Layout>,
        };
    }
}

export default action