import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Row, Col, Container } from 'react-bootstrap';
import cx from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';

import CurrencyConverter from '../../CurrencyConverter';
import s from './AdminDashboard.css';
import messages from '../../../locale/messages';

//images
import userIcon from '../../../../public/Icons/automobile-with-wrench.svg';
import serviceIcon from '../../../../public/Icons/user.svg';
import bookingIcon from '../../../../public/Icons/bookingIcon.svg';
import moneyIcon from '../../../../public/Icons/money.svg';

export class AdminDashboard extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}

	render() {
		const { getDashboardCount, todayEarnings, weeklyEarnings, monthlyEarnings, totalEarnings } = this.props;
		let totalPartners = getDashboardCount && getDashboardCount.result && getDashboardCount.result.totalPartnersCount || 0;
		let todayPartners = getDashboardCount && getDashboardCount.result && getDashboardCount.result.todayPartnersCount || 0;
		let weekPartners = getDashboardCount && getDashboardCount.result && getDashboardCount.result.weekPartnersCount || 0;
		let monthPartners = getDashboardCount && getDashboardCount.result && getDashboardCount.result.monthPartnersCount || 0;
		let totalUsers = getDashboardCount && getDashboardCount.result && getDashboardCount.result.totalUsersCount || 0;
		let todayUsers = getDashboardCount && getDashboardCount.result && getDashboardCount.result.todayUsersCount || 0;
		let weekUsers = getDashboardCount && getDashboardCount.result && getDashboardCount.result.weekUsersCount || 0;
		let monthUsers = getDashboardCount && getDashboardCount.result && getDashboardCount.result.monthUsersCount || 0;
		let totalBookings = getDashboardCount && getDashboardCount.result && getDashboardCount.result.totalBookingsCount || 0;
		let todayBookings = getDashboardCount && getDashboardCount.result && getDashboardCount.result.todayBookingsCount || 0;
		let weekBookings = getDashboardCount && getDashboardCount.result && getDashboardCount.result.weekBookingsCount || 0;
		let monthBookings = getDashboardCount && getDashboardCount.result && getDashboardCount.result.monthBookingsCount || 0;
		let currency = getDashboardCount && getDashboardCount.result && getDashboardCount.result.currency;

		return (
			<Container fluid>
				<Row>
					<Col xl={4} lg={12} md={12} sm={12} xs={12}>
						<div className={s.box}>
							<div className={s.boxBg}>
								<div className={s.sectionOne}>
									<svg className={cx(s.overviewIcon)}>
										<use xlinkHref={serviceIcon + '#Layer_2'}></use>
									</svg>
									<h2 className={s.fontCss}><FormattedMessage {...messages.users} /></h2>
								</div>
								<div className={s.boxInner}>
									<div className={s.displayGrid}>
										<div>
											<div><FormattedMessage {...messages.today} /></div>
											<div className={s.priceCircle}>{todayUsers}</div>
										</div>
										<div>
											<div><FormattedMessage {...messages.weekly} /></div>
											<div className={s.priceCircle}>{weekUsers}</div>
										</div>
										<div>
											<div><FormattedMessage {...messages.montly} /></div>
											<div className={s.priceCircle}>{monthUsers}</div>
										</div>
									</div>

								</div>
							</div>
							<div className={s.totalCss}>
								<div className={s.displayTable}>
									<div className={s.displayTableRow}>
										<div className={cx(s.textCenterDashboard, 'textCenterDashboardRTL')}><FormattedMessage {...messages.overAll} /> - {totalUsers}</div>

									</div>
								</div>
							</div>
						</div>
					</Col>
					<Col xl={4} lg={12} md={12} sm={12} xs={12}>
						<div className={s.box}>
							<div className={s.boxBg}>
								<div className={s.sectionOne}>
									<svg className={cx(s.overviewIcon)}>
										<use xlinkHref={userIcon + '#Layer_1'}></use>
									</svg>
									<h2 className={s.fontCss}><FormattedMessage {...messages.partners} /></h2>
								</div>
								<div className={s.boxInner}>

									<div className={s.displayGrid}>
										<div>
											<div><FormattedMessage {...messages.today} /></div>
											<div className={s.priceCircle}>{todayPartners}</div>
										</div>
										<div>
											<div><FormattedMessage {...messages.weekly} /></div>
											<div className={s.priceCircle}>{weekPartners}</div>
										</div>
										<div>
											<div><FormattedMessage {...messages.montly} /></div>
											<div className={s.priceCircle}>{monthPartners}</div>
										</div>
									</div>

								</div>
							</div>
							<div className={s.totalCss}>
								<div className={s.displayTable}>
									<div className={s.displayTableRow}>
										<div className={cx(s.textCenterDashboard, 'textCenterDashboardRTL')}><FormattedMessage {...messages.overAll} /> - {totalPartners}</div>
									</div>
								</div>
							</div>
						</div>
					</Col>
					<Col xl={4} lg={12} md={12} sm={12} xs={12}>
						<div className={s.box}>
							<div className={s.boxBg}>
								<div className={s.sectionOne}>
									<svg className={cx(s.overviewIcon)}>
										<use xlinkHref={bookingIcon + '#Layer_3'}></use>
									</svg>
									<h2 className={s.fontCss}><FormattedMessage {...messages.bookings} /></h2>
								</div>
								<div className={s.boxInner}>

									<div className={s.displayGrid}>
										<div>
											<div><FormattedMessage {...messages.today} /></div>
											<div className={s.priceCircle}>{todayBookings}</div>
										</div>
										<div>
											<div><FormattedMessage {...messages.weekly} /></div>
											<div className={s.priceCircle}>{weekBookings}</div>
										</div>
										<div>
											<div><FormattedMessage {...messages.montly} /></div>
											<div className={s.priceCircle}>{monthBookings}</div>
										</div>
									</div>

								</div>
							</div>
							<div className={s.totalCss}>
								<div className={s.displayTable}>
									<div className={s.displayTableRow}>
										<div className={cx(s.textCenterDashboard, 'textCenterDashboardRTL')}><FormattedMessage {...messages.overAll} /> - {totalBookings}</div>
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
				<div className={s.earingSection}>
					<div className={s.box}>
						<div className={s.boxBg}>
							<div className={s.sectionOne}>
								<svg className={cx(s.overviewIcon)}>
									<use xlinkHref={moneyIcon + '#Layer_4'}></use>
								</svg>
								<h2 className={s.fontCss}><FormattedMessage {...messages.totalEarnings} /></h2>
							</div>
							<div className={s.boxInner}>

								<div className={s.displayGrid}>
									<div>
										<div><FormattedMessage {...messages.today} /></div>
										<div className={s.priceCircle}><CurrencyConverter from={currency} amount={todayEarnings} /></div>
									</div>
									<div>
										<div><FormattedMessage {...messages.weekly} /></div>
										<div className={s.priceCircle}><CurrencyConverter from={currency} amount={weeklyEarnings} /></div>
									</div>
									<div>
										<div><FormattedMessage {...messages.montly} /></div>
										<div className={s.priceCircle}><CurrencyConverter from={currency} amount={monthlyEarnings} /></div>
									</div>
								</div>

							</div>
						</div>
						<div className={s.totalCss}>
							<div className={cx(s.textCenterDashboard, 'textCenterDashboardRTL')}><FormattedMessage {...messages.overAll} /> - <CurrencyConverter from={currency} amount={totalEarnings} /></div>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {

}

export default injectIntl(withStyles(s)(connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)));