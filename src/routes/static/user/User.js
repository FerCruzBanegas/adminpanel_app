import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import Page from '../../../components/Page/Page';
import SafetyGrid from '../../../components/Home/SafetyGrid/SafetyGrid';
import { HomeProvider } from '../../context/homeContext';
import s from './User.css';

import getAllHomePageSettings from './getAllHomePageSettings.graphql'

class User extends React.Component {

  render() {
    const { getAllHomePageSettings: { loading, getAllHomePageSettings }, data: { getEditStaticPage, loading: staticLoading } } = this.props
    let homeSettings = {}
    if (!loading) {
      getAllHomePageSettings && getAllHomePageSettings.homePageData.map((item) => {
        homeSettings[item.name] = item.value
      })
    }

    const pageBanner = getEditStaticPage && getEditStaticPage.result.pageBanner

    return (
      <div>
        {!loading && !staticLoading &&
          <div>
            <HomeProvider value={homeSettings}>
              <div className={s.homeBanner} />
              <Page
                html={getEditStaticPage && getEditStaticPage.result.content}
                title={getEditStaticPage && getEditStaticPage.result.metaTitle}
                pageBanner={pageBanner}
              />
              <div className={s.riderBlog}>
                <SafetyGrid />
              </div>
            </HomeProvider>
          </div>}
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getAllHomePageSettings, {
    name: 'getAllHomePageSettings',
    options: {
      ssr: true
    }
  })
)(User);
