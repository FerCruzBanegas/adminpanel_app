import React from 'react';
import ReactPDF from "@react-pdf/renderer";
import { IntlProvider } from 'react-intl';
import fetch from 'node-fetch';
import fs from 'fs';
let path = require('path');
import UserPdfDocument from '../../components/ViewBookingDetails/UserPdfDocument';
import ProviderPdfDocument from '../../components/ViewBookingDetails/ProviderPdfDocument';
import {
	getPdfContent
} from '../../helpers/getPdfContent';
import { siteUrl } from '../../config';

const downloadReceipt = (app) => {
	app.get('/download-pdf', async function (req, res) {

		try {

			let orderId = req.query.orderId;
			let userType = req.query.userType;
			let homeLogo, siteName;
			let timeStamp = Math.round((new Date()).getTime() / 1000);
			let fileName, filePath;

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

			let emailContent = {};

			const logoResp = await fetch(siteUrl + '/graphql', {
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

			const { priceStatus, priceDetails } = await getPdfContent(orderId, userType);

			if (priceStatus != 200) {
				res.send({ status: 400 });
				return;
			}

			if (userType == 1) {

				fileName = siteName.value + '_' + priceDetails.bookingId + '_user_' + timeStamp;
				filePath = `${__dirname}/public/${fileName}.pdf`;

				await ReactPDF.renderToFile(
					<IntlProvider locale={'en'}>
						<UserPdfDocument
							content={emailContent}
							priceDetails={priceDetails}
						/>
					</IntlProvider>, filePath);
			} else {

				fileName = siteName.value + '_' + priceDetails.bookingId + '_provider_' + timeStamp;
				filePath = `${__dirname}/public/${fileName}.pdf`;

				await ReactPDF.renderToFile(
					<IntlProvider locale={'en'}>
						<ProviderPdfDocument
							content={emailContent}
							priceDetails={priceDetails}
						/>
					</IntlProvider>, filePath);
			}

			var file = fs.createReadStream(filePath);
			res.setHeader('Content-disposition', `attachment; filename=${fileName}.pdf`);
			res.setHeader('Content-Type', 'application/pdf');

			file.on('open', function () {
				file.pipe(res);
				fs.unlinkSync(filePath);
			});

			file.on('error', function (err) {
				res.end(err);
			});

			return;

		} catch (error) {
			console.log(error)
			res.send({ status: 400, errorMessage: error });
		}
	})
};

export default downloadReceipt;