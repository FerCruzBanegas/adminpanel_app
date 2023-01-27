import React, { Component } from 'react'
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AddContentPage.css';

import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import Loader from '../../../components/Common/Loader/Loader';

export class AddContentPage extends Component {

  constructor(props) {
    super(props)
    this.component = null;
    this.state = { loading: true }
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && typeof document !== undefined) {
      this.setState({
        loading: false
      });
      this.component = require('../../../components/SiteAdmin/ContentPage/AddContentPageForm').default
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { loading } = this.state;
    const isBrowser = typeof window !== 'undefined';
    const isDocument = typeof document !== undefined;
    const AddContentPageForm = this.component;

    return (

      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>{formatMessage(messages.contentpageManagement)}</div>
            <div className={s.paddingRoutesSection}>
              {!loading && isBrowser && isDocument && <AddContentPageForm />}
            </div>
          </div>
        </div>
      </Loader>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s)
)(AddContentPage)
