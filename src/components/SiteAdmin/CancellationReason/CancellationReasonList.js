import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Button, FormControl } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './CancellationReasonList.css';
import bt from '../../../components/commonStyle.css';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import CustomPagination from '../../CustomPagination/CustomPagination';
import Link from '../../Link/Link';
import Loader from '../../../components/Common/Loader';

import removeCancelReason from '../../../actions/siteadmin/CancelReason/removeCancelReason';
import { addCancelReason } from '../../../actions/siteadmin/CancelReason/addCancelReason';

import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import debounce from '../../../helpers/debounce';

import TrashIcon from '../../../../public/Icons/deleteIcon.svg';
import EditIcon from '../../../../public/Icons/editIcon.svg';

export class CancellationReason extends Component {
	static propTypes = {
		cancelReasons: PropTypes.object,
	}
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 1,
			searchList: ""
		}
		this.paginationData = this.paginationData.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this));
	}

	handleKeywordSearch(searchList) {
		const { cancelReasons: { refetch } } = this.props
		let variables = {
			currentPage: 1,
			searchList: searchList
		}
		this.setState({ searchList, currentPage: 1 });
		refetch(variables);;
	}

	async handleDelete(id, currentPage) {
		const { cancelReasons: { refetch }, removeCancelReason } = this.props;
		let variables = { currentPage };
		await removeCancelReason(id, currentPage);
		await refetch(variables);
	}

	async handleChange(e, id, reason, userType) {
		const { addCancelReason, cancelReasons: { refetch } } = this.props;
		let data = {};
		data = {
			id: id,
			reason: reason,
			userType: userType,
			isActive: e.target.value
		}
		this.setState({ currentPage: 1 });
		let variables = { currentPage: 1 };
		await addCancelReason(data);
		await refetch(variables);
	}

	paginationData(currentPage) {
		const { cancelReasons: { refetch } } = this.props;
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}

	render() {
		const { cancelReasons, cancelReasons: { getAllCancelReason }, loading } = this.props;
		const { currentPage } = this.state;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx(s.widthInner, 'whiteDropdown')}>
				<div className={cx(s.searchInput, 'searchInputRTL')}>
					<FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(event) => this.handleKeywordSearch(event.target && event.target.value)} className={bt.formControlInput} />
				</div>
				<div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide, 'floatLeftRTL', 'floatMbRightRTL')}>
					<Link to={"/siteadmin/cancel-reasons/add"} className={cx(bt.btnPrimary)} ><FormattedMessage {...messages.addCancelReason} /></Link>
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
									<th scope="col"><FormattedMessage {...messages.cancelReason} /></th>
									<th scope="col"><FormattedMessage {...messages.cancelledBy} /></th>
									<th scope="col"><FormattedMessage {...messages.status} /></th>
									<th scope="col"><FormattedMessage {...messages.action} /></th>
									<th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
								</tr>
							</thead>
							<tbody>
								{
									cancelReasons && cancelReasons.getAllCancelReason && cancelReasons.getAllCancelReason.results && cancelReasons.getAllCancelReason.results
										.length > 0 && cancelReasons.getAllCancelReason.results.map((item, index) => {
											let isActive = item.isActive == "true" ? "1" : "0";
											return (
												<tr key={index}>
													<td data-label={formatMessage(messages.id)}>{item.id}</td>
													<td data-label={formatMessage(messages.cancelReason)}>{capitalizeFirstLetter(item.reason)}</td>
													<td data-label={formatMessage(messages.cancelledBy)}>{formatMessage(item.userType == '1' ? messages['user'] : messages['partner'])}</td>
													<td data-label={formatMessage(messages.status)}>
														<select name="isActive" onChange={(e) => this.handleChange(e, item.id, item.reason, item.userType)} className={bt.selectInput} value={isActive}>
															<option value={"1"}>{formatMessage(messages.active)}</option>
															<option value={"0"}>{formatMessage(messages.inactive)}</option>
														</select>
													</td>

													<td data-label={formatMessage(messages.action)}>
														<Link to={'/siteadmin/cancel-reasons/edit/' + item.id} className={cx('editAlign', s.noLink)}>
															<span><img src={EditIcon} className={cx(s.editIcon, 'editIconRTL')} /></span>
															<span className={s.vtrMiddle}>
																<FormattedMessage {...messages.editAction} />
															</span>
														</Link>
													</td>
													<td data-label={formatMessage(messages.deleteAction)} >

														<Button onClick={() => this.handleDelete(item.id, currentPage)} className={s.iconBtn}>
															<img src={TrashIcon} className={cx(s.editIcon, 'editIconRTL')} />
															<span className={s.vtrMiddle}>
																<FormattedMessage {...messages.deleteAction} />
															</span>
														</Button>

													</td>
												</tr>
											)
										})
								}
								{
									(!loading && (cancelReasons && cancelReasons.getAllCancelReason && cancelReasons.getAllCancelReason.results && cancelReasons.getAllCancelReason.results.length == 0)) && (
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
					cancelReasons && cancelReasons.getAllCancelReason && cancelReasons.getAllCancelReason.results && cancelReasons.getAllCancelReason.results.length > 0
					&& <div className={cx(bt.space5, bt.spaceTop5)}>
						<CustomPagination
							total={cancelReasons.getAllCancelReason.count}
							currentPage={currentPage}
							defaultCurrent={1}
							defaultPageSize={10}
							change={this.paginationData}
							paginationLabel={formatMessage(messages.cancelReason)}
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
const mapDispatch = {
	removeCancelReason,
	addCancelReason
};
export default injectIntl(compose(
	withStyles(s, bt),
	connect(mapState, mapDispatch)
)(CancellationReason));

