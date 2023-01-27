import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import StaticPageManagement from '../../../components/SiteAdmin/StaticPageManagement';
import s from './StaticPage.css';
import messages from '../../../locale/messages';
export class StaticPage extends Component {

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            {formatMessage(messages.staticpageManagement)}
          </div>
          <div className={s.paddingRoutesSection}>
            <StaticPageManagement />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapStateToProps, mapDispatchToProps)
)(StaticPage)
