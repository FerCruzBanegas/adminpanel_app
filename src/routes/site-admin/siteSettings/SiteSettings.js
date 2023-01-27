import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';

import { graphql } from 'react-apollo';
import getSiteSettings from './getSiteSettings.graphql';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SiteSettings.css';

import SiteSettingsForm from '../../../components/SiteAdmin/SiteSettingsForm';
import Loader from '../../../components/Common/Loader/Loader';

import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

export class SiteSettings extends Component {

  render() {
    const { getSiteSettings: { loading, getSiteSettings, refetch }, intl: { formatMessage } } = this.props;
    let siteSettingsCollection = {}


    getSiteSettings && getSiteSettings.results && getSiteSettings.results.length > 0 && getSiteSettings.results.map((item) => siteSettingsCollection[item.name] = item.value);

    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>{formatMessage(messages.siteSettings)}</div>
            <div className={s.paddingRoutesSection}>
              {!loading && <SiteSettingsForm refetch={refetch} getSiteSettings={getSiteSettings} initialValues={siteSettingsCollection} />}
            </div>
          </div>
        </div>
      </Loader>
    );
  }
}


export default compose(
  injectIntl,
  withStyles(s),
  graphql(getSiteSettings, {
    name: 'getSiteSettings',
    options: (props) => ({
      fetchPolicy: "network-only",
      variables: { type: 'site_settings' },
      ssr: true,
    })
  })
)(SiteSettings)
