
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Login.css';
import cx from 'classnames';

import AdminLoginForm from '../../components/SiteAdmin/AdminLoginForm';
import getSiteSettings from './getSiteSettings.graphql';


class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { getSiteSettings: { getSiteSettings, loading } } = this.props;
    let siteName;

    if(!loading) {
      let siteSettings = getSiteSettings && getSiteSettings.status === 200 && getSiteSettings.results && getSiteSettings.results.filter((item) => item.name == 'siteName')
      siteName = siteSettings && siteSettings[0].value
    }

    return (
      <div className={cx(s.root, 'rootRTL')}>
       
          {!loading && <AdminLoginForm siteName={siteName} />}
       
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getSiteSettings, {
    name: 'getSiteSettings',
    options: {
      ssr: true
    }
  })
)(Login);
