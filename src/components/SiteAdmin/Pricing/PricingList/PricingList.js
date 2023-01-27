import React from 'react';
import { Table, Button, FormControl, ButtonToolbar } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
// Components
import CustomPagination from '../../../CustomPagination';
import Link from '../../../Link';
import Loader from '../../../../components/Common/Loader';
//local
import messages from '../../../../locale/messages';
import history from '../../../../history';
import s from './PricingList.css';
import bt from '../../../../components/commonStyle.css';

import { updatePricingStatus } from '../../../../actions/siteadmin/Pricing/updatePricingStatus';
import { deletePricing } from '../../../../actions/siteadmin/Pricing/deletePricing';
import debounce from '../../../../helpers/debounce';
//Images
import EditIcon from '../../../../../public/Icons/editIcon.svg';
import TrashIcon from '../../../../../public/Icons/deleteIcon.svg';
class PricingList extends React.Component {
  static defaultProps = {
    pricingDetails: {
      loading: true
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      searchKeyword: ''
    };
    this.paginationData = this.paginationData.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this));
    this.handleStatus = this.handleStatus.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleClick() {
    history.push('/add')
  }
  handleKeywordSearch(searchKeyword) {
    const { pricingDetails: { refetch } } = this.props
    let variables = {
      currentPage: 1,
      searchKeyword
    }
    this.setState({ searchKeyword, currentPage: 1 });
    refetch(variables);;
  }

  async handleDelete(id) {
    const { deletePricing, pricingDetails: { refetch } } = this.props;
    let variables = { currentPage: 1 };
    const deletePricingData = await deletePricing(id);
    if (deletePricingData && deletePricingData.status === 200) {
      this.setState({ currentPage: 1 });
      refetch(variables);
    }
  }
  paginationData(currentPage) {
    const { pricingDetails: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  async handleStatus(e, id) {
    const { updatePricingStatus, pricingDetails: { refetch } } = this.props;
    let status = e.target.value == 'true' ? true : false;

    const updateActiveStatus = await updatePricingStatus(id, status);
    if (updateActiveStatus && updateActiveStatus.status === 200) {
      let variables = { currentPage: 1 };
      this.setState({ currentPage: 1 });
      refetch(variables);
    }
  }
  render() {
    const { pricingDetails, pricingDetails: { loading, getAllPricing }, loadingTable } = this.props;
    const { formatMessage } = this.props.intl;
    const { currentPage } = this.state;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={cx(s.searchInput, 'searchInputRTL')}>
          <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(event) => this.handleKeywordSearch(event.target && event.target.value)} className={bt.formControlInput} />
        </div>
        <div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide, 'floatLeftRTL', 'floatMbRightRTL')}>
          <Link to={"/siteadmin/pricing/add"} className={cx(bt.btnPrimary)} >{formatMessage(messages.addFare)}</Link>
        </div>
        <div class="clearfix"></div>
        {
          loadingTable && <div>
            <Loader type="circle" />
          </div>
        }
        {!loadingTable &&
          <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'newAdminResponsiveTable' , 'NewResponsiveTable')}>
            <Table className="table">
              <thead>
                <tr>
                  <th scope="col"><FormattedMessage {...messages.id} /></th>
                  <th scope="col"><FormattedMessage {...messages.locationName} /></th>
                  <th scope="col"><FormattedMessage {...messages.category} /></th>
                  <th scope="col"><FormattedMessage {...messages.subCategory} /></th>
                  <th scope="col"><FormattedMessage {...messages.status} /></th>
                  <th scope="col"><FormattedMessage {...messages.action} /></th>
                  <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
                </tr>
              </thead>
              <tbody>
                {
                  pricingDetails && pricingDetails.getAllPricing && pricingDetails.getAllPricing.results
                  && pricingDetails.getAllPricing.count > 0 && pricingDetails.getAllPricing.results.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label={formatMessage(messages.id)}>{item.id}</td>
                        <td data-label={formatMessage(messages.locationName)}>{item.location && item.location.locationName}</td>
                        <td data-label={formatMessage(messages.category)}>{item.category && item.category.name}</td>
                        <td data-label={formatMessage(messages.subCategory)}>{item.subCategory && item.subCategory.name}</td>
                        <td data-label={formatMessage(messages.status)}>
                          <select value={item.isActive} onChange={(e) => { this.handleStatus(e, item.id) }} className={bt.selectInput}>
                            <option value={true}>{formatMessage(messages.active)}</option>
                            <option value={false}>{formatMessage(messages.inactive)}</option>
                          </select>
                        </td>
                        <td data-label={formatMessage(messages.action)}>
                          <Link to={'/siteadmin/pricing/edit/' + item.id} className={cx('editAlign', s.noLink)}>
                            <span><img src={EditIcon} className={cx(s.editIcon, 'editIconRTL')} /></span>
                            <span className={s.vtrMiddle}>
                              <FormattedMessage {...messages.editAction} />
                            </span>
                          </Link>
                        </td>
                        <td data-label={formatMessage(messages.deleteAction)} >

                          <Button onClick={() => this.handleDelete(item.id)} className={s.iconBtn}>
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
                  !loading && pricingDetails && pricingDetails.getAllPricing && pricingDetails.getAllPricing.count == 0 && (
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
          pricingDetails && pricingDetails.getAllPricing && pricingDetails.getAllPricing.results && pricingDetails.getAllPricing.count > 0
          && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={pricingDetails.getAllPricing.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.fares)}
            />
          </div>
        }
      </div>
    );
  }
}
const mapDispatch = {
  updatePricingStatus,
  deletePricing
};
const mapState = (state) => ({
  loading: state.intl.loading
});
export default injectIntl(compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch)
)(PricingList));
