import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, FormControl, Col, Button } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './CurrencyList.css';
import bt from '../../../components/commonStyle.css';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import CustomPagination from '../../CustomPagination';
import Loader from '../../../components/Common/Loader';
import CurrencyModal from './CurrencyModal';

import { updateCurrencyStatus, setBaseCurrency, allowPaymentCurrency, removeCurrency } from '../../../actions/siteadmin/Currency/updateCurrency';
import { openCurrencyModal } from '../../../actions/siteadmin/modalActions';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

import debounce from '../../../helpers/debounce';
import TrashIcon from '../../../../public/Icons/deleteIcon.svg';

export class CurrencyList extends Component {
	static propTypes = {
		CurrencyData: PropTypes.object,
		updateCurrencyStatus: PropTypes.any.isRequired,
		setBaseCurrency: PropTypes.any.isRequired,
		managePaymentCurrency: PropTypes.any.isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 1,
		}
		this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this));
		this.paginationData = this.paginationData.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleKeywordSearch(searchList) {
		const { CurrencyData: { refetch } } = this.props
		let variables = {
			currentPage: 1,
			searchList: searchList
		}
		this.setState(variables)
		refetch(variables)
	}

	async handleUpdateStatus(id, status, symbol) {
		const { updateCurrencyStatus, CurrencyData: { refetch } } = this.props;
		const { currentPage } = this.state;
		let variables = { currentPage };
		await updateCurrencyStatus(id, status, symbol);
		refetch(variables);
	}

	async handleBaseCurrency(id) {
		const { setBaseCurrency, CurrencyData: { refetch } } = this.props;
		const { currentPage } = this.state;
		let variables = { currentPage };
		await setBaseCurrency(id);
		refetch(variables);
	}

	async managePaymentCurrency(id, isPayment) {
		const { allowPaymentCurrency, CurrencyData: { refetch } } = this.props;
		const { currentPage } = this.state;
		let variables = { currentPage };
		await allowPaymentCurrency(id, isPayment);
		refetch(variables);
	}

	paginationData(currentPage) {
		const { CurrencyData: { refetch } } = this.props;
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}

	async handleDelete(id, symbol) {
		const { CurrencyData: { refetch }, removeCurrency, base } = this.props;
		if (base == symbol) {
			showToaster({ messageId: 'failedDeleteCurrency', toasterType: 'error' });
			return;
		}
		const { currentPage } = this.state;
		let variables = { currentPage };
		await removeCurrency(id, symbol);
		refetch(variables)
	}

	render() {
		const { CurrencyData, CurrencyData: { getCurrency }, loading, openCurrencyModal } = this.props;
		const { currentPage } = this.state;
		const { formatMessage } = this.props.intl;
		return (
			<div className={s.widthInner}>
				<div className={cx(s.searchInput, 'searchInputRTL')}>
					<FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(event) => this.handleKeywordSearch(event.target && event.target.value)} className={bt.formControlInput} />
				</div>
				<Col xs={12} sm={6} md={6} lg={3} className={cx(bt.noPadding, s.buttonMargin, 'textAlignRightRTL', s.alignRight)}>
					<Button
						className={cx(bt.btnPrimary, s.marginBottom20, s.rightSide)}
						onClick={() => openCurrencyModal()}
					>
						<FormattedMessage {...messages.addNewLabel} />
					</Button>
				</Col>
				<CurrencyModal />
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
									<th scope="col"><FormattedMessage {...messages.symbol} /></th>
									<th scope="col"><FormattedMessage {...messages.baseCurrency} /></th>
									<th scope="col"><FormattedMessage {...messages.status} /></th>
									<th scope="col"><FormattedMessage {...messages.enableDisable} /></th>
									<th scope="col"><FormattedMessage {...messages.setBaseCurrency} /></th>
									<th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
								</tr>
							</thead>
							<tbody>
								{
									CurrencyData && CurrencyData.getCurrency && CurrencyData.getCurrency.results && CurrencyData.getCurrency.results.length > 0 && CurrencyData.getCurrency.results.map((item, index) => {

										return (

											<tr key={index}>
												<td data-label={formatMessage(messages.id)}>{item.id}</td>
												<td data-label={formatMessage(messages.symbol)}>{item.symbol}</td>
												{item.isBaseCurrency == 1 && <td data-label={formatMessage(messages.baseCurrency)}><FormattedMessage {...messages.active} /></td>}
												{item.isBaseCurrency == 0 && <td data-label={formatMessage(messages.baseCurrency)}></td>}
												{item.isEnable && <td data-label={formatMessage(messages.status)}><FormattedMessage {...messages.Enabled} /></td>}
												{!item.isEnable && <td data-label={formatMessage(messages.status)}><FormattedMessage {...messages.Disabled} /></td>}
												<td data-label={formatMessage(messages.enableDisable)}> <a href="javascript:void(0)" onClick={() => this.handleUpdateStatus(item.id, item.isEnable, item.symbol)} >
													{
														item.isEnable && <span> <FormattedMessage {...messages.Disable} /> </span>
													}

													{
														!item.isEnable && <span> <FormattedMessage {...messages.Enable} /> </span>
													}
												</a>
												</td>
												<td data-label={formatMessage(messages.setBaseCurrency)}>
													<span>
														{
															!item.isBaseCurrency && item.isEnable && <a href="javascript:void(0)" onClick={() => this.handleBaseCurrency(item.id)}>
																<FormattedMessage {...messages.setBase} />
															</a>
														}
													</span>

												</td>
												<td data-label={formatMessage(messages.deleteAction)}>

													<Button onClick={() => this.handleDelete(item.id, item.symbol)} className={s.iconBtn}>
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
									(!loading && (CurrencyData && CurrencyData.getCurrency && CurrencyData.getCurrency.results.length == 0)) && (
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
					CurrencyData && CurrencyData.getCurrency && CurrencyData.getCurrency.results && CurrencyData.getCurrency.results.length > 0
					&& <div className={cx(bt.space5, bt.spaceTop5)}>
						<CustomPagination
							total={CurrencyData.getCurrency.count}
							currentPage={currentPage}
							defaultCurrent={1}
							defaultPageSize={10}
							change={this.paginationData}
							paginationLabel={formatMessage(messages.currencies)}
						/>
					</div>
				}
			</div >
		)
	}
}

const mapDispatch = {
	updateCurrencyStatus,
	setBaseCurrency,
	allowPaymentCurrency,
	openCurrencyModal,
	removeCurrency
};
const mapState = (state) => ({
	loading: state.intl.loading,
	base: state.currency.base,
});
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CurrencyList)));
