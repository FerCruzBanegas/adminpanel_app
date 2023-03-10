// import React from 'react';
import React from "react";
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Navigation.css';
import { Nav } from 'react-bootstrap';

import NavLink from '../NavLink';
import messages from '../../locale/messages';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Nav className={s.navigationLink}>
          <NavLink to="/"><FormattedMessage {...messages.homeonly} /></NavLink>
          <NavLink to="/user" ><FormattedMessage {...messages.user} /></NavLink>
          <NavLink to="/partner" ><FormattedMessage {...messages.partner} /></NavLink>
          <NavLink to="/support"><FormattedMessage {...messages.contact} /></NavLink>
        </Nav>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
