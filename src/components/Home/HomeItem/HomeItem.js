import React, { Component } from 'react';
import { connect } from 'react-redux';
import { api } from '../../../config';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './HomeItem.css';
import bt from '../../../components/commonStyle.css';
import cx from 'classnames';
import Col from 'react-bootstrap/Col';

export class HomeItem extends Component {
    render() {
        const { categoryName, categoryLogo } = this.props;

        return (
            <div className={s.sliderBox}>
                <div className={s.bgColor}>
                    <img
                        style={{ maxWidth: 'auto', height: 'auto' }}
                        src={api.apiEndpoint + "/images/category/medium_" + categoryLogo}
                    />
                </div>
                <div className={s.sliderBottom}>
                    <div className={cx(bt.labelText, s.fontNormal)} >{categoryName}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withStyles(s, bt)(connect(mapStateToProps, mapDispatchToProps)(HomeItem)) 
