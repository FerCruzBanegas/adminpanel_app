import React, { Component } from 'react'
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
	Accordion,
	Card,
	Tooltip,
	OverlayTrigger,
	Container
} from 'react-bootstrap';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import * as FontAwesome from 'react-icons/lib/fa';

import CurrencyCoverter from '../CurrencyConverter';
import Link from '../Link';
import ImageSlider from '../SiteAdmin/ImageSlider';
import ViewScheduleBookingHistory from './ViewScheduleBookingHistory';

import s from './ViewBookingDetails.css';
import bt from '../../components/commonStyle.css';

import messages from '../../locale/messages';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirst';

import { openCancelBookingModal, openEditBookingModal } from '../../actions/siteadmin/modalActions';
import { openExactImageLightBox, closeImageLightBox } from '../../actions/siteadmin/ImageLightBox';

//images
import inprogress from '../../../public/Icons/inprogress.png';
import completed from '../../../public/Icons/completed.png';
import cancelIcon from '../../../public/Icons/cancelIcon.png';
import defaultImage from '../../../public/static/defaultImage.png';
import startIcon from '../../../public/Icons/startIcon.svg';
import { api, subCategoryUploadDir, reviewImageUploadDir } from '../../config';
import pauseIcon from '../../../public/Icons/pauseIcon.svg';
import breakIcon from '../../../public/Icons/breakIcon.svg';
import playIcon from '../../../public/Icons/playIcon.svg';
import stopIcon from '../../../public/Icons/stopIcon.svg';
import Faq from '../../../public/Icons/question.svg';


class ViewBookingDetails extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}

	static defaultProps = {
		locale: "en-US",
		imageLightBox: false
	}

	constructor(props) {
		super(props);
		this.state = {
			sources: [],
			collapseID: [],
			collapseUser: 0,
			collapsePartner: 0,
			loading: false
		}
		this.renderAmountInformation = this.renderAmountInformation.bind(this);
		this.renderInformation = this.renderInformation.bind(this);
		this.isValueDefined = this.isValueDefined.bind(this);
		this.toggleCollapse = this.toggleCollapse.bind(this);
		this.toggleCollapseUser = this.toggleCollapseUser.bind(this);
		this.printRef = null;
	}

	print() {
		window.print();
	}

	componentDidMount() {
		const { data } = this.props;
		let sources = [];
		data.reviewImage && data.reviewImage.length > 0 && data.reviewImage.map((item, key) => {
			sources.push(api.apiEndpoint + reviewImageUploadDir + item.imageName);
		});
		this.setState({ sources });
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { data } = nextProps;
		let sources = [];
		data.reviewImage && data.reviewImage.length > 0 && data.reviewImage.map((item, key) => {
			sources.push(api.apiEndpoint + reviewImageUploadDir + item.imageName);
		});
		this.setState({ sources });
	}


	isValueDefined(value) {
		if (value !== null && value !== undefined && value !== '') {
			return true;
		}
		return false;
	}

	renderLink = (action) => action.messageKey && action.show && (
		<a onClick={action.handleClick} className={cx(s.addOrChangeBtn, 'floatLeftRTL')}>
			{messages[action.messageKey] ? this.props.intl.formatMessage(messages[action.messageKey]) : action.messageKey}
		</a>
	);


	renderAmountInformation(label, amount, currency, isMinus, isBold, afterContent, toolTipText) {
		if (label && this.isValueDefined(amount) && currency) {

			function LinkWithTooltip({ id, children, href, tooltip }) {
				return (
					<OverlayTrigger
						overlay={<Tooltip className={s.tooltip} id={id}>{tooltip}</Tooltip>}
						placement="top"
						delayShow={300}
						delayHide={150}
					>
						{children}
					</OverlayTrigger>
				);
			}

			return (
				<tr>
					{!isBold && <td>
						{label}
						{
							toolTipText &&
							<LinkWithTooltip
								tooltip={toolTipText}
								id="tooltip-1"
							>
								<img src={Faq} className={cx(s.faqImage, 'faqImageRTL', 'hidden-print')} />
							</LinkWithTooltip>
						}
					</td>}
					{
						!isBold && <td colSpan="4">
							{isMinus ? '-' : ''}
							<CurrencyCoverter from={currency} amount={amount} />
							{afterContent ? ` (${afterContent})` : ''}
						</td>
					}
					{isBold && <td><b>{label}</b></td>}
					{
						isBold && <td colSpan="4">
							<b>
								{isMinus ? '-' : ''}
								<CurrencyCoverter from={currency} amount={amount} />
								{afterContent ? `(${afterContent})` : ''}
							</b>
						</td>
					}
				</tr>
			);
		}
	}

	renderInformation(label, information, action = {}) {
		if (label && information) {
			return (
				<tr>
					<td>{label}</td>
					<td colSpan="2">
						{information}
					</td>
					<td className={s.addChange}>
						{this.renderLink(action)}
					</td>
				</tr>
			);
		}
	}

	toggleCollapse(id1) {
		const { collapseID } = this.state;
		const index = collapseID.indexOf(id1);
		if (index > -1) {
			collapseID.splice(index, 1);
			this.setState({ collapseID });
		} else {
			collapseID.push(id1);
			this.setState({ collapseID });
		}
	}

	toggleCollapseUser(type) {
		if (type == 1) {
			this.setState({ collapseUser: !this.state.collapseUser });
		} else if (type == 2) {
			this.setState({ collapsePartner: !this.state.collapsePartner });
		}
	}

	render() {
		const { title, data, locale, from, openExactImageLightBox, closeImageLightBox, imageLightBox, siteName } = this.props;
		const { formatMessage } = this.props.intl;
		const { sources, collapseID, collapsePartner, collapseUser, loading } = this.state;

		let link = '/siteadmin/' + from;

		let currency = data && data.currency;
		let promoCode, earnings = 0, platformEarnings = 0, offeredEarnings = 0;

		let userTotalFare = data && data.userPayableFare;
		let partnerTotalFare = data && data.partnerTotalFare;

		if (data && data.isTipGiven && data.tipsAmount > 0) { // If user gives tips to the partner
			partnerTotalFare = data.tipsPartnerTotalFare || partnerTotalFare;
			if (data.discountAmount > 0) {
				promoCode = data.promoCode && data.promoCode.code;
			}
		} else if (data && data.discountAmount > 0) { // If user applied the promo code
			promoCode = data.promoCode && data.promoCode.code;
		}

		if (data && this.isValueDefined(data.userServiceFee) && this.isValueDefined(data.partnerServiceFee)) {
			// Platform Earnings
			earnings = Number(data.userServiceFee) + Number(data.partnerServiceFee);
			platformEarnings = earnings;
			if (data.discountAmount > 0) {
				platformEarnings = earnings > Number(data.discountAmount) ? earnings - Number(data.discountAmount) : 0;
				offeredEarnings = earnings < Number(data.discountAmount) ? (Number(data.discountAmount) - Number(earnings)) : 0;
			}
		}

		let itemTotal = 0;
		data && data.orderItemsList && data.orderItemsList.length > 0 && data.orderItemsList.map((item, index) => {
			let fare = 0;
			if (data.pricingType === 'hourly') {
				if (item.workedDuration > item.minimumHours) {
					fare = item.baseFare * item.workedDuration
				} else {
					fare = item.baseFare * item.minimumHours;
				}
			} else {
				fare = item.baseFare * item.totalQuantity
			}
			itemTotal = itemTotal + Number(fare.toFixed(2));
		});

		let status0 = inprogress, status1 = inprogress, status2 = inprogress, status3 = inprogress, status4 = inprogress, status5 = inprogress, status6 = inprogress, status7 = inprogress, status8 = inprogress;
		let progress0 = 0, progress1 = 0, progress2 = 0, progress3 = 0, progress4 = 0, progress5 = 0, progress6 = 0, progress7 = 0, progress8 = 0;
		let date0, date1, date2, date3, date4, date5, date6, date7, date8;
		if (data && data.bookingHistory && data.bookingHistory.length > 0) {
			data.bookingHistory.map((item, index) => {
				if (item.status === 'scheduled') {
					status0 = completed;
					progress0 = 1;
					date0 = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a");
				}
				if (item.status === 'created') {
					status1 = completed;
					progress1 = 1;
					date1 = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a");
				}
				if (item.status === 'approved') {
					status2 = completed;
					progress2 = 1;
					date2 = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a");

				}
				if (item.status === 'arrived') {
					status3 = completed;
					progress3 = 1;
					date3 = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a");

				}
				if (item.status === 'reviewed') {
					status4 = completed;
					progress4 = 1;
					date4 = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a");

				}
				if (item.status === 'cancelledByPartner' || item.status === 'cancelledByUser') {
					status5 = cancelIcon;
					progress5 = 1;
					date5 = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a");

				}
				if (item.status === 'started') {
					status6 = completed;
					progress6 = 1;
					date6 = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a");

				}
				if (item.status === 'completed') {
					status7 = completed;
					progress7 = 1;
					date7 = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a");

				}
				if (item.status === 'declined') {
					status8 = cancelIcon;
					progress8 = 1;
					date8 = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a");
				}
			})
		}

		return (
			<div className={cx(s.pagecontentWrapper, s.widthInner, bt.space5)}>

				<div className={s.contentBox}>
					<div className={cx(s.displayBlock, bt.space2, bt.textAlignRight, 'textAlignLeftRTL', s.textAlignMb, bt.spaceTop5)}>
						<div className={s.disInline}>
							<ReactToPrint
								trigger={() => <span></span>}
								content={() => this.componentRef}
								ref={el => (this.printRef = el)} />
							{!loading && <Button onClick={() => {
								if (this.printRef) {
									this.setState({ loading: true });
									this.printRef.handlePrint();
									setTimeout(() => this.setState({ loading: false }), 1);
								}
							}} className={cx(s.button, s.btnPrimaryBorder, 'hidden-print', bt.btnPrimary)}><FormattedMessage {...messages.receipt} /></Button>}
						</div>
						<Link to={link} className={cx('pull-right', s.backBtn, s.backBtn, bt.btnSecondary, 'viewBookingBackRTL')}>
							<FormattedMessage {...messages.goBack} />
						</Link>
					</div>

					<Container fluid ref={el => (this.componentRef = el)}>

						<div className='printOnly'><h1>{siteName}</h1></div>
						<div>
							<h1 className={cx(s.headerTitle, 'textAlignRightRTL')}>{title}</h1>
						</div>
						<div className={cx('table-responsive', 'bookingCollapse')}>
							<Table>
								<tbody>
									{
										data && data.id && this.renderInformation(formatMessage(messages.bookingId), `#${data.id}`)
									}
									{
										data && data.userDetails && data.userDetails.firstName && this.renderInformation(formatMessage(messages.userName), capitalizeFirstLetter(data.userDetails.firstName))
									}
									{
										data && data.userDetails && data.userDetails.userData && data.userDetails.userData.email && this.renderInformation(formatMessage(messages.userEmail), data.userDetails.userData.email)
									}
									{
										data && data.userDetails && data.userDetails.userData && data.userDetails.userData.email && this.renderInformation(formatMessage(messages.userNumber), (data.userDetails.userData.phoneDialCode + ' ' + data.userDetails.userData.phoneNumber))
									}
									{
										data && data.partnerDetails && data.partnerDetails.firstName && this.renderInformation(formatMessage(messages.partnerName), capitalizeFirstLetter(data.partnerDetails.firstName))
									}
									{
										data && data.partnerDetails && data.partnerDetails.userData && data.partnerDetails.userData.email && this.renderInformation(formatMessage(messages.partnerEmail), data.partnerDetails.userData.email)
									}
									{
										data && data.partnerDetails && data.partnerDetails.userData && data.partnerDetails.userData.email && this.renderInformation(formatMessage(messages.partnerNumber), (data.partnerDetails.userData.phoneDialCode + ' ' + data.partnerDetails.userData.phoneNumber))
									}
									{
										data && data.userLocation && this.renderInformation(formatMessage(messages.jobLocation), data.userLocation)
									}
									{
										data && data.status && this.renderInformation(formatMessage(messages.bookingStatus), data.status && messages[data.status] ? formatMessage(messages[data.status]) : data.status)
									}
									{/* Schedule Booking */}
									{
										data && data.bookingType === 2 && data.scheduleBooking && data.scheduleBooking.scheduleFrom && this.renderInformation(formatMessage(messages.scheduledFrom), moment(data.scheduleBooking.scheduleFrom).format('DD-MM-YYYY HH:mm:ss'))
									}
									{
										data && data.bookingType === 2 && data.scheduleBooking && data.scheduleBooking.scheduleTo && this.renderInformation(formatMessage(messages.scheduledTo), moment(data.scheduleBooking.scheduleTo).format('DD-MM-YYYY HH:mm:ss'))
									}
									{
										data && data.bookingType === 2 && <tr>
											<td colSpan={4} className={cx(s.removedBorderAndPadding, 'scheduleBookingAccordation')}><ViewScheduleBookingHistory data={data.scheduleBookingHistory} /></td>
										</tr>
									}
									{
										data && data.paymentType && this.renderInformation(formatMessage(messages.paymentMethod), data.paymentType && data.paymentType === 1 ? formatMessage(messages.cash) : (data.paymentType === 2 ? formatMessage(messages.card) : formatMessage(messages.wallet)))
									}

									{/* Job details */}

									<tr>
										<td colSpan={4}>
											<b><FormattedMessage {...messages.jobDetails} />:</b>
										</td>
									</tr>
									<div className={s.timerGrid}>
										{
											data && data.orderItemsList && data.orderItemsList.length > 0 && data.orderItemsList.map((item, index) => {
												return (
													<div>

														<div className={'jobDetailAccordion'}>
															<Accordion defaultActiveKey="1" onClick={() => this.toggleCollapse(index)}>
																<Card>
																	<Card.Header>
																		<span>
																			{
																				data.pricingType === 'fixed' && <span className={s.displayFlexTimeLine}>
																					<div style={{ backgroundImage: `url(${api.apiEndpoint + subCategoryUploadDir + item.subCategoryDetails.image})` }} className={s.timeLinePhoto} />


																					<span className={s.name}>
																						<div>
																							{item.subCategoryDetails && item.subCategoryDetails.name}
																						</div>
																						<div className={s.pricingCss}><CurrencyCoverter from={item.currency} amount={item.baseFare} /> {data.pricingType === 'fixed' ? '/ Qty' : '/ hr'}</div>
																					</span>
																				</span>
																			}
																			{data.pricingType === 'hourly' && <Accordion.Toggle as={Button} variant="link" eventKey="0">
																				<span className={s.displayFlexTimeLine}>
																					<div style={{ backgroundImage: `url(${api.apiEndpoint + subCategoryUploadDir + item.subCategoryDetails.image})` }} className={s.timeLinePhoto} />

																					<span className={s.name}>
																						<div>
																							{item.subCategoryDetails && item.subCategoryDetails.name}
																						</div>
																						<div className={s.pricingCss}><CurrencyCoverter from={item.currency} amount={item.baseFare} /> {data.pricingType === 'fixed' ? '/ Qty' : '/ hr'}</div>
																					</span>
																				</span>
																				{collapseID.includes(index) ? <FontAwesome.FaAngleUp className={s.downIconCss} /> : <FontAwesome.FaAngleDown className={s.downIconCss} />}
																			</Accordion.Toggle>}
																		</span>
																	</Card.Header>
																	<Accordion.Collapse eventKey="0">
																		<Card.Body>

																			{
																				item && item.workLogHistory && item.workLogHistory.length > 0 && item.workLogHistory.map((value, index2) => {
																					return (
																						<div className={s.timeGrid}>
																							<div>
																								<span><img src={index2 == 0 ? startIcon : playIcon} /></span>
																								<span className={s.timeCss}>{moment(value.startedAt).format('hh:mm A')}</span>
																							</div>
																							<div>
																								<span><img src={index2 == item.workLogHistory.length - 1 ? stopIcon : pauseIcon} /></span>
																								<span className={s.timeCss}>{moment(value.closedAt).format('hh:mm A')}</span>
																							</div>
																							<div>
																								<span><img src={breakIcon} /></span>
																								<span className={s.timeCss}>{value.totalWork}</span>
																							</div>
																						</div>
																					)
																				})
																			}
																			{item.workDuration && <div className={s.totalCss}>
																				{formatMessage(messages.totalWorkingHours)} {item.workDuration}
																			</div>}
																		</Card.Body>
																	</Accordion.Collapse>
																</Card>
															</Accordion>
														</div>
													</div>
												)
											})
										}
									</div>

									<tr>
										{
											data && data.reviewDescription && <td colSpan={4}>
												<b><FormattedMessage {...messages.jobDescription} /></b>
												<div className={cx(s.lineBreak, s.paddingTop)}>{data.reviewDescription}</div>
											</td>}

									</tr>

									{
										data && data.reviewImage && data.reviewImage.length > 0 && <td colSpan={4}>
											<div><b><FormattedMessage {...messages.jobPhoto} /></b></div>
											<div className={s.paddingTop}>
												<Row>
													{
														data && data.reviewImage && data.reviewImage.length > 0 && data.reviewImage.map((item, index) => {
															return (

																<Col lg={2} sm={12} xs={12}>
																	<div className={s.jobPhotos} onClick={() => openExactImageLightBox(index)} >
																		<div style={{ backgroundImage: `url(${api.apiEndpoint + reviewImageUploadDir + item.imageName})` }} className={s.photoBg} />
																	</div>
																</Col>

															)
														})
													}
												</Row>
											</div>
											<ImageSlider
												imageLightBox={imageLightBox}
												closeImageLightBox={closeImageLightBox}
												sources={sources}
											/>
										</td>
									}

									{/* Job Progress */}
									<tr>
										<td colSpan={4}>
											<b><FormattedMessage {...messages.jobProgress} />:</b>
											<div className={s.paddingTop}>
												{data && data.bookingType === 2 && <div className={cx(s.grid, { [s.completed]: progress0 })}>
													<div><img src={status0} className={s.iconWidth} /></div>
													<div>
														<div><FormattedMessage {...messages.requestScheduled} /></div>
														<div className={s.smallContent}>{date0}</div>
													</div>
												</div>}
												{data && data.bookingType === 1 && <div className={cx(s.grid, { [s.completed]: progress1 })}>
													<div><img src={status1} className={s.iconWidth} /></div>
													<div>
														<div><FormattedMessage {...messages.requestCreated} /></div>
														<div className={s.smallContent}>{date1}</div>
													</div>
												</div>}
												<div className={cx(s.grid, { [s.completed]: progress2 })}>
													<div><img src={status2} className={s.iconWidth} /></div>
													<div>
														<div><FormattedMessage {...messages.requestAccepted} /></div>
														<div className={s.smallContent}>{date2}</div>
													</div>
												</div>
												<div className={cx(s.grid, { [s.completed]: progress3 })}>
													<div><img src={status3} className={s.iconWidth} /></div>
													<div>
														<div><FormattedMessage {...messages.arrived} /></div>
														<div className={s.smallContent}>{date3}</div>
													</div>
												</div>
												<div className={cx(s.grid, { [s.completed]: progress4 })}>
													<div><img src={status4} className={s.iconWidth} /></div>
													<div>
														<div><FormattedMessage {...messages.requestReviewed} /></div>
														<div className={s.smallContent}>{date4}</div>
													</div>
												</div>
												{progress5 == 1 && <div className={cx(s.grid)}>
													<div><img src={status5} className={s.iconWidth} /></div>
													<div>
														<div><FormattedMessage {...messages.requestCancelled} /></div>
														<div className={s.smallContent}>{date5}</div>
													</div>
												</div>}
												<div className={cx(s.grid, { [s.completed]: progress6 })}>
													<div><img src={status6} className={s.iconWidth} /></div>
													<div>
														<div><FormattedMessage {...messages.jobStarted} /></div>
														<div className={s.smallContent}>{date6}</div>
													</div>
												</div>
												<div className={cx(s.grid, { [s.completed]: progress7 })}>
													<div><img src={status7} className={s.iconWidth} /></div>
													<div>
														<div><FormattedMessage {...messages.jobCompleted} /></div>
														<div className={s.smallContent}>{date7}</div>
													</div>
												</div>
												{progress8 == 1 && <div className={cx(s.grid)}>
													<div><img src={status8} className={s.iconWidth} /></div>
													<div>
														<div><FormattedMessage {...messages.requestDecline} /></div>
														<div className={s.smallContent}>{date8}</div>
													</div>
												</div>}
											</div>
										</td>
									</tr>


									{/* User Billing information */}
									<tr>
										<td colSpan={4}>
											<b><FormattedMessage {...messages.userBillingInformation} />:</b>
										</td>
									</tr>
									<tr>
										<div className='bookingAccordion'>
											<Accordion defaultActiveKey="0" >
												<Card>
													<Card.Header>
														<Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={() => this.toggleCollapseUser(1)}>
														<span>{data && data.categoryDetails ? data.categoryDetails.name : <FormattedMessage {...messages.itemTotal} />}</span>
															{!collapseUser ? <FontAwesome.FaAngleUp className={s.navigationIcon} /> : <FontAwesome.FaAngleDown className={s.navigationIcon} />}
														</Accordion.Toggle>

														{
															itemTotal > 0 && <div className={cx(s.tableGrid, 'tableGridCss')}>
																
																<span className={s.tablePadding}>
																	<CurrencyCoverter from={currency} amount={itemTotal} />
																</span>
															</div>
														}

													</Card.Header>
													<Accordion.Collapse eventKey="0">
														<Card.Body>{
															data && data.orderItemsList && data.orderItemsList.length > 0 && data.orderItemsList.map((item, index) => {
																let fare = 0;

																if (data.pricingType === 'hourly') {
																	if (item.workedDuration > item.minimumHours) {
																		fare = item.baseFare * item.workedDuration
																	} else {
																		fare = item.baseFare * item.minimumHours;
																	}
																} else {
																	fare = item.baseFare * item.totalQuantity
																}
																let quantity = 0;
																if (data.pricingType === 'hourly') {
																	quantity = item.workedDuration > item.minimumHours ? item.workedDuration : item.minimumHours
																} else {
																	quantity = item.totalQuantity
																}
																return (
																	<div key={index} className={cx(s.tableGrid, s.fontCss)}>
																		<span>{item.subCategoryDetails && item.subCategoryDetails.name} x {quantity}
																			{data.pricingType === 'fixed' ? (' Qty') : (quantity > 1 ? ' hrs' : 'hr')}</span>
																		<span className={s.tablePadding}><CurrencyCoverter from={currency} amount={fare} /></span>
																	</div>
																)
															})
														}</Card.Body>
													</Accordion.Collapse>
												</Card>
											</Accordion>
										</div>
									</tr>



									{
										data && String(data.travellingPrice) && Number(data.travellingPrice) > 0 && this.renderAmountInformation(formatMessage(messages.travelCharge), data.travellingPrice, currency)
									}
									{this.renderAmountInformation(formatMessage(messages.serviceFee), data.userServiceFee, currency)}
									{
										data && data.discountAmount > 0 && String(data.discountAmount) && this.renderAmountInformation(formatMessage(messages.userDiscount), data.discountAmount, currency, true, false, promoCode)
									}
									{
										data && String(data.additionalFee) && Number(data.additionalFee) > 0 && this.renderAmountInformation(formatMessage(messages.additionalFee), data.additionalFee, currency, false, false, null, data.additionalDescription)
									}
									{
										data && data.isTipGiven === true && String(data.tipsAmount) && this.renderAmountInformation(formatMessage(messages.tipsGivenToPartner), data.tipsAmount, currency)
									}
									{
										data && String(userTotalFare) && this.renderAmountInformation(formatMessage(messages.userPayableAmount), userTotalFare, currency, false, false)
									}

									{/* Partner Billing information */}
									<tr>
										<td colSpan={4}>
											<b><FormattedMessage {...messages.partnerBillingInformation} />:</b>
										</td>
									</tr>
									<tr>
										<div className='bookingAccordion'>
											<Accordion defaultActiveKey="0" >
												<Card>
													<Card.Header>
														<Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={() => this.toggleCollapseUser(2)}>
														<span>{data && data.categoryDetails ? data.categoryDetails.name : <FormattedMessage {...messages.itemTotal} />}</span>
															{!collapsePartner ? <FontAwesome.FaAngleUp className={s.navigationIcon} /> : <FontAwesome.FaAngleDown className={s.navigationIcon} />}
														</Accordion.Toggle>

														{
															itemTotal > 0 && <div className={s.tableGrid}>
																
																<span className={s.tablePadding}>
																	<CurrencyCoverter from={currency} amount={itemTotal} />
																</span>
															</div>
														}

													</Card.Header>
													<Accordion.Collapse eventKey="0">
														<Card.Body>{
															data && data.orderItemsList && data.orderItemsList.length > 0 && data.orderItemsList.map((item, index) => {
																let fare = 0;
																if (data.pricingType === 'hourly') {
																	if (item.workedDuration > item.minimumHours) {
																		fare = item.baseFare * item.workedDuration
																	} else {
																		fare = item.baseFare * item.minimumHours;
																	}
																} else {
																	fare = item.baseFare * item.totalQuantity
																}
																let quantity = 0;
																if (data.pricingType === 'hourly') {
																	quantity = item.workedDuration > item.minimumHours ? item.workedDuration : item.minimumHours
																} else {
																	quantity = item.totalQuantity
																}
																return (
																	<div key={index} className={cx(s.tableGrid, s.fontCss)}>
																		<span>{item.subCategoryDetails && item.subCategoryDetails.name} x {quantity}
																			{data.pricingType === 'fixed' ? (' Qty') : (quantity > 1 ? ' hrs' : 'hr')}
																		</span>
																		<span className={s.tablePadding}><CurrencyCoverter from={currency} amount={fare} /></span>
																	</div>
																)
															})
														}</Card.Body>
													</Accordion.Collapse>
												</Card>
											</Accordion>
										</div>
									</tr>

									{
										data && String(data.travellingPrice) && Number(data.travellingPrice) > 0 && this.renderAmountInformation(formatMessage(messages.travelCharge), data.travellingPrice, currency)
									}
									{this.renderAmountInformation(formatMessage(messages.serviceFee), data.partnerServiceFee, currency, true)}
									{
										data && String(data.additionalFee) && Number(data.additionalFee) > 0 && this.renderAmountInformation(formatMessage(messages.additionalFee), data.additionalFee, currency, false, false, null, data.additionalDescription)
									}
									{
										data && data.isTipGiven === true && String(data.tipsAmount) && this.renderAmountInformation(formatMessage(messages.tipsReceivedFromUser), data.tipsAmount, currency)
									}
									{
										data && String(partnerTotalFare) && this.renderAmountInformation(formatMessage(messages.earningsLabel), partnerTotalFare, currency, false, false)
									}

									{/* Platform Earnings */}
									<tr>
										<td colSpan={4}>
											<b><FormattedMessage {...messages.platformEarnings} />:</b>
										</td>
									</tr>
									{this.renderAmountInformation(formatMessage(messages.userServiceFee), data.userServiceFee, currency)}
									{this.renderAmountInformation(formatMessage(messages.partnerServiceFee), data.partnerServiceFee, currency)}
									{
										data && data.discountAmount > 0 && this.renderAmountInformation(formatMessage(messages.platformDiscount), data.discountAmount, currency, true, false, promoCode)
									}
									{this.renderAmountInformation(formatMessage(messages.earnings), platformEarnings, currency, false, false)}
									{
										this.isValueDefined(offeredEarnings) && offeredEarnings > 0 && this.renderAmountInformation(formatMessage(messages.platformOffered), offeredEarnings, currency, false, false)
									}
								</tbody>
							</Table>
						</div>
					</Container>
				</div>
			</div>
		)
	}
}
const mapState = state => ({
	locale: state.intl.locale,
	imageLightBox: state.adminModalStatus.imageLightBox,
	siteName: state.siteSettings.data.siteName,
});

const mapDispatch = {
	openCancelBookingModal,
	openEditBookingModal,
	openExactImageLightBox,
	closeImageLightBox,
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ViewBookingDetails)));