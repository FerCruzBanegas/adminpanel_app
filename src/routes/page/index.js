import React from 'react';
import fetch from 'node-fetch';

import Layout from '../../components/Layout';
import NotFound from '../not-found/NotFound';
import Page from './Page';

import { siteUrl } from '../../config';

const query = `
query getContentPage ($pageUrl: String) {
    getContentPage (pageUrl: $pageUrl) {
        status
        errorMessage
        result{
        id
        metaTitle
        metaDescription
        pageUrl
        pageTitle
        content
        isEnable
        pageBanner
        }
    }
}
`;

async function action({ store, params }) {
    const response = await fetch(`${siteUrl}/graphql`, {
        method: 'post',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { pageUrl: params.pageUrl }
        }),
        credentials: 'include'
    });

    const { data } = await response.json();

    if (data && data.getContentPage && data.getContentPage.result) {
        return {
            title: data.getContentPage.result && data.getContentPage.result.metaTitle,
            component: (
                <Layout><Page data={data.getContentPage.result} /></Layout>
            )
        }
    } else {
        return {
            title: "Not Found",
            component: <Layout><NotFound title="Not Found" /></Layout>,
            status: 404,
        };
    }
}

export default action;