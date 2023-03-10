import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Home.css';
import getActiveCategories from './getActiveCategories.graphql'
import getSiteSettings from './getSiteSettings.graphql'
import getAllHomePageSettings from './getAllHomePageSettings.graphql'
import getAllHomePageCategorySettings from './getAllHomePageCategorySettings.graphql'

//Components
import HomeSection from '../../components/Home/HomeSection/HomeSection';
import CitySection from '../../components/Home/CitySection/CitySection';
import SafetyGrid from '../../components/Home/SafetyGrid/SafetyGrid';
import AboutGrid from '../../components/Home/AboutGrid/AboutGrid';
import SignupGrid from '../../components/Home/SignupGrid/SignupGrid';
import HomePageCategorySection from '../../components/Home/HomePageCategorySection/HomePageCategorySection'
import { HomeProvider } from '../context/homeContext'

class Home extends React.Component {

  render() {
    const { getCategories: { getActiveCategories }, getSiteSettings: { getSiteSettings, loading }, getAllHomePageSettings: { loading: homeLoading, getAllHomePageSettings } } = this.props
    const { getAllHomePageCategorySettings: { getAllHomePageCategorySettings } } = this.props;
    let siteSettings = {}
    let homeSettings = {}
    if (!loading && !homeLoading) {
      getSiteSettings && getSiteSettings.status === 200 && getSiteSettings.results && getSiteSettings.results.map((item) => {
        siteSettings[item.name] = item.value
      })

      getAllHomePageSettings && getAllHomePageSettings.homePageData.map((item) => {
        homeSettings[item.name] = item.value
      })
    }
    let categoryList = getAllHomePageCategorySettings &&
      getAllHomePageCategorySettings.results && getAllHomePageCategorySettings.results.length > 0 &&
      getAllHomePageCategorySettings.results || []

    return (
      <div>
        {!loading && !homeLoading &&
          <div>
            <HomeProvider value={homeSettings}>
              <div className={s.homeBanner} />
              <HomeSection />
              <CitySection data={getActiveCategories} />
              {/* <AboutGrid /> */}
              <SafetyGrid />
              <SignupGrid />
              <HomePageCategorySection data={categoryList} />
            </HomeProvider>
          </div>}
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getActiveCategories, {
    name: 'getCategories',
    options: {
      ssr: true,
      //fetchPolicy: 'network-only'
    }
  }),
  graphql(getSiteSettings, {
    name: 'getSiteSettings',
    options: {
      ssr: true
    }
  }),
  graphql(getAllHomePageSettings, {
    name: 'getAllHomePageSettings',
    options: {
      ssr: true
    }
  }),
  graphql(getAllHomePageCategorySettings, {
    name: 'getAllHomePageCategorySettings',
    options: {
      ssr: true
    }
  })
)(Home);
