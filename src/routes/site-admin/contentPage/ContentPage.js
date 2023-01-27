import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ContentPage.css';

import ContentPageList from '../../../components/SiteAdmin/ContentPage/ContentPageList';
import Loader from '../../../components/Common/Loader/Loader';

import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

import getContentPageDetails from './getContentPageDetails.graphql';

export class ContentPage extends Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getContentPageDetails: PropTypes.any
    })
  };

  static defaultProps = { data: { loading: true } };

  render() {
    const { data: { loading, getContentPageDetails } } = this.props;

    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}><FormattedMessage {...messages.contentpageManagement} /></div>
            <div className={s.paddingRoutesSection}>
            {!loading &&  <ContentPageList data={getContentPageDetails && getContentPageDetails.results || []} /> }
            </div>
          </div>
        </div>
      </Loader>
    )
  }
}


export default compose(
  withStyles(s),
  graphql(getContentPageDetails,
    {
      options: {
        fetchPolicy: 'network-only',
        ssr: false
      }
    })
)(ContentPage)
