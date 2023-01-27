import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import AdminDashboard from '../../../components/SiteAdmin/AdminDashboard/AdminDashboard'
import Loader from '../../../components/Common/Loader/Loader';
import s from './Dashboard.css';
import { adminLogout } from '../../../actions/siteadmin/logout';
import getDashboardCount from './getDashboardCount.graphql';
import getAdminUser from './GetAdminUser.graphql';
class Dashboard extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    getDashboardCount: PropTypes.object
  };

  render() {
    const { getDashboardCount: { loading, getDashboardCount: earnings }, getDashboardCount, getAdminUser, title, adminLogout } = this.props;
    if (getAdminUser.getAdminUser && getAdminUser.getAdminUser.result === null) {
      adminLogout()
    }
    const todayEarnings = earnings && earnings.result && earnings.result.todayEarnings.reduce(
      function (a, b) {
        return a + parseFloat(b.userServiceFee) + parseFloat(b.partnerServiceFee)
      }, 0
    ).toFixed(2)

    const weeklyEarnings = earnings && earnings.result && earnings.result.weeklyEarnings.reduce(
      function (a, b) {
        return a + parseFloat(b.userServiceFee) + parseFloat(b.partnerServiceFee)
      }, 0
    ).toFixed(2)

    const monthlyEarnings = earnings && earnings.result && earnings.result.monthlyEarnings.reduce(
      function (a, b) {
        return a + parseFloat(b.userServiceFee) + parseFloat(b.partnerServiceFee)
      }, 0
    ).toFixed(2)

    const totalEarnings = earnings && earnings.result && earnings.result.totalEarnings.reduce(
      function (a, b) {
        return a + parseFloat(b.userServiceFee) + parseFloat(b.partnerServiceFee)
      }, 0
    ).toFixed(2)

    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
          {!loading &&   <AdminDashboard
              title={title}
              getDashboardCount={earnings}
              todayEarnings={todayEarnings}
              weeklyEarnings={weeklyEarnings}
              monthlyEarnings={monthlyEarnings}
              totalEarnings={totalEarnings}
            />
          }
          </div>
        </div>
      </Loader>
    );
  }
}
const mapState = state => ({})

const mapDispatch = {
  adminLogout
}

export default compose(
  withStyles(s),
  (connect(mapState, mapDispatch)),
  graphql(getDashboardCount, {
    name: 'getDashboardCount',
    options: {
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }),
  graphql(getAdminUser,
    {
      name: 'getAdminUser',
      options: {
        ssr: true,
        fetchPolicy: 'network-only'
      }
    }
  ),
)(Dashboard);
