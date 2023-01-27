import React from 'react';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';

import { graphql } from 'react-apollo';
import getAllPromoCode from './getAllPromoCode.graphql';

import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, Button, FormControl } from 'react-bootstrap';
import s from './PromoCodeList.css';
import cx from 'classnames';
import bt from '../../../../components/commonStyle.css';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

import Link from '../../../Link';
import CustomPagination from '../../../CustomPagination';
import CurrencyConverter from '../../../CurrencyConverter';

//Images
import EditIcon from '../../../../../public/Icons/editIcon.svg';
import TrashIcon from '../../../../../public/Icons/deleteIcon.svg';

import { deletePromoCode } from '../../../../actions/siteadmin/PromoCode/deletePromoCode';
import { addPromoCode } from '../../../../actions/siteadmin/PromoCode/addPromoCode';

import debounce from '../../../../helpers/debounce';

class PromoCodeList extends React.Component {

  constructor(props) {
    super(props)
    this.state = { currentPage: 1, searchList: '' };
    this.paginationData = this.paginationData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this), 250);
  }

  handleKeywordSearch(searchList) {
    const { promoCodes: { refetch } } = this.props
    let variables = { currentPage: 1, searchList };
    this.setState(variables)
    refetch(variables)
  }

  async handleChange(e, id, title, description, code, type, promoValue, imageName, expiryDate) {
    const { addPromoCode, promoCodes: { refetch } } = this.props;
    let data = {};
    data = {
      id: id,
      title: title,
      description: description,
      code: code,
      type: type,
      promoValue: promoValue,
      isEnable: e.target.value === 'active' ? "true" : "false",
      imageName,
      expiryDate
    }
    this.setState({ currentPage: 1 });
    let variables = { currentPage: 1 };
    await addPromoCode(data);
    refetch(variables);
  }

  async handleDelete(id) {
    const { deletePromoCode, promoCodes: { refetch } } = this.props;
    let variables = { currentPage: 1 };
    this.setState(variables);
    await deletePromoCode(id);
    refetch(variables);
  }

  paginationData(currentPage) {
    const { promoCodes: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  render() {
    const { promoCodes, intl: { formatMessage } } = this.props;
    const { currentPage } = this.state;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={cx(s.searchInput, 'searchInputRTL')}>
          <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleKeywordSearch(e.target && e.target.value)} className={bt.formControlInput} />
        </div>
        <div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide, 'floatLeftRTL', 'floatMbRightRTL ')}>
          <Link to={'/siteadmin/promo-code/add'} className={cx(bt.btnPrimary)} ><FormattedMessage {...messages.addPromoCode} /></Link>
        </div>
        <div class="clearfix"></div>
        <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable', bt.spaceTop4)}>
          <Table className="table">
            <thead>
              <tr>
                <th scope="col"><FormattedMessage {...messages.id} /></th>
                <th scope="col"><FormattedMessage {...messages.code} /></th>
                <th scope="col"><FormattedMessage {...messages.title} /></th>
                <th scope="col"><FormattedMessage {...messages.discount} /></th>
                <th scope="col"><FormattedMessage {...messages.status} /></th>
                <th scope="col"><FormattedMessage {...messages.action} /></th>
                <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
              </tr>
            </thead>
            <tbody>
              {
                promoCodes && promoCodes.getAllPromoCode && promoCodes.getAllPromoCode.results && promoCodes.getAllPromoCode.results.length > 0 && promoCodes.getAllPromoCode.results.map((item, index) => {
                  let status = item.isEnable ? 'active' : 'inactive';
                  return (
                    <tr key={index}>
                      <td data-label={formatMessage(messages.id)}>{item && item.id}</td>
                      <td data-label={formatMessage(messages.code)}>{item && item.code}</td>
                      <td data-label={formatMessage(messages.title)}>{item && item.title}</td>
                      <td data-label={formatMessage(messages.discount)}>
                        {
                          item && item.type === 1 && <span>
                            {item.promoValue + '%'}
                          </span>
                        }
                        {
                          item && item.type !== 1 && <CurrencyConverter
                            amount={item.promoValue}
                            from={item.currency}
                          />
                        }
                      </td>
                      <td data-label={formatMessage(messages.status)}>
                        <select name="isEnable" onChange={(e) => this.handleChange(e, item.id, item.title, item.description, item.code, item.type, item.promoValue, item.imageName, item.expiryDate)} className={bt.selectInput} value={status}>
                          <option value="active">{formatMessage(messages.active)}</option>
                          <option value="inactive">{formatMessage(messages.inactive)}</option>s
                        </select>
                      </td>
                      <td data-label={formatMessage(messages.action)}>
                        <Link to={'/siteadmin/promo-code/edit/' + item.id} className={cx('editAlign', s.noLink)}>
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
                promoCodes && promoCodes.getAllPromoCode && promoCodes.getAllPromoCode.results && promoCodes.getAllPromoCode.results.length == 0 && (
                  <tr>
                    <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </div>
        {
          promoCodes && promoCodes.getAllPromoCode && promoCodes.getAllPromoCode.count > 0 && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={promoCodes.getAllPromoCode.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.promoCodeId)}
            />
          </div>
        }
      </div>
    );
  }
}

const mapState = (state) => ({});
const mapDispatch = {
  deletePromoCode,
  addPromoCode
};

export default compose(injectIntl,
  withStyles(s, bt),
  graphql(getAllPromoCode, {
    name: 'promoCodes',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }),
  connect(mapState, mapDispatch)
)(PromoCodeList);
