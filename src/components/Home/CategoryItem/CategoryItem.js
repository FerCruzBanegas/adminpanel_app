import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './CategoryItem.css';
import bt from '../../../components/commonStyle.css';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import { siteUrl, homePageCategoryLogoUploadDir, homePageCategoryBannerUploadDir } from '../../../config';

export class CategoryItem extends Component {

    render() {
        
        const { logo, banner, title, description } = this.props;

        return (
            <Container>
                        <div className={s.gridSystem}>
                            <div>
                                <img src={siteUrl + homePageCategoryBannerUploadDir + 'medium_' + banner} className={s.imgWidth}/>
                            </div>
                            <div className={s.paddingLeft}> 
                                <div>
                                    <img src={siteUrl + homePageCategoryLogoUploadDir + 'medium_' + logo} />
                                </div>
                                <div className={cx(bt.labelText, s.fontNormal)} >{title}</div>
                                <div className={cx(bt.labelText, s.fontNormal)} >{description}</div>
                            </div>
                        </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withStyles(s, bt)(connect(mapStateToProps, mapDispatchToProps)(CategoryItem))
