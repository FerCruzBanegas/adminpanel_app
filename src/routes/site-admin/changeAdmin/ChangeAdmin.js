import React from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ChangeAdmin.css';
import ChangeAdminForm from '../../../components/SiteAdmin/ChangeAdminForm';
import messages from '../../../locale/messages';

class ChangeAdmin extends React.Component {

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            {formatMessage(messages.changeAdminPassword)}
          </div>
          <div className={s.paddingRoutesSection}>
            <ChangeAdminForm />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s)
)(ChangeAdmin);
