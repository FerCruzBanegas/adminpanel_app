var FCM = require('fcm-node');
var fcm = new FCM(serverKey);
import fetch from 'node-fetch'
import sequelize from '../../data/sequelize';
import { UserLogin, Currencies } from '../../data/models';
import { serverKey } from '../../config';

const pushNotificationRoutes = app => {

	app.post('/push-notification', async function (req, res) {
		try {
			let userId = req.body.userId;
			let content = req.body.content;
			let userType = req.body.userType;
			let notificationId = Math.floor(100000 + Math.random() * 900000);
			let deviceIds = [];
			let status = 200, requestTime = new Date().getTime();
			content['notificationId'] = notificationId;
			content['content_available'] = true;
			content['requestTime'] = requestTime;
			content['sound'] = 'default';
			let getdeviceIds, where = {};

			if (userId != null) {
				where = {
					userId,
					userType: Number(userType)
				}
			} else if (userType) {
				if (userType == 'all') {
					where = {

					}
				} else {
					where = {
						userId: {
							in: [sequelize.literal(`SELECT id FROM User WHERE isBan=0 AND deletedAt IS NULL`)]
						},
						userType: Number(userType)
					}
				}
			}

			getdeviceIds = await UserLogin.findAll({
				attributes: ['deviceId'],
				where,
				raw: true
			});

			deviceIds = getdeviceIds.map((o) => o.deviceId);

			var message = {
				registration_ids: deviceIds,
				notification: {
					title: content.title,
					body: content.message,
					priority: 'high',
					click_action: 'FLUTTER_NOTIFICATION_CLICK',
					requestTime,
					sound: 'default'
				},
				data: {
					content,
					action_loc_key: null,
					click_action: "FLUTTER_NOTIFICATION_CLICK",
					screen: content.screen || "OPEN_PAGE",
					content_available: true,
					priority: 'high'
				}
			};

			fcm.send(message, function (err, response) {
				if (err) {
					status = 400;
					console.log("Something has gone wrong!", err);
				} else {
					console.log("Successfully sent with response: ", response);
				}

				console.log('status', status)

				res.send({ status, errorMessge: err });
			});
		} catch (error) {
			console.log('error', error)
			res.send({ status: 500, errorMessge: error });
		}
	});


	app.post('/updateCoinbase', async function (req, res) {
		const URL = 'https://api.coinbase.com/v2/currencies';
		const resp = await fetch(URL);
		const { data } = await resp.json();
		let newCurrencyList = data && data.length > 0 && data.map(function (currency) {
			return { "symbol": currency.id };
		});
		let existingCurrencyList = await Currencies.findAll({
			attributes: ['id', 'symbol'],
			raw: true
		});
		let filterId = new Set(existingCurrencyList.map(({ symbol }) => symbol));
		let filteredCurrencyList = newCurrencyList.filter(({ symbol }) => !filterId.has(symbol));
		await Currencies.bulkCreate(filteredCurrencyList);
		res.send({ status: 200 });
	});

};

export default pushNotificationRoutes;