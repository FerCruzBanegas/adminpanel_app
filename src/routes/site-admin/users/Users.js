import React from 'react';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Users.css';
import UserList from '../../../components/Users/UsersList/UserList';
import messages from '../../../locale/messages'
class Users extends React.Component {

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            {formatMessage(messages.usersMenu)}
          </div>
          <div className={s.paddingRoutesSection}>
            <UserList />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(injectIntl, withStyles(s))(Users);