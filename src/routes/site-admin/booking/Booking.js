import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';

import BookingList from '../../../components/Booking/BookingList';
import s from './Booking.css'
import messages from '../../../locale/messages';
export class Booking extends Component {

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.heading}>
                        {formatMessage(messages.bookingsMenu)}
                    </div>
                    <div className={s.paddingRoutesSection}>
                        <BookingList bookingType={1} />
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    injectIntl,
    withStyles(s),
)(Booking);
