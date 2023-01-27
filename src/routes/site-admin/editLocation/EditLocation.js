import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';

import EditLocationForm from '../../../components/SiteAdmin/EditLocationForm/EditLocationForm';
import Loader from '../../../components/Common/Loader/Loader';
import NotFound from '../../../components/NotFound/NotFound';
import s from './EditLocation.css';
import getLocation from './getLocation.graphql';
import messages from '../../../locale/messages';
export class EditLocation extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired
  }
  static defaultProps = {
    data: {
      loading: true
    }
  }

  render() {

    const { formatMessage } = this.props.intl;
    const { data: { loading, getLocation }, data, id } = this.props;

    let initialValues = {};

    if (!loading && getLocation && getLocation.result) {
      initialValues = {
        id: getLocation.result.id,
        locationName: getLocation.result.locationName,
        description: getLocation.result.description,
        path: JSON.parse(getLocation.result.coordinates),
        isActive: getLocation.result.isActive,
      }
    }
    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.editLocation)}
            </div>
            <div className={s.paddingRoutesSection}>
              {!loading && <EditLocationForm initialValues={initialValues} />}
            </div>
          </div>
        </div>
      </Loader>
    )

  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(getLocation, {
    options: (props) => ({
      variables: {
        id: props.id
      },
      fetchPolicy: 'network-only',
      ssr: false
    })
  }))(EditLocation)
