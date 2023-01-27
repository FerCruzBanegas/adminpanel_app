import React from 'react';
import fetch from 'node-fetch';
import Layout from '../../../components/Layout/Layout';
import Page from '../../../components/Page/Page';
import { siteUrl } from '../../../config'
import Legal from './Legal';

const query = `query getEditStaticPage ($id: Int!) {
  getEditStaticPage (id: $id) {
      result{
        id
        pageName
        content
        metaTitle
        metaDescription
        createdAt
        pageBanner
      }
  }
}`;

async function action({ locale }) {
    const dataResult = await new Promise((resolve) => {
        require.ensure([], (require) => {
            try {
                resolve(require(`./legal.${locale}.md`));
            } catch (e) {
                resolve(require('./legal.md'));
            }
        }, 'legal');
    });

    const resp = await fetch(`${siteUrl}/graphql`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { id: 5 }
        }),
        credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.getEditStaticPage && data.getEditStaticPage.result) {

        return {
            title: data.getEditStaticPage.result.metaTitle,
            description: data.getEditStaticPage.result.metaDescription,
            component: <Layout><Legal data={data} /></Layout>,
        };

    } else {
        return {
            title: dataResult.title,
            component: <Layout><Page {...dataResult} /></Layout>,
        };
    }
}

export default action