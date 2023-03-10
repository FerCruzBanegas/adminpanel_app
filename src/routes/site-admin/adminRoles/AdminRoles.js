import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AdminRoles.css';
import cx from 'classnames';
import { injectIntl } from 'react-intl';

import AdminRolesManagement from '../../../components/SiteAdmin/AdminRolesManagement';
import Loader from '../../../components/Common/Loader/Loader';

import messages from '../../../locale/messages';
import adminRolesQuery from './adminRolesQuery.graphql';
class AdminRoles extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllAdminRoles: PropTypes.array,
    })
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render () {
    const { formatMessage } = this.props.intl;
    const { data: { loading, getAllAdminRoles } } = this.props;

    if(loading){
      return <Loader type={"page"} />;
    } else {
      return(<div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            {formatMessage(messages.manageAdminRoles)}
          </div>
          <div className={cx(s.paddingRoutesSection, s.responsiveNoPadding)}>
          <AdminRolesManagement data={getAllAdminRoles} />
          </div>
        </div>
      </div>) 
      
    }
  }

}

export default compose(
    injectIntl,
    withStyles(s),
    graphql(adminRolesQuery, {
      options: {
        fetchPolicy: 'network-only'
      }
    }),
)(AdminRoles);