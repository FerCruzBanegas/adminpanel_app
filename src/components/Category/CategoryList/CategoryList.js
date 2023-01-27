import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, Button, FormControl, ButtonToolbar } from 'react-bootstrap';
import cx from 'classnames';
import s from './CategoryList.css';
import bt from '../../../components/commonStyle.css';
//local
import messages from '../../../locale/messages';

import Link from '../../Link';
import CustomPagination from '../../CustomPagination';
import Loader from '../../../components/Common/Loader';
import history from '../../../history';
import updateCategoryStatus from '../../../actions/siteadmin/Category/updateCategoryStatus';
import deleteCategory from '../../../actions/siteadmin/Category/deleteCategory';
import getAllCategory from './getAllCategory.graphql';
import debounce from '../../../helpers/debounce';

//Images
import EditIcon from '../../../../public/Icons/editIcon.svg';
import TrashIcon from '../../../../public/Icons/deleteIcon.svg';

class CategoryList extends React.Component {
  static propTypes = {
    categoryDetails: PropTypes.object,
  };
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      searchList: '',
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this));
    this.handleStatus = this.handleStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    history.push('/add')
  }

  handleKeywordSearch(searchList) {
    const { categoryDetails: { refetch } } = this.props
    let variables = {
      currentPage: 1,
      searchList: searchList
    }
    this.setState({ searchList, currentPage: 1 });
    refetch(variables);;
  }

  async handleDelete(id, currentPage) {
    const { deleteCategory, categoryDetails: { refetch } } = this.props;
    let variables = { currentPage }
    await deleteCategory(id, currentPage);
    refetch(variables)
  }

  paginationData(currentPage) {
    const { categoryDetails: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  async handleStatus(id, currentPage, fieldName, e) {
    const { updateCategoryStatus, categoryDetails: { refetch } } = this.props;
    await updateCategoryStatus(id, currentPage, fieldName, e.target.value);
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  render() {
    const { categoryDetails, categoryDetails: { getAllCategory }, loading } = this.props;
    const { formatMessage } = this.props.intl;
    const { currentPage } = this.state;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={cx(s.searchInput, 'searchInputRTL')}>
          <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(event) => this.handleKeywordSearch(event.target && event.target.value)} className={bt.formControlInput} />
        </div>
        <div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide, 'floatLeftRTL', 'floatMbRightRTL')}>
          <Link to={"/siteadmin/category/add"} className={cx(bt.btnPrimary)} >{formatMessage(messages.addCategory)}</Link>
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
                  <th scope="col"><FormattedMessage {...messages.categoryName} /></th>
                  <th scope="col"><FormattedMessage {...messages.createdAt} /></th>
                  <th scope="col"><FormattedMessage {...messages.status} /></th>
                  <th scope="col"><FormattedMessage {...messages.isPopular} /></th>
                  <th scope="col"><FormattedMessage {...messages.action} /></th>
                  <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
                </tr>
              </thead>
              <tbody>
                {
                  categoryDetails && categoryDetails.getAllCategory && categoryDetails.getAllCategory.results && categoryDetails.getAllCategory.results.length > 0 && categoryDetails.getAllCategory.results.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label={formatMessage(messages.id)}>{item.id}</td>
                        <td data-label={formatMessage(messages.categoryName)}>{item.name}</td>
                        <td data-label={formatMessage(messages.createdAt)}>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                        <td data-label={formatMessage(messages.status)}>
                          <select value={item.status} onChange={(e) => { this.handleStatus(item.id, currentPage, 'status', e) }} className={bt.selectInput}>
                            <option value="active">{formatMessage(messages.active)}</option>
                            <option value="inactive">{formatMessage(messages.inactive)}</option>
                          </select>
                        </td>
                        <td data-label={formatMessage(messages.isPopular)}>
                          <select value={item.isPopular ? 'true' : 'false'} onChange={(e) => { this.handleStatus(item.id, currentPage, 'isPopular', e) }} className={bt.selectInput}>
                            <option value="true">{formatMessage(messages.yes)}</option>
                            <option value="false">{formatMessage(messages.no)}</option>
                          </select>
                        </td>
                        <td data-label={formatMessage(messages.action)}>
                          <Link to={'/siteadmin/category/edit/' + item.id} className={cx('editAlign', s.noLink)}>
                            <span><img src={EditIcon} className={cx(s.editIcon, 'editIconRTL')} /></span>
                            <span className={cx(s.vtrMiddle, s.top)}>
                              <FormattedMessage {...messages.editAction} />
                            </span>
                          </Link>
                        </td>
                        <td data-label={formatMessage(messages.deleteAction)}>

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
                  !loading && categoryDetails && categoryDetails.getAllCategory && categoryDetails.getAllCategory.results && categoryDetails.getAllCategory.results.length == 0 && (
                    <tr>
                      <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </div>}
        {
          categoryDetails && categoryDetails.getAllCategory && categoryDetails.getAllCategory.results && categoryDetails.getAllCategory.results.length > 0
          && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={categoryDetails.getAllCategory.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.categorieslist)}
            />
          </div>
        }
      </div>
    );
  }
}
const mapDispatch = {
  updateCategoryStatus,
  deleteCategory
};
const mapState = (state) => ({
  loading: state.intl.loading
});
export default injectIntl(compose(
  withStyles(s, bt),
  graphql(getAllCategory, {
    name: 'categoryDetails',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only'
    }
  }),
  connect(mapState, mapDispatch)
)(CategoryList))
