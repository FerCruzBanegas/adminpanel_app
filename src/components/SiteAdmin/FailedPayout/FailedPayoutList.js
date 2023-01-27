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

import s from './FailedPayoutList.css';
import bt from '../../../components/commonStyle.css';

import messages from '../../../locale/messages';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import debounce from '../../../helpers/debounce';

export class FailedPayoutList extends Component {
	static propTypes = {
		getFailedPayoutData: PropTypes.object,
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
		const { getFailedPayoutData: { refetch } } = this.props
		let variables = {
			currentPage: 1,
			searchList: searchList
		}
		this.setState(variables)
		refetch(variables)
	}

	paginationData(currentPage) {
		const { getFailedPayoutData: { refetch } } = this.props;
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}

	render() {
		const { getFailedPayoutData, getFailedPayoutData: { getFailedPayoutList }, loading } = this.props;
		const { currentPage } = this.state;
		const { formatMessage } = this.props.intl;
		return (
			<div className={s.widthInner}>
				<div className={cx(s.searchInput, 'searchInputRTL')}>
					<FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleKeywordSearch(e.target && e.target.value)} className={bt.formControlInput} />
				</div>
				<div class="clearfix"></div>

				{
					loading && <div>
						<Loader type="circle" />
					</div>
				}
				{!loading &&
					<div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable', bt.spaceTop4)}>
						<Table className="table">
							<thead>
								<tr>
									<th scope="col"><FormattedMessage {...messages.jobId} /></th>
									<th scope="col"><FormattedMessage {...messages.partnerName} /></th>
									<th scope="col"><FormattedMessage {...messages.amount} /></th>
									<th scope="col"><FormattedMessage {...messages.reason} /></th>
								</tr>
							</thead>
							<tbody>
								{
									getFailedPayoutData && getFailedPayoutData.getFailedPayoutList && getFailedPayoutData.getFailedPayoutList.results && getFailedPayoutData.getFailedPayoutList.results.length > 0 && getFailedPayoutData.getFailedPayoutList.results.map((item, index) => {
										return (
											<tr key={index}>
												<td data-label={formatMessage(messages.jobId)}>{item.bookingId}</td>
												<td data-label={formatMessage(messages.partnerName)}>{item && item.partnerDetails && capitalizeFirstLetter(item.partnerDetails.firstName)}</td>
												<td data-label={formatMessage(messages.amount)}><CurrencyConverter from={item.currency} amount={item.amount} /></td>
												<td data-label={formatMessage(messages.reason)}>{item.reason}</td>

											</tr>
										)
									})
								}
								{
									!loading && getFailedPayoutData && getFailedPayoutData.getFailedPayoutList && getFailedPayoutData.getFailedPayoutList.results && getFailedPayoutData.getFailedPayoutList.results.length == 0 && (
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
					getFailedPayoutData && getFailedPayoutData.getFailedPayoutList && getFailedPayoutData.getFailedPayoutList.results && getFailedPayoutData.getFailedPayoutList.results.length > 0
					&& <div className={cx(bt.space5, bt.spaceTop5)}>
						<CustomPagination
							total={getFailedPayoutData.getFailedPayoutList.count}
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
};
const mapState = (state) => ({
	loading: state.intl.loading
});
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(FailedPayoutList)));

