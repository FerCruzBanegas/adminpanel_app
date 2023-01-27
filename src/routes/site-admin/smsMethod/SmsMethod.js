import React from 'react';
import { injectIntl } from 'react-intl';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SmsMethod.css';

import SmsMethodList from '../../../components/SiteAdmin/SmsMethod/SmsMethodList';

import messages from '../../../locale/messages';
class SmsMethod extends React.Component {

  render() {
    const { formatMessage } = this.props.intl;

    return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.manageSmsMethod)}
            </div>
            <div className={s.paddingRoutesSection}>
              <SmsMethodList />
            </div>
          </div>
        </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s))(SmsMethod);
