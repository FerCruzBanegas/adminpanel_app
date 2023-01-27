import React from 'react';

import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import getPromoCodeQuery from './getPromoCode.graphql';

import PromoCodeForm from '../../../../components/SiteAdmin/PromoCode/PromoCodeForm';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditPromoCode.css';

class EditPromoCode extends React.Component {
  render() {
    const { promoCode: { loading, getPromoCode } } = this.props;
    
    let initialValues = {};
    if (!loading && getPromoCode) initialValues = getPromoCode && getPromoCode.result;

    return (
      <div className={s.paddingRoutesSection}>
        { !loading && <PromoCodeForm initialValues={initialValues} /> }
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getPromoCodeQuery, {
    name: 'promoCode',
    options: (props) => ({
      ssr: true,
      fetchPolicy: 'network-only',
      variables: {
        id: props.id
      }
    })
  }))(EditPromoCode);
