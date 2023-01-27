import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, FormControl } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CustomPagination from '../../CustomPagination';
import CurrencyConverter from '../../CurrencyConverter';
import Loader from '../../../components/Common/Loader';
import Link from '../../Link/Link';

import s from './AutoPayout.css';
import bt from '../../../components/commonStyle.css';

import { updatePayoutStatus } from '../../../actions/siteadmin/Payout/updatePayout';
import { updateCashPayout } from '../../../actions/siteadmin/Payout/updateCashPayout';
import ExportImage from '../../../../public/Icons/export.png';
import debounce from '../../../helpers/debounce';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import messages from '../../../locale/messages';
export class AutoPayoutList extends Component {
	static propTypes = {
		getPayoutData: PropTypes.object,
		updatePayoutStatus: PropTypes.any.isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 1,
		}
		this.paginationData = this.paginationData.bind(this);
		this.holdPayout = this.holdPayout.bind(this);
		this.cashPayout = this.cashPayout.bind(this);
		this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this), 250);
	}
	handleKeywordSearch(searchList) {
		const { getPayoutData: { refetch } } = this.props
		let variables = {
			currentPage: 1,
			searchList: searchList
		}
		this.setState(variables)
		refetch(variables)
	}
	paginationData(currentPage) {
		const { getPayoutData: { refetch } } = this.props;
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}
	cashPayout(id, value, currentPage) {
		const { updateCashPayout, getPayoutData: { refetch } } = this.props;

		let payoutStatus = value == 'true' ? true : false;
		updateCashPayout(id, payoutStatus, currentPage)
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}
	holdPayout(e, id, currentPage) {
		const { updatePayoutStatus, getPayoutData: { refetch } } = this.props;
		let isBanStatus = (e.target.value);
		if (isBanStatus == "true" || isBanStatus == "false") {
			isBanStatus = (isBanStatus == "true") ? true : false;
			updatePayoutStatus(id, isBanStatus);
		}
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}
	render() {
		const { getPayoutData, getPayoutData: { getPayoutList }, loading } = this.props;
		const { currentPage, searchList } = this.state;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx(s.widthInner, 'whiteDropdown')}>
				<div className={s.exportDisplay}>
					<div className={cx(s.searchInput, 'searchInputRTL')}>
						<FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleKeywordSearch(e.target && e.target.value)} className={bt.formControlInput} />
					</div>
					<div className={cx(s.exportTextSection, 'textAlignLeftRTL', 'textAlignRightMbRTL')}>
						{
							getPayoutData && getPayoutData.getPayoutList && getPayoutData.getPayoutList.results && getPayoutData.getPayoutList.results.length > 0 && <a
								href={`/export-admin-data?type=payout&keyword=${searchList ? searchList : ''}`}
								className={cx('pull-right', s.exportText)}>
								<span className={cx(s.vtrMiddle, s.exportText, 'exportTextRTL')}><FormattedMessage {...messages.exportDataIntoCSV} /></span>
								<span className={s.vtrTextBottom}>
									<img src={ExportImage} className={s.exportImg} />
								</span>
							</a>
						}
					</div>
				</div>

				{
					loading && <div>
						<Loader type="circle" />
					</div>
				}
				{!loading &&
					<div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
						<Table className="table">
							<thead>
								<tr>
									<th scope="col"><FormattedMessage {...messages.id} /></th>
									<th scope="col"><FormattedMessage {...messages.partnerName} /></th>
									<th scope="col"><FormattedMessage {...messages.email} /></th>
									<th scope="col"><FormattedMessage {...messages.payoutAmount} /></th>
									<th scope="col"><FormattedMessage {...messages.payoutStatus} /></th>
									<th scope="col"><FormattedMessage {...messages.action} /></th>
									<th scope="col"><FormattedMessage {...messages.holdPayout} /></th>
									<th scope="col"><FormattedMessage {...messages.details} /></th>
								</tr>
							</thead>
							<tbody>
								{
									getPayoutData && getPayoutData.getPayoutList && getPayoutData.getPayoutList.results && getPayoutData.getPayoutList.results.length > 0 && getPayoutData.getPayoutList.results.map((item, index) => {
										return (
											<tr key={index}>
												<td data-label={formatMessage(messages.id)}>{item.id}</td>
												<td data-label={formatMessage(messages.partnerName)}>{item && item.partnerDetails && capitalizeFirstLetter(item.partnerDetails.firstName)}</td>
												<td data-label={formatMessage(messages.email)}>{item && item.partnerDetails && item.partnerDetails.userData && item.partnerDetails.userData.email}</td>
												<td data-label={formatMessage(messages.payoutAmount)}><CurrencyConverter from={item.currency} amount={item.partnerTotalFare} /></td>
												<td data-label={formatMessage(messages.payoutStatus)}>{(item.paymentType === 1) ? formatMessage(messages['processedCash']) : (item.isPayoutPaid && item.isPayoutPaid == true) ? formatMessage(messages['completed']) : formatMessage(messages['pending'])}</td>
												<td data-label={formatMessage(messages.action)}>{(item.paymentType === 1) ? (
													<select value={item.isPayoutPaid} onChange={(e) => { this.cashPayout(item.id, e.target.value, currentPage) }} className={bt.selectInput}>
														<option value={true}>{formatMessage(messages.paid)}</option>
														<option value={false}>{formatMessage(messages.unpaid)}</option>
													</select>
												) : formatMessage(messages.notRequiredMessage)}</td>
												{item.isPayoutPaid == '1' ? <td data-label={formatMessage(messages.holdPayout)}>{formatMessage(messages.notRequiredMessage)}</td> :
													<td data-label={formatMessage(messages.holdPayout)}>
														<select value={item.isBanStatus} onChange={(e) => { this.holdPayout(e, item.id, currentPage) }} className={bt.selectInput}>
															<option value={true}>{formatMessage(messages.yes)}</option>
															<option value={false}>{formatMessage(messages.no)}</option>
														</select>
													</td>
												}
												<td data-label={formatMessage(messages.details)}><Link to={'/siteadmin/payout/view/' + item.id}><FormattedMessage {...messages.viewJob} /></Link></td>
											</tr>
										)
									})
								}
								{
									!loading && getPayoutData && getPayoutData.getPayoutList && getPayoutData.getPayoutList.results && getPayoutData.getPayoutList.results.length == 0 && (
										<tr>
											<td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
										</tr>
									)
								}
							</tbody>
						</Table>
					</div>
				}
				{
					getPayoutData && getPayoutData.getPayoutList && getPayoutData.getPayoutList.results && getPayoutData.getPayoutList.results.length > 0
					&& <div className={cx(bt.space5, bt.spaceTop5)}>
						<CustomPagination
							total={getPayoutData.getPayoutList.count}
							currentPage={currentPage}
							defaultCurrent={1}
							defaultPageSize={10}
							change={this.paginationData}
							paginationLabel={formatMessage(messages.partnerPayout)}
						/>
					</div>
				}
			</div>
		)
	}
}
const mapDispatch = {
	updatePayoutStatus,
	updateCashPayout
};
const mapState = (state) => ({
	loading: state.intl.loading
});
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AutoPayoutList)));

