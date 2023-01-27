import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';

import Loader from '../../../components/Common/Loader/Loader';
import s from './EditStaticPage.css';
import getEditStaticPage from './getEditStaticPage.graphql'
import messages from '../../../locale/messages';
export class EditStaticPage extends Component {

  static defaultProps = {
    data: {
      loading: true
    }
  }

  constructor(props) {
    super(props)
    this.component = null;
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && typeof document !== undefined) {
      this.component = require('../../../components/SiteAdmin/StaticPageEditForm').default
    }
  }


  render() {
    const { data: { loading, getEditStaticPage } } = this.props;
    const { formatMessage } = this.props.intl;
    const isBrowser = typeof window !== 'undefined';
    const isDocument = typeof document !== undefined;
    const StaticPageEditForm = this.component;

    let title = formatMessage(messages.staticpageManagement);
    let initialValues = {};
    if (getEditStaticPage && getEditStaticPage.result) {
      initialValues = {
        id: getEditStaticPage.result.id,
        pageName: getEditStaticPage.result.pageName,
        content: getEditStaticPage.result.content,
        createdAt: getEditStaticPage.result.createdAt,
        metaTitle: getEditStaticPage.result.metaTitle,
        metaDescription: getEditStaticPage.result.metaDescription,
        pageBanner: getEditStaticPage.result.pageBanner
      }
    }

    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.paddingRoutesSection}>
              {!loading && isBrowser && isDocument && <StaticPageEditForm title={title} initialValues={initialValues} />}
            </div>
          </div>
        </div>
      </Loader>
    )
  }
}


export default compose(injectIntl, withStyles(s), graphql(getEditStaticPage, {
  options: (props) => ({
    variables: {
      id: props.id
    },
    fetchPolicy: 'network-only',
    ssr: false
  })
}))(EditStaticPage)
