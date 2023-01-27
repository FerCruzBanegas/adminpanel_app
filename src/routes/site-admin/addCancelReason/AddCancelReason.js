import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AddCancelReason.css';
import AddCancelReasonForm from '../../../components/SiteAdmin/AddCancelReasonForm';


export class AddCancelReason extends Component {

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.paddingRoutesSection}>
            <AddCancelReasonForm />
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
)(AddCancelReason)
