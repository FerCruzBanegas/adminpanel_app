import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import Loader from 'react-loader-advanced';
import s from './Loader.css';

// Component
import MDSpinner from 'react-md-spinner';
import loader from '../../../../public/Icons/loader.gif';

class FullPageLoader extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        show: PropTypes.bool.isRequired
    };

    static defaultProps = {
        show: false
    };

    spinner() {
        return <div className={s.displayFlex}>
            <img src={loader} />
        </div>
    }

    render() {
        const { children, show } = this.props;
        return (
            <Loader show={show} message={this.spinner()}
                foregroundStyle={{ color: "white" }}
                backgroundStyle={{ backgroundColor: "rgba(249, 249, 249, 0.74)" }}>
                <div>
                    {children}
                </div>
            </Loader>
        );
    }
}

export default withStyles(s)(FullPageLoader);
