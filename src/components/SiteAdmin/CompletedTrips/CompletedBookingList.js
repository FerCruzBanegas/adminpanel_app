import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, FormControl } from 'react-bootstrap';
import cx from 'classnames';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';

import s from './BookingList.css';
import bt from '../../../components/commonStyle.css';

import CustomPagination from '../../CustomPagination';
import Loader from '../../../components/Common/Loader';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link/Link';

import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import ExportImage from '../../../../public/Icons/export.png';
import debounce from '../../../helpers/debounce';
import messages from '../../../locale/messages';

export class CompletedBookingList extends Component {
	static propTypes = {
		completedTrips: PropTypes.object,
	}
	constructor(props) {
		super(props)

		this.state = {
			currentPage: 1,
		}
		this.paginationData = this.paginationData.bind(this);
		this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this), 250);
	}
	handleKeywordSearch(searchList) {
		const { completedTrips: { refetch } } = this.props
		let variables = {
			currentPage: 1,
			searchList
		}
		this.setState(variables)
		refetch(variables)
	}
	paginationData(currentPage) {
		const { completedTrips: { refetch } } = this.props;
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}
	render() {
		const { completedTrips, completedTrips: { getCompletedBookings }, loading } = this.props;
		const { currentPage, searchList } = this.state;
		const { formatMessage } = this.props.intl;
		let status = ['completed'];
		return (
			<div className={s.widthInner}>
				<div className={s.exportDisplay}>
					<div className={cx(s.searchInput, 'searchInputRTL')}>
						<FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleKeywordSearch(e.target && e.target.value)} className={bt.formControlInput} />
					</div>
					<div className={cx(s.exportTextSection, 'textAlignLeftRTL', 'textAlignRightMbRTL')}>
						{
							completedTrips && completedTrips.getCompletedBookings && completedTrips.getCompletedBookings.results && completedTrips.getCompletedBookings.results.length > 0 && <a
								href={`/export-admin-data?type=jobs&status[0]=completed&keyword=${searchList ? searchList : ''}`}
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
									<th scope="col"><FormattedMessage {...messages.userName} /></th>
									<th scope="col"><FormattedMessage {...messages.partnerName} /></th>
									<th scope="col"><FormattedMessage {...messages.category} /></th>
									<th scope="col"><FormattedMessage {...messages.bookingStatus} /></th>
									<th scope="col"><FormattedMessage {...messages.totalFare} /></th>
									<th scope="col"><FormattedMessage {...messages.details} /></th>
									<th scope="col"><FormattedMessage {...messages.chatLabel} /></th>
								</tr>
							</thead>
							<tbody>
								{
									completedTrips && completedTrips.getCompletedBookings && completedTrips.getCompletedBookings.results && completedTrips.getCompletedBookings.results.length > 0 && completedTrips.getCompletedBookings.results.map((item, index) => {
										return (
											<tr key={index}>
												<td data-label={formatMessage(messages.id)}>{item.id}</td>
												<td data-label={formatMessage(messages.userName)}>{item && item.userDetails && capitalizeFirstLetter(item.userDetails.firstName)}</td>
												<td data-label={formatMessage(messages.partnerName)}>{item && item.partnerDetails && capitalizeFirstLetter(item.partnerDetails.firstName)}</td>
												<td data-label={formatMessage(messages.category)}>{item && item.categoryDetails && item.categoryDetails.name}</td>
												<td data-label={formatMessage(messages.bookingStatus)}>{item.status && messages[item.status] ? formatMessage(messages[item.status]) : item.status}</td>
												<td data-label={formatMessage(messages.totalFare)}><CurrencyConverter from={item.currency} amount={item.totalFare} /></td>
												<td data-label={formatMessage(messages.details)}><Link to={'/siteadmin/completed-jobs/view/' + item.id}><FormattedMessage {...messages.view} /></Link></td>
												<td data-label={formatMessage(messages.chatLabel)}>
													{item.messageData && item.messageData.threadItemsCount > 0 && <Link to={'/siteadmin/completed-jobs/chat-message/' + item.id}><FormattedMessage {...messages.view} /></Link>}
												</td>
											</tr>
										)
									})
								}
								{
									!loading && completedTrips && completedTrips.getCompletedBookings && completedTrips.getCompletedBookings.results && completedTrips.getCompletedBookings.results.length == 0 && (
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
					completedTrips && completedTrips.getCompletedBookings && completedTrips.getCompletedBookings.results && completedTrips.getCompletedBookings.results.length > 0
					&& <div className={cx(bt.space5, bt.spaceTop5)}>
						<CustomPagination
							total={completedTrips.getCompletedBookings.count}
							currentPage={currentPage}
							defaultCurrent={1}
							defaultPageSize={10}
							change={this.paginationData}
							paginationLabel={formatMessage(messages.manageCompletedBooking)}
						/>
					</div>
				}
			</div>
		)
	}
}
const mapState = (state) => ({
	loading: state.intl.loading
});
export default compose(injectIntl,
	withStyles(s, bt),
	connect(mapState),
)(CompletedBookingList);

