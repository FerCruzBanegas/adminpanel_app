import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ManageNotifications.css';
import cx from 'classnames';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import ManageNotificationsForm from '../../../components/SiteAdmin/ManageNotificationsForm';


export class ManageNotifications extends Component {

  render() {
    const { formatMessage } = this.props.intl;
    const { siteName } = this.props;
    
    let initialValues = {
      to: "all",
      messageType: "pushNotification",
      title: siteName
    };

    return (
      <div>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.manageNotifications)}
            </div>
            <div className={cx(s.paddingRoutesSection, s.responsiveNoPadding)}>
              <ManageNotificationsForm initialValues={initialValues} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default compose(
  injectIntl,
  withStyles(s)
)(ManageNotifications)
