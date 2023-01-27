import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AddPricing.css';
import PricingForm from '../../../../components/SiteAdmin/Pricing/PricingForm';
import messages from '../../../../locale/messages';
class AddPricing extends React.Component {

  render() {
    const { formatMessage } = this.props.intl;
    const { locations, categories, subCategories } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.paddingRoutesSection}>
            <PricingForm
              locations={locations}
              categories={categories}
              subCategories={subCategories}
              initialValues={{ currency: 'USD', isActive: 'true' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(gql`
    query {
      getAllLocation {
          results {
              id
              locationName
              isActive
          }
          status
      }
    }`, {
    name: 'locations',
    options: (props) => ({
      ssr: true,
      fetchPolicy: 'network-only'
    })
  }),
  graphql(gql`
      query {
        getActiveCategories {
        results{
            id
            name
            pricingType
        }
        status
      }
    }`, {
    name: 'categories',
    options: (props) => ({
      ssr: true,
      fetchPolicy: 'network-only'
    })
  }),
  graphql(gql`
      query {
        getActiveSubCategories {
        results{
            id
            name
            categoryId
        }
        status
      }
    }`, {
    name: 'subCategories',
    options: (props) => ({
      ssr: true,
      fetchPolicy: 'network-only'
    })
  }),
)(AddPricing);
