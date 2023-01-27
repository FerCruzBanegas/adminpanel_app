import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './HomeSection.css';
import bt from '../../../components/commonStyle.css';
import cx from 'classnames';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from '../../Link';
import HomeContext from '../../../routes/context/homeContext';
import { api, homepageUploadDir } from '../../../config';

class HomeSection extends React.Component {
  render() {
    const homepage = this.context;
    const apiEndpoint = api && api.apiEndpoint;
    return (
      <div>
        <div
          className={cx(s.bg)}
          style={{
            backgroundImage: `url(${apiEndpoint}${homepageUploadDir}${homepage.homeSectionImage1}`,
          }}
        >
          <Container>
            <div className={s.homeInner}>
              <Row className={cx(s.alignItemCenter, s.paddingTop)}>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <div className={s.firstContent}>
                    <div>{homepage.homeSectionTitle1}</div>
                    {/* <Link
                      className={cx(bt.btnPrimary, s.getButton)}
                      to={'#rider-section'}
                    >
                      {homepage.homeSectionButton1}
                    </Link> */}
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <div className={s.firstImage}>
                    <img
                      src={
                        apiEndpoint + homepageUploadDir + homepage.homeSectionImage2
                      }
                    />
                  </div>
                </Col>
              </Row>
              {/* <div className={s.wooberlyIcon}>
                <img
                  src={
                    apiEndpoint + homepageUploadDir + homepage.homeSectionImage2
                  }
                />
              </div>
              <div className={s.secondImage}>
                <img
                  src={
                    apiEndpoint + homepageUploadDir + homepage.homeSectionImage3
                  }
                />
              </div>
              <div className={s.flowerImage}>
                <img
                  src={
                    apiEndpoint + homepageUploadDir + homepage.homeSectionImage4
                  }
                />
              </div>
              <div className={s.handImage}>
                <img
                  src={
                    apiEndpoint + homepageUploadDir + homepage.homeSectionImage5
                  }
                />
              </div> */}
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

HomeSection.contextType = HomeContext;

export default withStyles(s, bt)(HomeSection);
