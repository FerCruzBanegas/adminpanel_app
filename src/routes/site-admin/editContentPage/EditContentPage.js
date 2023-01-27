import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { flowRight as compose } from 'lodash';

import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditContentPage.css';

import Loader from '../../../components/Common/Loader/Loader';

import getContentPageById from './getContentPageById.graphql';

export class EditContentPage extends Component {

    static propTypes = { id: PropTypes.number.isRequired }

    constructor(props) {
        super(props)
        this.component = null;
    }

    componentDidMount() {
        if (typeof window !== 'undefined' && typeof document !== undefined) {
            this.component = require('../../../components/SiteAdmin/ContentPage/EditContentPageForm').default
        }
    }

    render() {
        const { getContentPageById: { getContentPageById, loading }, intl: { formatMessage } } = this.props;
        const isBrowser = typeof window !== 'undefined';
        const isDocument = typeof document !== undefined;
        const EditContentPageForm = this.component;

        let initialValues = {};

        if (!loading && getContentPageById && getContentPageById.result) {
            initialValues = {
                id: getContentPageById.result.id,
                metaTitle: getContentPageById.result.metaTitle,
                metaDescription: getContentPageById.result.metaDescription,
                pageUrl: getContentPageById.result.pageUrl,
                pageTitle: getContentPageById.result.pageTitle,
                content: getContentPageById.result.content,
                isEnable: getContentPageById.result.isEnable,
                pageBanner: getContentPageById.result.pageBanner,
            }
        }

        return (

            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}> {formatMessage(messages.contentpageManagement)}</div>
                        <div className={s.paddingRoutesSection}>
                            {!loading && isBrowser && isDocument && <EditContentPageForm initialValues={initialValues} />}
                        </div>
                    </div>
                </div>
            </Loader>
        );
    }
}

export default compose(
    injectIntl,
    withStyles(s),
    graphql(getContentPageById, {
        name: 'getContentPageById',
        options: (props) => ({
            ssr: true,
            variables: {
                id: props.id,
            },
            fetchPolicy: 'network-only'
        })
    })
)(EditContentPage)
