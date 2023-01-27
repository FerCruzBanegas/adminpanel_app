import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './CategorySettings.css';

import CategoryForm from '../../../components/SiteAdmin/CategoryForm/CategoryForm'
import Loader from '../../../components/Common/Loader/Loader';

import getAllHomePageCategorySettings from './getAllHomePageCategorySettings.graphql';

export class categorySettings extends Component {
    static defaultProps = { data: { loading: true } };
    render() {
        const { data: { loading, getAllHomePageCategorySettings } } = this.props;
        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.paddingRoutesSection}>
                            {!loading && <CategoryForm initialValues={{
                                categoryList: getAllHomePageCategorySettings &&
                                    getAllHomePageCategorySettings.results && getAllHomePageCategorySettings.results.length > 0 &&
                                    getAllHomePageCategorySettings.results || [{}]
                            }} />}
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
}

export default compose(withStyles(s), graphql(getAllHomePageCategorySettings, {
    options: (props) => ({
        fetchPolicy: 'network-only',
        ssr: false
    })
}))(categorySettings)
