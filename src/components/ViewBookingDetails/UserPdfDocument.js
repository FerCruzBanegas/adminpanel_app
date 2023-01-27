import React from 'react';
import { Page, Text, Document, View, Image } from '@react-pdf/renderer';
import { api } from '../../config';
import CurrencyView from '../../core/email/modules/CurrencyView';
import { getDateUsingTimeZone, workTimeConversion, getTimeZone } from '../../core/email/helpers/getDateUsingTimeZone';
class UserPdfDocument extends React.Component {
	render() {
		const { content: { logo, siteName } } = this.props;
		const { priceDetails: { userDetails, partnerDetails, date, subTotal, userCurrency, orderDetails, userServiceFee, travellingPrice, additionalFee, discountAmount, userPayableFare, location, paymentType, pricingType, tipsAmount, categoryName, userCountry } } = this.props;
		let subCategoryList = orderDetails.map(function (elem) {
			return (elem.name);
		}).join(", ");
		return (
			<Document>
				<Page size="A4">
					<View style={{ paddingLeft: '15px', paddingRight: '15px' }}>
						<View style={{ display: 'flex', borderBottom: '0.800000011920929px dashed #C7C7C7;', paddingTop: '20px', paddingBottom: '15px', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', }}>
							<div>
								<Text style={{ fontSize: '16px', color: '#161616' }}>Receipt</Text>
								<Text style={{ fontSize: '12px', marginTop: '7px', color: '#161616' }}>{getDateUsingTimeZone(userCountry, date)}</Text>
								<Text style={{ fontSize: '12px', marginTop: '7px', color: '#161616' }}>{getTimeZone(userCountry)}</Text>
							</div>
							<div>
								{logo && <Image src={api.apiEndpoint + '/images/logo/' + logo} style={{ width: '50px' }} />}

							</div>
						</View>
						<View style={{ paddingTop: '15px', paddingBottom: '15px', borderBottom: '0.800000011920929px dashed #C7C7C7;' }}>
							<Text style={{ fontSize: '13px', color: '#161616' }}>Customer details</Text>
							<Text style={{ color: '#606060', marginTop: '7px', fontSize: '11px' }}>{userDetails.firstName}</Text>
							<Text style={{ color: '#606060', marginTop: '7px', fontSize: '11px' }}>{userDetails['user.phoneDialCode'] + '' + userDetails['user.phoneNumber']}</Text>
						</View>
						<View style={{ paddingTop: '15px', paddingBottom: '15px', borderBottom: '0.800000011920929px dashed #C7C7C7;' }}>
							<Text style={{ fontSize: '13px', color: '#161616' }}>Service provider details</Text>
							<Text style={{ color: '#606060', marginTop: '7px', fontSize: '11px' }}>{partnerDetails.firstName}</Text>
							<Text style={{ color: '#606060', marginTop: '7px', fontSize: '11px' }}>{partnerDetails['user.phoneDialCode'] + '' + partnerDetails['user.phoneNumber']}</Text>
						</View>
						<View style={{ paddingTop: '15px', paddingBottom: '15px', borderBottom: '0.800000011920929px dashed #C7C7C7;' }}>
							<Text style={{ fontSize: '13px', color: '#161616' }}>Jobs</Text>
							<Text style={{ color: '#606060', marginTop: '7px', fontSize: '11px' }}>{subCategoryList}</Text>

						</View>
						<View style={{ paddingTop: '15px', paddingBottom: '15px', borderBottom: '0.800000011920929px dashed #C7C7C7;' }}>
							<Text style={{ fontSize: '13px', color: '#161616' }}>Location</Text>
							<Text style={{ color: '#606060', marginTop: '7px', fontSize: '11px' }}>{location}</Text>

						</View>
						<View style={{ paddingTop: '15px', paddingBottom: '15px', borderBottom: '0.800000011920929px dashed #C7C7C7;' }}>
							<Text style={{ fontSize: '13px', color: '#161616' }}>Payment method</Text>
							<Text style={{ color: '#606060', marginTop: '7px', fontSize: '11px' }}>{paymentType === 1 ? 'Cash' : (paymentType === 2 ? 'Card' : 'Wallet')}</Text>

						</View>
						<View style={{ paddingTop: '15px', paddingBottom: '15px', borderBottom: '0.800000011920929px dashed #C7C7C7;' }}>
							<Text style={{ fontSize: '13px', color: '#161616' }}>Total working hours</Text>
							{
								orderDetails && orderDetails.length > 0 && orderDetails.map(function (item, index) {
									let workedDuration = 0;
									if (pricingType === 'hourly') {
										workedDuration = item.workedDuration > item.minimumHours ? (workTimeConversion(item.workedDuration)) : (item.minimumHours > 1 ? item.minimumHours + ' hrs' : item.minimumHours + ' hr')
									} else {
										workedDuration = workTimeConversion(item.workedDuration)
									}
									return (
										<View>
											<Text style={{ color: '#606060', marginTop: '7px', fontSize: '11px' }}>{item.name}: {workedDuration}</Text>
										</View>
									)
								})
							}

						</View>
						<View style={{ border: '1px solid #E6E6E6', borderRadius: '10px', width: '400px', padding: '12px', margin: '20px auto 0' }}>
							<View style={{ fontSize: '16px', color: '#161616', paddingBottom: '10px', borderBottom: '1px solid #E6E6E6' }}>
								<Text>Payment Details</Text>
							</View>
							<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '12px', color: '#161616', paddingTop: '12px' }}>
								<Text style={{ width: '65%' }}>{categoryName}</Text>
								<Text style={{ width: '35%', textAlign: 'right', paddingLeft: '10px' }}><CurrencyView showStatic={true} amount={subTotal} currency={userCurrency} /> </Text>
							</View>

							{
								orderDetails && orderDetails.length > 0 && orderDetails.map(function (item, index) {
									let quantity = 0;
									if (pricingType === 'hourly') {
										quantity = item.workedDuration > item.minimumHours ? item.workedDuration : item.minimumHours
									} else {
										quantity = item.quantity
									}
									return (
										<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '12px', color: '#A19F9B', paddingTop: '7px' }}>
											<Text style={{ width: '65%' }}>{item.name} x {quantity} {pricingType === 'fixed' ? (' Qty') : (quantity > 1 ? ' hrs' : 'hr')} </Text>
											<Text style={{ width: '35%', textAlign: 'right', paddingLeft: '10px' }}><CurrencyView showStatic={true} amount={item.total} currency={userCurrency} subIcon={true} /> </Text>
										</View>
									)
								})
							}

							{travellingPrice > 0 && <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '12px', color: '#161616', paddingTop: '12px' }}>
								<Text style={{ width: '65%' }}>Visit fee  </Text>
								<Text style={{ width: '35%', textAlign: 'right', paddingLeft: '10px' }}><CurrencyView showStatic={true} amount={travellingPrice} currency={userCurrency} /> </Text>
							</View>}

							{userServiceFee > 0 && <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '12px', color: '#161616', paddingTop: '8px' }}>
								<Text style={{ width: '65%' }}>Service fee  </Text>
								<Text style={{ width: '35%', textAlign: 'right', paddingLeft: '10px' }}> <CurrencyView showStatic={true} amount={userServiceFee} currency={userCurrency} /> </Text>
							</View>}

							{discountAmount > 0 && <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '12px', color: '#161616', paddingTop: '8px' }}>
								<Text style={{ width: '65%' }}>Coupon discount </Text>
								<Text style={{ width: '35%', textAlign: 'right', paddingLeft: '10px' }}>-<CurrencyView showStatic={true} amount={discountAmount} currency={userCurrency} /> </Text>
							</View>}

							{additionalFee > 0 && <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '12px', color: '#161616', paddingTop: '8px' }}>
								<Text style={{ width: '65%' }}>Additional charge </Text>
								<Text style={{ width: '35%', textAlign: 'right', paddingLeft: '10px' }}><CurrencyView showStatic={true} amount={additionalFee} currency={userCurrency} /> </Text>
							</View>}
							{
								tipsAmount > 0 && <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '12px', color: '#161616', paddingTop: '8px' }}>
									<Text style={{ width: '65%' }}>Tips given </Text>
									<Text style={{ width: '35%', textAlign: 'right', paddingLeft: '10px' }}><CurrencyView showStatic={true} amount={tipsAmount} currency={userCurrency} /> </Text>
								</View>
							}
							{<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: '14px', color: '#161616', paddingTop: '8px', borderTop: '1px solid #E6E6E6', marginTop: '8px' }}>
								<Text>Total</Text>
								<Text><CurrencyView showStatic={true} amount={userPayableFare} currency={userCurrency} /> </Text>
							</View>}
						</View>

						<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around', marginTop: '30px', color: '#D9D6BA', fontSize: '16px' }}>
							<Text>{siteName}</Text>
						</View>

					</View>
				</Page>
			</Document >
		)
	}
};

export default UserPdfDocument;