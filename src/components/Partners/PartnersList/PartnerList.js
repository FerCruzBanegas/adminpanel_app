import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, Button, FormControl } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';

import Link from '../../Link/Link';
import CustomPagination from '../../CustomPagination/CustomPagination';
import Loader from '../../Common/Loader/Loader';

import s from './PartnerList.css';
import bt from '../../../components/commonStyle.css'

import deleteUser from '../../../actions/siteadmin/Users/deleteUser';
import getAllPartners from './getAllPartners.graphql'
import messages from '../../../locale/messages';
import { editPartner } from '../../../actions/siteadmin/editPartner';

//Images
import TrashIcon from '../../../../public/Icons/deleteIcon.svg';
import EditIcon from '../../../../public/Icons/editIcon.svg';
import ExportImage from '../../../../public/Icons/export.png';

//Helpers
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import debounce from '../../../helpers/debounce';

class PartnerList extends React.Component {
  static propTypes = {
    deletePartner: PropTypes.any
  };
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      searchList: ''
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this), 250);
    this.handleUserStatusChange = this.handleUserStatusChange.bind(this);
    this.handleBanStatusChange = this.handleBanStatusChange.bind(this)
  }

  handleKeywordSearch(searchList) { // Keyword search
    const { partnerDetails: { refetch } } = this.props;
    let variables = {
      currentPage: 1,
      searchList
    };
    this.setState(variables)
    refetch(variables);
  }

  async handleDelete(profileId, currentPage, userType) {
    const { deleteUser, partnerDetails: { refetch } } = this.props;
    let variables = { currentPage }
    await deleteUser(profileId, currentPage, userType);
    refetch(variables)
  }
  async handleUserStatusChange(e, id, email, phoneDialCode, phoneNumber, isBan, phoneCountryCode, currentPage) {
    const { editPartner, partnerDetails: { refetch } } = this.props;
    let data = {};
    data = {
      id: id,
      email: email,
      phoneDialCode: phoneDialCode,
      phoneNumber: phoneNumber,
      userStatus: e.target.value,
      isBan: isBan,
      phoneCountryCode: phoneCountryCode
    }
    let variables = { currentPage, userType: 2 }
    await editPartner(data);
    refetch(variables);
  }
  async handleBanStatusChange(e, id, email, phoneDialCode, phoneNumber, userStatus, phoneCountryCode, currentPage) {
    const { editPartner, partnerDetails: { refetch } } = this.props;
    let data = {};
    data = {
      id: id,
      email: email,
      phoneDialCode: phoneDialCode,
      phoneNumber: phoneNumber,
      userStatus: userStatus,
      isBan: e.target.value,
      phoneCountryCode: phoneCountryCode
    }
    let variables = { currentPage, userType: 2 }
    await editPartner(data);
    refetch(variables);
  }
  paginationData(currentPage) {
    const { partnerDetails: { refetch } } = this.props;
    let variables = { currentPage, userType: 2 };
    this.setState({ currentPage });
    refetch(variables);
  }
  render() {
    const { partnerDetails, partnerDetails: { getAllUsers }, loading } = this.props;
    const { currentPage, searchList } = this.state;
    const { formatMessage } = this.props.intl;
    let country;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={s.exportDisplay}>
          <div className={cx(s.searchInput, 'searchInputRTL')}>
            <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleKeywordSearch(e.target && e.target.value)} className={bt.formControlInput} />
          </div>
          <div className={cx(s.exportTextSection, 'textAlignLeftRTL', 'textAlignRightMbRTL')}>
            {
              partnerDetails && partnerDetails.getAllUsers && partnerDetails.getAllUsers.results && partnerDetails.getAllUsers.results.length > 0 && <a
                href={`/export-admin-data?type=serviceprovider&keyword=${searchList ? searchList : ''}`}
                className={cx('pull-right', s.exportText)}>
                <span className={cx(s.vtrMiddle, s.exportText, 'exportTextRTL')}><FormattedMessage {...messages.exportDataIntoCSV} /></span>
                <span className={s.vtrTextBottom}>
                  <img src={ExportImage} className={s.exportImg} />
                </span>
              </a>
            }
          </div></div>

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
                  <th scope="col"><FormattedMessage {...messages.firstName} /></th>
                  <th scope="col"><FormattedMessage {...messages.lastName} /></th>
                  <th scope="col"><FormattedMessage {...messages.email} /></th>
                  <th scope="col"><FormattedMessage {...messages.country} /></th>
                  <th scope="col"><FormattedMessage {...messages.phoneNumber} /></th>
                  <th scope="col"><FormattedMessage {...messages.createdAt} /></th>
                  <th scope="col"><FormattedMessage {...messages.userStatus} /></th>
                  <th scope="col"><FormattedMessage {...messages.banStatus} /></th>
                  <th scope="col"><FormattedMessage {...messages.action} /></th>
                  <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
                </tr>
              </thead>
              <tbody>
                {
                  partnerDetails && partnerDetails.getAllUsers && partnerDetails.getAllUsers.results && partnerDetails.getAllUsers.results.length > 0 && partnerDetails.getAllUsers.results.map((item, index) => {
                    country = item && item.profile && item.profile.country;
                    return (
                      <tr key={index}>
                        <td data-label={formatMessage(messages.id)}>{item && item.profile && item.profile.profileId}</td>
                        <td data-label={formatMessage(messages.firstName)}>{item && item.profile && capitalizeFirstLetter(item.profile.firstName)}</td>
                        <td data-label={formatMessage(messages.lastName)}>{item && item.profile && capitalizeFirstLetter(item.profile.lastName)}</td>
                        <td data-label={formatMessage(messages.email)}>{item.email}</td>
                        <td data-label={formatMessage(messages.country)}>{country}</td>
                        <td data-label={formatMessage(messages.phoneNumber)}>{item && item.phoneDialCode}{item.phoneNumber}</td>
                        <td data-label={formatMessage(messages.createdAt)}>{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                        <td data-label={formatMessage(messages.userStatus)}>
                          <select name="userStatus" className={bt.selectInput}
                            onChange={(e) => this.handleUserStatusChange(e, item.id, item.email, item.phoneDialCode, item.phoneNumber, item.isBan, item.phoneCountryCode, currentPage)} value={item.userStatus}>
                            <option value="pending">{formatMessage(messages.pending)}</option>
                            <option value="active">{formatMessage(messages.active)}</option>
                            <option value="inactive">{formatMessage(messages.inactive)}</option>
                          </select>
                        </td>
                        <td data-label={formatMessage(messages.banStatus)}>
                          <select name="isBan" className={bt.selectInput}
                            onChange={(e) => this.handleBanStatusChange(e, item.id, item.email, item.phoneDialCode, item.phoneNumber, item.userStatus, item.phoneCountryCode, currentPage)} value={item.isBan}>
                            <option value="0">{formatMessage(messages.permit)}</option>
                            <option value="1">{formatMessage(messages.ban)}</option>
                          </select>
                        </td>
                        <td data-label={formatMessage(messages.action)}>
                          <Link to={'/siteadmin/partners/' + item.profile.profileId} className={cx('editAlign', s.noLink)}>
                            <span><img src={EditIcon} className={cx(s.editIcon, 'editIconRTL')} /></span>
                            <span className={s.vtrMiddle}>
                              <FormattedMessage {...messages.editAction} />
                            </span>
                          </Link>
                        </td>
                        <td data-label={formatMessage(messages.deleteAction)}>

                          <Button onClick={() => this.handleDelete(item.profile.profileId, currentPage, 2)} className={s.iconBtn}>
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
                  (!loading && (partnerDetails && partnerDetails.getAllUsers && partnerDetails.getAllUsers.results.length == 0)) && (
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
          partnerDetails && partnerDetails.getAllUsers && partnerDetails.getAllUsers.results && partnerDetails.getAllUsers.results.length > 0
          && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={partnerDetails.getAllUsers.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.partner)}
            />
          </div>
        }
      </div>
    );
  }
}
const mapState = (state) => ({
  loading: state.intl.loading
});
const mapDispatch = {
  deleteUser,
  editPartner
};
export default compose(injectIntl,
  withStyles(s, bt),
  graphql(getAllPartners, {
    name: 'partnerDetails',
    options: {
      variables: {
        currentPage: 1,
        searchList: '',
        userType: 2
      },
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }),
  connect(mapState, mapDispatch)
)(PartnerList);
