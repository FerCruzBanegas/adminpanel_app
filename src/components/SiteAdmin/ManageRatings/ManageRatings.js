import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, FormControl } from 'react-bootstrap';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import cx from 'classnames';

import CustomPagination from '../../CustomPagination/CustomPagination';
import Loader from '../../../components/Common/Loader';
import StarRating from '../../StarRating';

import s from './ManageRatings.css';
import bt from '../../../components/commonStyle.css';

import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import messages from '../../../locale/messages';
import debounce from '../../../helpers/debounce';

export class ManageRatings extends Component {
	static propTypes = {
		reviews: PropTypes.object,
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
		const { reviews: { refetch } } = this.props
		let variables = {
			currentPage: 1,
			searchList
		}
		this.setState(variables)
		refetch(variables)
	}

	paginationData(currentPage) {
		const { reviews: { refetch } } = this.props;
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}

	render() {
		const { reviews, reviews: { getReviews }, loading } = this.props;
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
									<th scope="col"><FormattedMessage {...messages.id} /></th>
									<th scope="col"><FormattedMessage {...messages.user} /></th>
									<th scope="col"><FormattedMessage {...messages.partner} /></th>
								</tr>
							</thead>
							<tbody>
								{
									reviews && reviews.getReviews && reviews.getReviews.results && reviews.getReviews.results.length > 0 && reviews.getReviews.results.map((item, index) => {
										let authorId, ratings, userRating, partnerRating;
										authorId = item.authorId.split(",");
										ratings = item.ratings.split(",");

										if (authorId && authorId.length > 1) {
											if (authorId[0] === (item.bookingDetails && item.bookingDetails.partnerDetails && item.bookingDetails.partnerDetails.userId)) {
												userRating = parseFloat(ratings[0]);
											} else {
												userRating = parseFloat(ratings[1]);
											}

											if (authorId[1] === (item.bookingDetails && item.bookingDetails.userDetails && item.bookingDetails.userDetails.userId)) {
												partnerRating = parseFloat(ratings[1]);
											} else {
												partnerRating = parseFloat(ratings[0]);
											}
										} else {
											userRating = (authorId[0] === (item.bookingDetails && item.bookingDetails.partnerDetails && item.bookingDetails.partnerDetails.userId)) ? parseFloat(ratings[0]) : 0;
											partnerRating = (authorId[0] === (item.bookingDetails && item.bookingDetails.userDetails && item.bookingDetails.userDetails.userId)) ? parseFloat(ratings[0]) : 0;
										}

										if (item.bookingDetails && item.bookingDetails.userDetails && item.bookingDetails.partnerDetails) {
											return (
												<tr key={index}>
													<td data-label={formatMessage(messages.id)}>{item.bookingId}</td>
													<td data-label={formatMessage(messages.user)}>
														<div className={s.disFlex}>
															<span>{item.bookingDetails && item.bookingDetails.userDetails ? capitalizeFirstLetter(item.bookingDetails.userDetails.firstName) : ''}</span>
															<span className={s.padding}> - </span>
															<span><StarRating value={userRating} name={'review'} /></span>
														</div>
													</td>
													<td data-label={formatMessage(messages.partner)}>
														<div className={s.disFlex}>
															<span>{item.bookingDetails && item.bookingDetails.partnerDetails ? capitalizeFirstLetter(item.bookingDetails.partnerDetails.firstName) : ''}</span>
															<span className={s.padding}> - </span>
															<span><StarRating value={partnerRating} name={'review'} /></span>
														</div>
													</td>
												</tr>
											)
										}
									})
								}
								{
									!loading && reviews && reviews.getReviews && reviews.getReviews.results && reviews.getReviews.results.length == 0 && (
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
					reviews && reviews.getReviews && reviews.getReviews.results && reviews.getReviews.results.length > 0
					&& <div className={cx(bt.space5, bt.spaceTop5)}>
						<CustomPagination
							total={reviews.getReviews.count}
							currentPage={currentPage}
							defaultCurrent={1}
							defaultPageSize={10}
							change={this.paginationData}
							paginationLabel={formatMessage(messages.ratings)}
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
)(ManageRatings);

