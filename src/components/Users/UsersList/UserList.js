import React from 'react';
import { flowRight as compose } from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { Table, ButtonToolbar, Button, FormControl } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './UserList.css';
import cx from 'classnames';
import bt from '../../../components/commonStyle.css';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import Link from '../../Link/Link';
import CustomPagination from '../../CustomPagination/CustomPagination';
import CurrencyConverter from '../../CurrencyConverter/CurrencyConverter';

import deleteUser from '../../../actions/siteadmin/Users/deleteUser';
import getAllUsers from './getAllUsers.graphql'
import { editUser } from '../../../actions/siteadmin/Users/editUser';
//Images
import TrashIcon from '../../../../public/Icons/deleteIcon.svg';
import EditIcon from '../../../../public/Icons/editIcon.svg';
import ExportImage from '../../../../public/Icons/export.png';


//Helpers
import debounce from '../../../helpers/debounce'
import Loader from '../../Common/Loader/Loader';

class UsersList extends React.Component {
  static propTypes = {
    userDetails: PropTypes.object,
    deleteUser: PropTypes.any
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
    this.handleBanStatusChange = this.handleBanStatusChange.bind(this);
  }
  handleKeywordSearch(searchList) {
    const { userDetails: { refetch } } = this.props
    let variables = {
      currentPage: 1,
      searchList
    }
    this.setState(variables)
    refetch(variables)
  }
  async handleDelete(profileId, currentPage, userType) {
    const { deleteUser, userDetails: { refetch } } = this.props;
    let variables = { currentPage }
    await deleteUser(profileId, currentPage, userType);
    refetch(variables)
  }
  async handleUserStatusChange(e, id, email, phoneDialCode, phoneNumber, isBan, phoneCountryCode, currentPage) {
    const { editUser, userDetails: { refetch } } = this.props;
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
    let variables = { currentPage }
    await editUser(data);
    refetch(variables);
  }
  async handleBanStatusChange(e, id, email, phoneDialCode, phoneNumber, userStatus, phoneCountryCode, currentPage) {
    const { editUser, userDetails: { refetch } } = this.props;
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
    let variables = { currentPage }
    await editUser(data);
    refetch(variables);
  }
  paginationData(currentPage) {
    const { userDetails: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  render() {
    const { userDetails, userDetails: { getAllUsers }, loading } = this.props;
    const { currentPage, searchList } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={s.exportDisplay}>
          <div>
            <div className={cx(s.searchInput, 'searchInputRTL')}>
              <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleKeywordSearch(e.target && e.target.value)} className={bt.formControlInput} />
            </div>
          </div>

          <div className={cx(s.exportTextSection, 'textAlignLeftRTL', 'textAlignRightMbRTL')}>
            {
              userDetails && userDetails.getAllUsers && userDetails.getAllUsers.results && userDetails.getAllUsers.results.length > 0 && <a
                href={`/export-admin-data?type=users&keyword=${searchList ? searchList : ''}`}
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
          <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'newAdminResponsiveTable', 'NewResponsiveTable')}>
            <Table className="table">
              <thead>
                <tr>
                  <th scope="col"><FormattedMessage {...messages.id} /></th>
                  <th scope="col"><FormattedMessage {...messages.firstName} /></th>
                  <th scope="col"><FormattedMessage {...messages.lastName} /></th>
                  <th scope="col"><FormattedMessage {...messages.email} /></th>
                  <th scope="col"><FormattedMessage {...messages.walletBalance} /></th>
                  <th scope="col"><FormattedMessage {...messages.country} /></th>
                  <th scope="col"><FormattedMessage {...messages.phoneNumber} /></th>
                  <th scope="col"><FormattedMessage {...messages.createdAt} /></th>
                  <th scope="col"><FormattedMessage {...messages.banStatus} /></th>
                  <th scope="col"><FormattedMessage {...messages.action} /></th>
                  <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
                </tr>
              </thead>
              <tbody>
                {
                  userDetails && userDetails.getAllUsers && userDetails.getAllUsers.results && userDetails.getAllUsers.results.length > 0 && userDetails.getAllUsers.results.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label={formatMessage(messages.id)}>{item && item.profile && item.profile.profileId}</td>
                        <td data-label={formatMessage(messages.firstName)}>{item && item.profile && item.profile.firstName}</td>
                        <td data-label={formatMessage(messages.lastName)}> {item && item.profile && item.profile.lastName}</td>
                        <td data-label={formatMessage(messages.email)}>{item.email}</td>
                        <td data-label={formatMessage(messages.walletBalance)}>{item && item.profile && <CurrencyConverter from={item.profile.preferredCurrency} amount={item.profile.walletBalance} />}</td>
                        <td data-label={formatMessage(messages.country)}>{item && item.profile && item.profile.country}</td>
                        <td data-label={formatMessage(messages.phoneNumber)}>{item && item.phoneDialCode}{item && item.phoneNumber}</td>
                        <td data-label={formatMessage(messages.createdAt)}>{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                        <td data-label={formatMessage(messages.banStatus)}>
                          <select name="isBan" className={bt.selectInput}
                            onChange={(e) => this.handleBanStatusChange(e, item.id, item.email, item.phoneDialCode, item.phoneNumber, item.userStatus, item.phoneCountryCode, currentPage)} value={item.isBan}>
                            <option value="0">{formatMessage(messages.permit)}</option>
                            <option value="1">{formatMessage(messages.ban)}</option>
                          </select>
                        </td>
                        <td data-label={formatMessage(messages.action)}>
                          <Link to={'/siteadmin/users/' + item.profile.profileId} className={s.noLink}>
                            <span><img src={EditIcon} className={cx(s.editIcon, 'editIconRTL')} /></span>
                            <span className={cx(s.vtrMiddle)}>
                              <FormattedMessage {...messages.editAction} />
                            </span>
                          </Link>
                        </td >
                        <td data-label={formatMessage(messages.deleteAction)}>

                          <Button onClick={() => this.handleDelete(item.profile.profileId, currentPage, 1)} className={s.iconBtn}>
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
                  (!loading && (userDetails && userDetails.getAllUsers && userDetails.getAllUsers.results.length == 0)) && (
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
          userDetails && userDetails.getAllUsers && userDetails.getAllUsers.results && userDetails.getAllUsers.results.length > 0
          && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={userDetails.getAllUsers.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.users)}
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
  editUser
};
export default compose(injectIntl,
  withStyles(s, bt),
  graphql(getAllUsers, {
    name: 'userDetails',
    options: {
      variables: {
        currentPage: 1,
        searchList: '',
        userType: 1
      },
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }),
  connect(mapState, mapDispatch)
)(UsersList);
