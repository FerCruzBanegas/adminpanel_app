import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Container } from 'react-bootstrap';
import cx from 'classnames';
import bt from '../../../components/commonStyle.css';
import s from './HomePageCategorySection.css';

import { siteUrl, homePageCategoryLogoUploadDir, homePageCategoryBannerUploadDir } from '../../../config';


class HomePageCategorySection extends React.Component {

  static defaultProps = {
    data: []
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        {data && data.length > 0 && data.map((item, index) => {
          let logo = item.logo,
            banner = item.banner,
            title = item.title,
            description = item.description;
          return (
            <div key={index} className={s.bgColor}>
              <Container className={s.containerWith}>
                <div className={s.gridSystem}>
                  <div className={s.orderOne}>
                    <img src={siteUrl + homePageCategoryBannerUploadDir + 'medium_' + banner} className={s.imgWidthCategory} />
                  </div>
                  <div className={cx(s.padding, s.orderTwo)}>
                    <div>
                      <img src={siteUrl + homePageCategoryLogoUploadDir + 'medium_' + logo} />
                    </div>
                    <div className={s.titleFont} >{title}</div>
                    <div className={s.contentFont} >{description}</div>
                  </div>
                </div>
              </Container>
            </div>
          );
        })}
      </div>
    );
  }
}
export default withStyles(s)(HomePageCategorySection);
