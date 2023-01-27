import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import { Table, FormControl, ButtonToolbar, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';

import CustomPagination from '../../CustomPagination';
import Loader from '../../../components/Common/Loader';
import Link from '../../Link/Link';

import s from './ManageLocation.css';
import bt from '../../../components/commonStyle.css';

import { deleteLocation } from '../../../actions/siteadmin/Location/deleteLocation'
import { updateLocation } from '../../../actions/siteadmin/Location/updateLocation';

import messages from '../../../locale/messages';
import debounce from '../../../helpers/debounce';
import EditIcon from '../../../../public/Icons/editIcon.svg';
import TrashIcon from '../../../../public/Icons/bin.svg'

export class LocationList extends Component {
	static propTypes = {
		locationList: PropTypes.object,
	}
	constructor(props) {
		super(props)

		this.state = {
			currentPage: 1,
			searchList: ""
		}
		this.paginationData = this.paginationData.bind(this);
		this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this));
		this.handleChange = this.handleChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	
	handleKeywordSearch(searchList) {
		const { locationList: { refetch } } = this.props
		let variables = {
			currentPage: 1,
			searchList: searchList
		}
		this.setState({ searchList, currentPage: 1 });
		refetch(variables);;
	}

	async handleDelete(id, currentPage) {
		const { locationList: { refetch }, deleteLocation } = this.props;
		this.setState({ currentPage: 1 });
		let variables = { currentPage: 1 };
		await deleteLocation(id, currentPage);
		refetch(variables);
	}

	async handleChange(e, id, locationName, description, coordinates) {
		const { updateLocation, locationList: { refetch } } = this.props;
		this.setState({ currentPage: 1 });
		let variables = { currentPage: 1 };
		let isActive = e.target.value;
		await updateLocation(locationName, coordinates, id, description, isActive);
		refetch(variables);
	}

	paginationData(currentPage) {
		const { locationList: { refetch } } = this.props;
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}

	render() {
		const { locationList, locationList: { getLocationList }, loading } = this.props;
		const { currentPage } = this.state;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx(s.widthInner, 'whiteDropdown')}>
				<div className={cx(s.searchInput, 'searchInputRTL')}>
					<FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(event) => this.handleKeywordSearch(event.target && event.target.value)} className={bt.formControlInput} />
				</div>
				<div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide, 'floatLeftRTL', 'floatMbRightRTL')}>
					<Link to={"/siteadmin/add-location"} className={cx(bt.btnPrimary)} >{formatMessage(messages.addLocation)}</Link>
				</div>
				<div class="clearfix"></div>
				
				{
					loading && <div>
						<Loader type="circle" />
					</div>
				}
				{!loading &&
					<div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'newAdminResponsiveTable', 'NewResponsiveTable')}>
						<Table className="table">
							<thead>
								<tr>
									<th scope="col"><FormattedMessage {...messages.id} /></th>
									<th scope="col"><FormattedMessage {...messages.location} /></th>
									<th scope="col"><FormattedMessage {...messages.description} /></th>
									<th scope="col"><FormattedMessage {...messages.status} /></th>
									<th scope="col"><FormattedMessage {...messages.action} /></th>
									<th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
								</tr>
							</thead>
							<tbody>
								{
									locationList && locationList.getLocationList && locationList.getLocationList.results && locationList.getLocationList.results.length > 0 && locationList.getLocationList.results.map((item, index) => {
										item.isActive = item.isActive == true ? 1 : 0;
										return (
											<tr key={index}>
												<td data-label={formatMessage(messages.id)}>{item.id}</td>
												<td data-label={formatMessage(messages.location)}>{item.locationName}</td>
												<td data-label={formatMessage(messages.description)}>{item.description}</td>
												<td data-label={formatMessage(messages.status)}>
													<select name="isActive" onChange={(e) => this.handleChange(e, item.id, item.locationName, item.description, item.coordinates)} className={bt.selectInput} value={item.isActive}>
														<option value={1}>{formatMessage(messages.active)}</option>
														<option value={0}>{formatMessage(messages.inactive)}</option>
													</select>
												</td>
												<td data-label={formatMessage(messages.action)}><Link to={'/siteadmin/edit-location/' + item.id} className={cx('editAlign', s.displayFlex, s.noLink)}><span><img src={EditIcon} className={cx(s.editIcon, 'editIconRTL')} /></span>
													<span className={s.vtrMiddle}>
														<FormattedMessage {...messages.editAction} />
													</span></Link></td>
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
									!loading && locationList && locationList.getLocationList && locationList.getLocationList.results && locationList.getLocationList.results.length == 0 && (
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
					locationList && locationList.getLocationList && locationList.getLocationList.results && locationList.getLocationList.results.length > 0
					&& <div className={cx(bt.space5, bt.spaceTop5)}>
						<CustomPagination
							total={locationList.getLocationList.count}
							currentPage={currentPage}
							defaultCurrent={1}
							defaultPageSize={10}
							change={this.paginationData}
							paginationLabel={locationList.getLocationList.count == 1 ? formatMessage(messages.locationName) : formatMessage(messages.locations)}
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
	deleteLocation,
	updateLocation
};
export default injectIntl(compose(
	withStyles(s, bt),
	connect(mapState, mapDispatch)
)(LocationList));

