import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Footer.css';
import bt from '../../components/commonStyle.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from '../../locale/messages';
import cx from 'classnames';
import { connect } from 'react-redux'
import { flowRight as compose } from 'lodash'
import { graphql } from 'react-apollo';

import Link from '../../components/Link';

import getAllHomePageSettings from './getAllHomePageSettings.graphql';
import getContentPageDetails from './getContentPage.graphql';
import { siteUrl } from '../../config';
/*Images*/
import FaceBookIcon from '../../../public/Icons/fb.png';
import InstaIcon from '../../../public/Icons/linkedin.png';
import TwitterIcon from '../../../public/Icons/twitter.png';
import YouTupeIcon from '../../../public/Icons/youtube.png';
import { api } from '../../config'

class Footer extends React.Component {
  render() {
    const { getAllHomePageSettings: { loading, getAllHomePageSettings } } = this.props
    const { getContentPageDetails: { getContentPageDetails } } = this.props;
    const { youtubeLink, twitterLink, facebookLink, instagramLink } = this.props
    let homeSettings = {}
    if (!loading && getAllHomePageSettings && getAllHomePageSettings.homePageData) {
      getAllHomePageSettings && getAllHomePageSettings.homePageData.map((item) => {
        homeSettings[item.name] = item.value
      })
    }
    const apiEndpoint = api && api.apiEndpoint;
    let checkUrl;
    getContentPageDetails && getContentPageDetails.results && getContentPageDetails.results.map((item) => {
      if (item.isEnable == true) {
        checkUrl = 1;
      }
    })
    return (
      <div>
        {!loading && getAllHomePageSettings && getAllHomePageSettings.homePageData &&
          <div className={cx(s.footer, s.heroBkgAnimated)} id="footer-section">
            <Container className={s.containerWith}>
              <Row>
                <Col lg={4} md={3} sm={12} xs={12} className={cx(bt.space3)}>
                  <div className={cx(s.content)}>
                    <h3 className='textAlignRightRTL'><FormattedMessage {...messages.followUs} /></h3>
                    <ul className='textAlignRightRTL'>
                      <li className={cx(s.displayInlineBlock, s.iconPaddingRight, 'iconNoPaddingRTL')}>
                        <a href={facebookLink} target="_blank" >
                          <img src={FaceBookIcon} className={s.socialIcon} />
                        </a>
                      </li>
                      <li className={cx(s.displayInlineBlock, s.iconPaddingRight)}>
                        <a href={instagramLink} target="_blank" >
                          <img src={InstaIcon} className={s.socialIcon} />
                        </a>
                      </li>
                      <li className={cx(s.displayInlineBlock, s.iconPaddingRight)}>
                        <a href={twitterLink} target="_blank" >
                          <img src={TwitterIcon} className={s.socialIcon} />
                        </a>
                      </li>
                      <li className={cx(s.displayInlineBlock, 'iconPaddingRightRTL')}>
                        <a href={youtubeLink} target="_blank" >
                          <img src={YouTupeIcon} className={s.socialIcon} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col lg={4} md={6} sm={12} xs={12} className={cx(bt.space3)}>
                  <div className={cx(s.content)}>
                    <h3 className='textAlignRightRTL'>{homeSettings && homeSettings.footerTitle1}</h3>
                    <p className='textAlignRightRTL'>
                      {homeSettings && homeSettings.footerContent1}
                    </p>
                  </div>
                </Col>

                {
                  checkUrl == 1 && <Col lg={4} md={3} sm={12} xs={12} className={cx(bt.space3)}>
                    <div className={cx(s.content, s.floatRight)}>
                      <h3 className='textAlignRightRTL'>{homeSettings && homeSettings.footerLinkTitle}</h3>
                      <ul className='textAlignRightRTL'>
                        {
                          getContentPageDetails && getContentPageDetails.results && getContentPageDetails.results.length > 0 && getContentPageDetails.results.map((item, index) => {
                            if (item.isEnable) return <li key={index}><Link to={'/' + item.pageUrl}>{item.pageTitle}</Link></li>;
                            else return <span key={index}></span>;
                          })
                        }
                      </ul>
                    </div>
                  </Col>
                }
              </Row>
            </Container>
            <div className={s.copyRight}>
              {homeSettings && homeSettings.footerBottom}
            </div>
          </div>}
      </div>
    );
  }
}
const mapState = (state) => ({
  youtubeLink: state.siteSettings.data.youtubeLink,
  twitterLink: state.siteSettings.data.twitterLink,
  facebookLink: state.siteSettings.data.facebookLink,
  instagramLink: state.siteSettings.data.instagramLink
})
const mapDispatch = {

}
export default compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(getAllHomePageSettings, {
    name: 'getAllHomePageSettings',
    options: {
      ssr: true
    }
  }),
  graphql(getContentPageDetails, {
    name: 'getContentPageDetails',
    options: {
      fetchPolicy: "network-only",
      ssr: false
    }
  })
)
  (Footer);
