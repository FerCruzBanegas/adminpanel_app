import { OrderItems, Booking, OrderSubCategory, Category, User, UserProfile, ScheduleBooking, Country } from '../data/models';
import { convert } from '../helpers/currencyConvertion';
import { getCurrencyDetails } from '../helpers/currencyHelper';

export async function getPdfContent(orderId, userType) {

	const bookingData = await Booking.findOne({
		where: { orderId },
		raw: true
	});
	let scheduleBookingdata;
	if (bookingData && bookingData.bookingType === 2) { // Schedule Booking
		scheduleBookingdata = await ScheduleBooking.findOne({
			attributes: ['scheduleFrom'],
			where: {
				bookingId: bookingData.id
			},
			raw: true
		});
	};

	const orderItems = await OrderItems.findAll({
		where: { orderId },
		raw: true
	});

	const categoryData = await Category.findOne({
		attributes: ['id', 'name'],
		where: { id: bookingData.categoryId },
		raw: true
	});

	const userData = await getUser(bookingData.userId);
	const partnerData = await getUser(bookingData.partnerId);
	const userCountry = await getUserCountryCode(userData && userData.country);
	const partnerCountry = await getUserCountryCode(partnerData && partnerData.country);
	const { baseCurrency, rates } = await getCurrencyDetails();

	let subTotal = 0, orderDetails = [];
	let convertCurrency = userType == 1 ? userData.preferredCurrency : partnerData.preferredCurrency;

	if (orderItems && orderItems.length > 0) {
		await Promise.all(orderItems.map(async (data) => {
			let fare = 0;
			if (bookingData.pricingType === 'hourly') {
				if (data.workedDuration > data.minimumHours) {
					fare = data.baseFare * data.workedDuration
				} else {
					fare = data.baseFare * data.minimumHours;
				}
			} else {
				fare = data.baseFare * data.totalQuantity
			}

			subTotal = subTotal + fare;

			let quantity = 0;
			if (bookingData.pricingType === 'hourly') {
				quantity = data.workedDuration > data.minimumHours ? data.workedDuration : data.minimumHours
			} else {
				quantity = data.totalQuantity
			}

			let subCategoryDetails = await OrderSubCategory.findOne({
				where: { subCategoryId: data.subCategoryId },
			});

			if (bookingData.currency !== convertCurrency) {
				fare = convert(baseCurrency, rates, fare, bookingData.currency, convertCurrency);
			}

			orderDetails.push({
				id: data.id,
				name: subCategoryDetails.name,
				total: fare,
				quantity,
				workedDuration: data.workedDuration,
				minimumHours: data.minimumHours
			})

		}));

		let priceDetails = {};

		if (bookingData.currency !== convertCurrency) {
			priceDetails.subTotal = convert(baseCurrency, rates, subTotal, bookingData.currency, convertCurrency);
			priceDetails.userServiceFee = convert(baseCurrency, rates, bookingData.userServiceFee, bookingData.currency, convertCurrency);
			priceDetails.partnerServiceFee = convert(baseCurrency, rates, bookingData.partnerServiceFee, bookingData.currency, convertCurrency);
			priceDetails.userPayableFare = convert(baseCurrency, rates, bookingData.userPayableFare, bookingData.currency, convertCurrency);
			priceDetails.partnerTotalFare = convert(baseCurrency, rates, bookingData.partnerTotalFare, bookingData.currency, convertCurrency);
			priceDetails.travellingPrice = convert(baseCurrency, rates, bookingData.travellingPrice, bookingData.currency, convertCurrency);
			priceDetails.additionalFee = convert(baseCurrency, rates, bookingData.additionalFee, bookingData.currency, convertCurrency);
			priceDetails.discountAmount = convert(baseCurrency, rates, bookingData.discountAmount, bookingData.currency, convertCurrency);
			priceDetails.tipsAmount = convert(baseCurrency, rates, bookingData.tipsAmount, bookingData.currency, convertCurrency);
			priceDetails.tipsPartnerTotalFare = convert(baseCurrency, rates, bookingData.tipsPartnerTotalFare, bookingData.currency, convertCurrency);
		} else {
			priceDetails.subTotal = subTotal;
			priceDetails.userServiceFee = bookingData.userServiceFee;
			priceDetails.partnerServiceFee = bookingData.partnerServiceFee;
			priceDetails.userPayableFare = bookingData.userPayableFare;
			priceDetails.partnerTotalFare = bookingData.partnerTotalFare;
			priceDetails.travellingPrice = bookingData.travellingPrice;
			priceDetails.additionalFee = bookingData.additionalFee;
			priceDetails.discountAmount = bookingData.discountAmount;
			priceDetails.tipsAmount = bookingData.tipsAmount;
			priceDetails.tipsPartnerTotalFare = bookingData.tipsPartnerTotalFare;
		}

		priceDetails.currency = bookingData.currency;
		priceDetails.orderDetails = orderDetails;
		priceDetails.userDetails = userData;
		priceDetails.partnerDetails = partnerData;
		priceDetails.location = bookingData.userLocation;
		priceDetails.paymentType = bookingData.paymentType;
		priceDetails.pricingType = bookingData.pricingType;
		priceDetails.date = bookingData.bookingType == 2 ? scheduleBookingdata && scheduleBookingdata.scheduleFrom : bookingData.createdAt;
		priceDetails.partnerCurrency = partnerData.preferredCurrency;
		priceDetails.userCurrency = userData.preferredCurrency;
		priceDetails.categoryName = categoryData && categoryData.name;
		priceDetails.userCountry = userCountry;
		priceDetails.partnerCountry = partnerCountry;
		priceDetails.bookingId = bookingData.id;

		return await {
			priceStatus: 200,
			priceDetails
		}

	} else {
		return await {
			priceStatus: 400,
			priceErrorMessage: "Oops! Unable to find the booking information."
		}
	}
}

export async function getUser(userId) {

	let profileAttributes = ['profileId', 'userId', 'firstName', 'lastName', 'picture',
		'preferredCurrency', 'preferredPaymentMethod', 'preferredLanguage', 'preferredLocation', 'preferredLat', 'preferredLng', 'country'];

	let userAttributes = ['id', 'email', 'phoneNumber', 'phoneDialCode', 'lat', 'lng',
		'userStatus', 'isActive', 'isBan', 'userType', 'createdAt', 'updatedAt', 'overallRating', 'phoneCountryCode'];

	const userData = await UserProfile.findOne({
		attributes: profileAttributes,
		where: {
			userId
		},
		include: [{
			model: User,
			as: 'user',
			attributes: userAttributes,
			required: true,
			where: {
				id: userId,
				deletedAt: null
			},
		}],
		raw: true
	});
	return userData;

}

export async function getUserCountryCode(countryName) {
	const data = await Country.findOne({
		attributes: ['countryCode'],
		where: {
			countryName
		},
		raw: true
	});
	return data.countryCode;
}