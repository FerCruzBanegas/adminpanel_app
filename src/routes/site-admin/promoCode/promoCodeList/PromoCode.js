import React from 'react';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './PromoCode.css';

import PromoCodeList from '../../../../components/SiteAdmin/PromoCode/PromoCodeList';
import Loader from '../../../../components/Common/Loader/Loader';

import { graphql } from 'react-apollo';
import getAllPromoCodeQuery from './getAllPromoCode.graphql';

import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

class PromoCode extends React.Component {

  static defaultProps = { promoCodes: { loading: true } };

  render() {
    const { promoCodes, promoCodes: { loading }, intl: { formatMessage } } = this.props;
    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>  {formatMessage(messages.managePromoCode)}</div>
            <div className={s.paddingRoutesSection}> 
            {!loading && <PromoCodeList promoCodes={promoCodes} /> }
            </div>
          </div>
        </div>
      </Loader>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(getAllPromoCodeQuery, {
    name: 'promoCodes',
    options: {
      ssr: true,
      fetchPolicy: 'network-only',
      variables: {
        currentPage: 1
      }
    }
  }))(PromoCode);
