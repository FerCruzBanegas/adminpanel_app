import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';

import BookingList from '../../../components/Booking/BookingList/BookingList';
import s from './ScheduleBooking.css'
import messages from '../../../locale/messages';
export class ScheduleBooking extends Component {

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.heading}>
                        {formatMessage(messages.manageSchedule)}
                    </div>
                    <div className={s.paddingRoutesSection}>
                        <BookingList bookingType={2} />
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    injectIntl,
    withStyles(s),
)(ScheduleBooking);
