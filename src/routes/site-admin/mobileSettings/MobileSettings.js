import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import s from './MobileSettings.css';

import MobileSettingsForm from '../../../components/SiteAdmin/MobileSettingsForm/MobileSettingsForm';
import Loader from '../../../components/Common/Loader/Loader';

import messages from '../../../locale/messages';

import getSiteSettings from './getSiteSettings.graphql';

export class MobileSettings extends Component {
  render() {
    const { getSiteSettings: { loading, getSiteSettings, refetch }, intl: { formatMessage } } = this.props;
    let mobileSettingsCollection = {}

    getSiteSettings && getSiteSettings.results && getSiteSettings.results.length > 0 && getSiteSettings.results.map((item) => mobileSettingsCollection[item.name] = item.value);

    return (
      <Loader type={"page"} show={loading}>
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>{formatMessage(messages.mobileSettings)}</div>
          <div className={cx(s.paddingRoutesSection, s.responsiveNoPadding)}>
          {!loading && <MobileSettingsForm refetch={refetch} getSiteSettings={getSiteSettings} initialValues={mobileSettingsCollection} /> }
          </div>
        </div>
      </div>
      </Loader>
    )

  }
}


export default compose(
  injectIntl,
  withStyles(s),
  graphql(getSiteSettings, {
    name: 'getSiteSettings',
    options: (props) => ({
      fetchPolicy: "network-only",
      variables: { type: 'appSettings' },
      ssr: true,
    }),
  })
)(MobileSettings)
