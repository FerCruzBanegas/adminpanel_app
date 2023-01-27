import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ViewBooking.css';
import viewBookingDetails from './viewBookingDetails.graphql';
import ViewBookingDetails from '../../../components/ViewBookingDetails';
import Loader from '../../../components/Common/Loader/Loader';
import SocketContext from '../../../core/socketNotifications/SocketContext';
import NotFound from '../../../components/NotFound/NotFound';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

export class ViewBooking extends Component {
	static propTypes = {
		data: PropTypes.shape({
			viewBookingDetails: PropTypes.object
		}),
	};

	static defaultProps = {
		data: {
			loading: true
		}
	};

	render() {
		const { formatMessage } = this.props.intl;
		const { data: { loading, viewBookingDetails, refetch }, from } = this.props;
		let title = formatMessage(messages.bookingDetails);
	
		return (
			<Loader type={"page"} show={loading}>
				<div className={s.root}>
					<div className={s.container}>
						<div className={s.paddingRoutesSection}>
							{!loading && viewBookingDetails && <ViewBookingDetails data={viewBookingDetails}
								title={title}
								from={from}
							/>}
						</div>
					</div>
				</div>
			</Loader>
		)

	}
}

export default compose(
	injectIntl,
	withStyles(s),
	graphql(viewBookingDetails,
		{
			options: (props) => ({
				variables: {
					id: props.id
				},
				fetchPolicy: 'network-only',
				ssr: false
			})
		})
)(ViewBooking);
