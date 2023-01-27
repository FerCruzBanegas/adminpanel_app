import React from 'react';
import Layout from '../layouts/Layout';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import CurrencyView from '../modules/CurrencyView';
import { getDateUsingTimeZone, getTimeZone } from '../helpers/getDateUsingTimeZone';
import { api } from '../../../config';

class UserReceipt extends React.Component {

	render() {
		const textStyle = {
			color: '#484848',
			backgroundColor: '#ffffff',
			fontFamily: 'Arial',
			fontSize: '16px'
		};
		const heading = {
			fontSize: '26px',
			color: '#161616'
		}
		const subHeading = {
			fontSize: '18px',
			color: '#161616'
		}
		const boxBorder = {
			border: '1px solid #E6E6E6',
			borderRadius: '10px',
			textAlign: 'left'
		}
		const boxHeader = {
			padding: '26px 26px 20px',
			color: '#161616',
			fontSize: '16px',
			fontWeight: '600'
		}
		const innerPadding = {
			padding: '20px 26px'
		}
		const leftAlign = {
			float: 'left',
			width: '50%',
			textAlign: 'left',
			color: '#161616',
		}
		const rightAlign = {
			float: 'right',
			width: '50%',
			textAlign: 'right',
			color: '#161616',
		}
		const leftAlignInner = {
			fontSize: '14px',
			color: '#A19F9B',
			float: 'left',
			width: '50%',
			textAlign: 'left',
		}
		const rightAlignInner = {
			fontSize: '14px',
			color: '#A19F9B',
			float: 'right',
			width: '50%',
			textAlign: 'right',
		}
		const clearFix = {
			clear: 'both'
		}
		const borderTop = {
			borderTop: '1px solid #E6E6E6',
			padding: '20px 0px 0px'
		}
		const dateCss = {
			color: '#161616',
			fontSize: '12px'
		}
		const bgColor = {
			backgroundColor: '#FFF1D5',
			padding: '36px 36px 24px'
		}
		const innerBox = {
			padding: '28px 36px 36px 36px',
			backgroundColor: '#ffffff'
		}
		const headBorder = {
			borderTop: '1px solid #e6e6e6',
			margin: '0px 26px'
		}
		const subPadding = {
			paddingTop: '6px'
		}
		const siteNameCss = {
			color: '#7A5100',
			fontSize: '14px'
		}

		const { content: { logo, siteName } } = this.props;
		const { priceDetails: { userDetails, subTotal, userCurrency, orderDetails, userServiceFee, travellingPrice, additionalFee, discountAmount, userPayableFare, pricingType, tipsAmount, categoryName, bookingId, partnerDetails, userCountry, date } } = this.props;

		return (
			<Layout>
				{/* <Header color="#FF5A5F" backgroundColor="#ffffff" /> */}
				<Body textStyle={textStyle}>
					<div style={bgColor}>
						<div style={siteNameCss}>{siteName}</div>
						<EmptySpace height={15} />
						<div style={heading}>
							<div>Thanks for your request, <span style={{ textTransform: 'capitalize' }}>{userDetails.firstName}</span></div>
							<div>We’re glad to have you as our valuable customer!</div>
						</div>
						<EmptySpace height={20} />
						<div style={heading}>
							<span style={leftAlign}>
								<div>ID: #{bookingId}</div>
								<EmptySpace height={8} />
								<div style={dateCss}>
									{getDateUsingTimeZone(userCountry, date)}
								</div>
								<div style={dateCss}>
									{getTimeZone(userCountry)}
								</div>
							</span>
							<span style={rightAlign}><img src={api.apiEndpoint + "/images/logo/" + logo} style={{ width: '68px' }} /></span>
							<div style={clearFix}></div>
						</div>
					</div>
					<div style={innerBox}>
						<div style={subHeading}>
							Total amount <CurrencyView amount={userPayableFare} currency={userCurrency} /> for this job done by <span style={{ textTransform: 'capitalize' }}>{partnerDetails.firstName}</span>!
						</div>
						<EmptySpace height={25} />
						<div style={boxBorder}>
							<div style={boxHeader}>
								Billing Details:
							</div>
							<div style={headBorder}></div>
							<div style={innerPadding}>
								<div>
									<span style={leftAlign}>{categoryName}</span>
									<span style={rightAlign}><CurrencyView amount={subTotal} currency={userCurrency} /></span>
								</div>

								{
									orderDetails && orderDetails.length > 0 && orderDetails.map(function (item, index) {
										let quantity = 0;
										if (pricingType === 'hourly') {
											quantity = item.workedDuration > item.minimumHours ? item.workedDuration : item.minimumHours
										} else {
											quantity = item.quantity
										}
										return (
											<div key={index}>
												<div style={subPadding}>
													<span style={leftAlignInner}>{item.name} x {quantity} {pricingType === 'fixed' ? (' Qty') : (quantity > 1 ? ' hrs' : 'hr')} </span>
													<span style={rightAlignInner}><CurrencyView amount={item.total} currency={userCurrency} /></span>
												</div>
												<div style={clearFix}></div>
											</div>
										)
									})
								}

								{travellingPrice > 0 &&
									<div>
										<EmptySpace height={14} />
										<div>
											<span style={leftAlign}>Visit fee</span>
											<span style={rightAlign}><CurrencyView amount={travellingPrice} currency={userCurrency} /></span>
										</div>
									</div>
								}

								{userServiceFee > 0 &&
									<div>
										<EmptySpace height={14} />
										<div>
											<span style={leftAlign}>Service fee </span>
											<span style={rightAlign}> <CurrencyView amount={userServiceFee} currency={userCurrency} /></span>
										</div>
									</div>
								}
								{discountAmount > 0 &&
									<div>
										<EmptySpace height={14} />
										<div>
											<span style={leftAlign}>Coupon discount  - </span>
											<span style={rightAlign}><CurrencyView amount={discountAmount} currency={userCurrency} /></span>
										</div>
									</div>
								}

								{additionalFee > 0 &&
									<div>
										<EmptySpace height={14} />
										<div>
											<span style={leftAlign}>Additional charge </span>
											<span style={rightAlign}> <CurrencyView amount={additionalFee} currency={userCurrency} /></span>
										</div>
									</div>
								}

								{tipsAmount > 0 &&
									<div>
										<EmptySpace height={14} />
										<div>
											<span style={leftAlign}>Tips given</span>
											<span style={rightAlign}> <CurrencyView amount={tipsAmount} currency={userCurrency} /></span>
										</div>
									</div>
								}
								<EmptySpace height={15} />
								<div style={clearFix}></div>
								<div style={borderTop}>
									<span style={leftAlign}>Total amount</span>
									<span style={rightAlign}><CurrencyView amount={userPayableFare} currency={userCurrency} /></span>
								</div>
								<div style={clearFix}></div>
							</div>
						</div>
					</div>
				</Body>
				<Footer siteName={siteName} />
			</Layout>
		);
	}

}

export default UserReceipt;