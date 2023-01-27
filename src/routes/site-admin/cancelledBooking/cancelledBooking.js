import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';

import CancelledBookingList from '../../../components/SiteAdmin/CancelledTrips/CancelBookingList';
import Loader from '../../../components/Common/Loader/Loader';

import s from './Booking.css';
import getCancelledQuery from './getCancelBookings.graphql';

import messages from '../../../locale/messages';
export class CancelledBooking extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { cancelledTrips, cancelledTrips: { loading } } = this.props;

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}>
                            {formatMessage(messages.manageCancelledBookings)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                        {!loading && <CancelledBookingList cancelledTrips={cancelledTrips} /> }
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
    graphql(getCancelledQuery, {
        name: 'cancelledTrips',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(CancelledBooking);
