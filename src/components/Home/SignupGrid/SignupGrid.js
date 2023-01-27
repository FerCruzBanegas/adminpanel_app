import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SignupGrid.css';
import bt from '../../../components/commonStyle.css';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import HomeContext from '../../../routes/context/homeContext'
import { api, homepageUploadDir } from '../../../config'


class SignupGrid extends React.Component {
  render() {
    const homepage = this.context
    const apiEndpoint = api && api.apiEndpoint
    return (
      <Container className={s.containerWith}>
        <div className={s.safetyContainer} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + homepage.signupGridImage4})` }}>
          <Row className={cx(s.displayFlex, s.reverseColumnMb)}>
            <Col xl={7} md={6} sm={6} xs={12} className={cx(s.responsiveNoMargin)}>
              <div className={cx(s.signUp)}>
                <h3>
                  {homepage.signupGridTitle1}
                </h3>
                <p>
                  {homepage.signupGridContent1}
                </p>
              </div>
              <div className={cx(bt.paddingTop5, s.responsiveNoPadding)}>
                <div className={cx(s.displayInlineBlock, s.paddingRight)}>
                  <a href={homepage.signupGridLink1} target="_blank" >
                    <img src={api.apiEndpoint + homepageUploadDir + homepage.signupGridImage1} className={s.appImg} />
                  </a>
                </div>
                <div className={cx(s.displayInlineBlock, s.paddingLeft, 'paddingLeftRTL')}>
                  <a href={homepage.signupGridLink2} target="_blank" >
                    <img src={api.apiEndpoint + homepageUploadDir + homepage.signupGridImage2} className={s.appImg} />
                  </a>
                </div>
              </div>
            </Col>
            <Col xl={5} md={6} sm={6} xs={12} className={s.alignCenter}>
              <img src={api.apiEndpoint + homepageUploadDir + homepage.signupGridImage3} className={s.phoneImg} />
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}
SignupGrid.contextType = HomeContext
export default withStyles(s, bt)(SignupGrid);
