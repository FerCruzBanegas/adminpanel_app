import React from 'react';

import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import getSmsMethodQuery from './getSmsMethod.graphql';

import SmsForm from '../../../../components/SiteAdmin/SmsMethod/SmsForm/SmsForm';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditSmsMethod.css';

class EditSmsMethod extends React.Component {
  render() {
    const { smsMethod: { loading, getSmsMethod } } = this.props;

    let initialValues = {};
    if (!loading && getSmsMethod) initialValues = getSmsMethod && getSmsMethod.result;

    return (
      <div className={s.paddingRoutesSection}>
        {!loading && <SmsForm initialValues={initialValues} />}
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getSmsMethodQuery, {
    name: 'smsMethod',
    options: (props) => ({
      ssr: true,
      fetchPolicy: 'network-only',
      variables: {
        id: props.id
      }
    })
  }))(EditSmsMethod);
