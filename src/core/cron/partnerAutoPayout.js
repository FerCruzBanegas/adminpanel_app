var CronJob = require('cron').CronJob;
import each from 'sync-each';
import stripePackage from 'stripe';
import { Booking, Payout, TransactionHistory, FailedTransactionHistory, User, SiteSettings } from '../../data/models';
import { payment } from '../../config';
const stripe = stripePackage(payment.stripe.secretKey);
import { convert } from '../../helpers/currencyConvertion';
import { getCurrencyDetails } from '../../helpers/currencyHelper';

const partnerAutoPayout = app => {

	new CronJob('0 0 0 * * *', async function () {

		let offset = 0;
		autoPayout(offset);

		async function autoPayout(offset) {
			const getSiteSettings = await SiteSettings.findOne({
				attributes: ['value'],
				where: {
					name: 'siteName'
				},
				raw: true
			});

			const getBooking = await Booking.findAll({
				limit: 100,
				offset,
				attributes: ['id', 'partnerId', 'userId', 'partnerTotalFare', 'totalFare', 'currency', 'isTipGiven', 'tipsPartnerTotalFare', 'paymentStatus'],
				where: {
					status: { eq: 'completed' },
					isPayoutPaid: { eq: false },
					paymentType: { in: [2, 3] },
					isBanStatus: { eq: false },
					paymentStatus: 'completed'
				},
				order: [['id', 'DESC']],
				raw: true
			});

			if (getBooking && getBooking.length > 0) {
				each(getBooking, async function (bookingData, next) {
					let getpayout = await Payout.findOne({
						where: {
							userId: bookingData.partnerId,
							isDefault: { eq: true }
						},
						raw: true
					});

					let checkUserStatus = await User.findOne({
						where: {
							id: bookingData.partnerId,
							isBan: { eq: false },
							deletedAt: { eq: null }
						},
						raw: true
					});

					let partnerTotalFare;
					if (bookingData.isTipGiven) {
						partnerTotalFare = bookingData && bookingData.tipsPartnerTotalFare;
					} else {
						partnerTotalFare = bookingData && bookingData.partnerTotalFare;
					}

					if (getpayout && getpayout.payEmail && checkUserStatus) {
						try {
							let payoutAmount = bookingData.partnerTotalFare;
							if (bookingData.currency !== getpayout.currency) {
								const { baseCurrency, rates } = await getCurrencyDetails();
								payoutAmount = convert(baseCurrency, rates, bookingData.partnerTotalFare, bookingData.currency, getpayout.currency);
							}

							let payout = await stripe.transfers.create({
								amount: Math.round(Number(payoutAmount || 0) * 100),
								currency: getpayout.currency,
								destination: getpayout.payEmail,
								description: `${getSiteSettings && getSiteSettings.value} # ${bookingData.id}`
							});


							if (payout && payout.id) {
								let transaction = await TransactionHistory.create({
									bookingId: bookingData.id,
									partnerId: bookingData.partnerId,
									userId: bookingData.userId,
									amount: partnerTotalFare,
									currency: bookingData.currency,
									transactionId: payout.id
								});

								if (transaction) {

									await Booking.update({
										isPayoutPaid: true
									}, {
										where: {
											id: bookingData.id
										}
									});
								}

								process.nextTick(next);

							} else {
								process.nextTick(next);
							}

						} catch (error) {

							let transaction = await FailedTransactionHistory.create({
								bookingId: bookingData.id,
								partnerId: bookingData.partnerId,
								userId: bookingData.userId,
								amount: partnerTotalFare,
								currency: bookingData.currency,
								reason: error.message || error
							});

							process.nextTick(next);
						}

					} else {
						process.nextTick(next);
					}

				}, function (err, transformedItems) {

					offset = parseFloat(offset + 100);
					autoPayout(offset);
				});
			}

		}

	}, null, true, 'America/Los_Angeles');

};

export default partnerAutoPayout;
