import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';

import PartnerList from '../../../components/Partners/PartnersList/PartnerList';
import s from './Partners.css';
import messages from '../../../locale/messages';

class Partners
 extends React.Component {

  render() {
    const { formatMessage } = this.props.intl;

    return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.partnerMenu)}
            </div>
            <div className={s.paddingRoutesSection}>
              <PartnerList />
            </div>
          </div>
        </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s))(Partners);
