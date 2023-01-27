import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';

import ManageRatings from '../../../components/SiteAdmin/ManageRatings';
import Loader from '../../../components/Common/Loader/Loader';
import s from './Ratings.css';

import getReviews from './getReviews.graphql'
import messages from '../../../locale/messages';
export class Ratings extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { reviews, reviews: { loading, getReviews } } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}>
                            {formatMessage(messages.ratings)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                        {!loading && <ManageRatings reviews={reviews} /> }
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
    graphql(getReviews, {
        name: 'reviews',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(Ratings);
