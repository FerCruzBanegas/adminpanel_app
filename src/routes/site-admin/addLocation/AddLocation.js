import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import ManageLocationForm from '../../../components/SiteAdmin/ManageLocation/ManageLocationForm';
import s from './AddLocation.css'

export class AddLocation extends Component {

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.root}>
        <div className={s.container}>
        <div className={cx(s.paddingRoutesSection, s.responsiveNoPadding)}>
            <ManageLocationForm />
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
)(AddLocation)
