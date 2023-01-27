import React from 'react';
import Oy from 'oy-vey';
import { IntlProvider } from 'react-intl';
import ReactPDF from '@react-pdf/renderer';
import fs from 'fs';

import fetch from '../fetch';
import EmailTemplate from './template/EmailTemplate';
import { getSubject } from './template/subjects';
import UserPdfDocument from '../../components/ViewBookingDetails/UserPdfDocument';
import ProviderPdfDocument from '../../components/ViewBookingDetails/ProviderPdfDocument';

import {
    getPdfContent
} from '../../helpers/getPdfContent';

export async function sendEmail(to, type, content) {

    let html;
    let subjectData = getSubject(type), emailContent = content;
    let userType = (type == 'userReceipt' ? 1 : 2);
    let fileName, homeLogo, siteName;

    let query = `query getEmailLogo {
        getEmailLogo { 
         results{
            name
            value
         }
         status
         errorMessage
        }
      }`;

    if (content && !content.logo) {
        const logoResp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query
            }),
            credentials: 'include',
        });

        const { data } = await logoResp.json();

        if (data && data.getEmailLogo && data.getEmailLogo.results && data.getEmailLogo.results.length > 0) {
            homeLogo = data.getEmailLogo.results.find((o) => o.name === 'homeLogo');
            siteName = data.getEmailLogo.results.find((o) => o.name === 'siteName');
            emailContent.logo = homeLogo.value;
            emailContent.siteName = siteName.value;
        }

    }

    const { priceStatus, priceDetails } = await getPdfContent(content.orderId, userType);
    let timeStamp = Math.round((new Date()).getTime() / 1000);

    if (type == 'userReceipt') {
        fileName = siteName.value + '_' + priceDetails.bookingId + '_user_' + timeStamp;
        await ReactPDF.renderToFile(

            <IntlProvider locale={'en'}>
                <UserPdfDocument
                    content={emailContent}
                    priceDetails={priceDetails}
                />
            </IntlProvider>

            , `${__dirname}/${fileName}.pdf`);

        content.attachments = [{ path: `${__dirname}/${fileName}.pdf` }]

    } else if (type == 'providerReceipt') {
        fileName = siteName.value + '_' + priceDetails.bookingId + '_provider_' + timeStamp;
        await ReactPDF.renderToFile(
            <IntlProvider locale={'en'}>
                <ProviderPdfDocument
                    content={emailContent}
                    priceDetails={priceDetails}
                />
            </IntlProvider>

            , `${__dirname}/${fileName}.pdf`);

        content.attachments = [{ path: `${__dirname}/${fileName}.pdf` }]

    }

    html = Oy.renderTemplate(
        <IntlProvider locale={"en"}>
            <EmailTemplate type={type} content={emailContent} priceDetails={priceDetails}
            />
        </IntlProvider>, {
        title: subjectData.subject,
        previewText: subjectData.previewText
    });

    let mailOptions = {
        to, // list of receivers
        subject: subjectData.subject, // Subject line
        //text: textMessage, // plain text body
        html,
        attachments: content.attachments ? content.attachments : []
    };

    const resp = await fetch('/sendEmail', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mailOptions }),
        credentials: 'include'
    });

    const { status, response } = await resp.json();

    fs.unlinkSync(`${__dirname}/${fileName}.pdf`);

    return { status, response };
}
