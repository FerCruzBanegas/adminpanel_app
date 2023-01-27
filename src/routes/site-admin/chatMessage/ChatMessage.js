import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { graphql } from 'react-apollo';

import MessagesItem from '../../../components/SiteAdmin/ChatMessages/MessagesItem';
import Loader from '../../../components/Common/Loader/Loader';
import NotFound from '../../../components/NotFound/NotFound';

import s from './ChatMessage.css';
import messages from '../../../locale/messages';

import getAllThreadItemsQuery from './getAllThreadItems.graphql';
import getMoreThreads from './getMoreThreads.graphql';

const allowedBookingType = ['completed-jobs', 'cancelled-jobs', 'jobs'];
export class ChatMessage extends Component {

	constructor(props) {
		super(props);
		this.loadMore = this.loadMore.bind(this);
	}
	loadMore() {
		const { threadItems: { getAllThreadItems, fetchMore }, bookingId } = this.props;
		fetchMore({
			query: getMoreThreads,
			variables: {
				bookingId,
				offset: getAllThreadItems.threadItems.length,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) { return previousResult; }
				return {
					getAllThreadItems: {
						...previousResult.getAllThreadItems,
						threadItems: [...previousResult.getAllThreadItems.threadItems, ...fetchMoreResult.getMoreThreads],
					},
				};
			},
		});
	}

	render() {
		const { formatMessage } = this.props.intl;
		const { threadItems, from, threadItems: { loading, getAllThreadItems } } = this.props;
		return (
			<Loader type={"page"} show={loading}>
				<div className={s.root}>
					<div className={s.container}>
						<div className={s.heading}>
							{formatMessage(messages.chatMessageLabel)}
						</div>
						<div className={s.paddingRoutesSection}>
							{!loading && <MessagesItem threadItems={threadItems} from={from} loadMore={this.loadMore} />}
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
	graphql(getAllThreadItemsQuery, {
		name: 'threadItems',
		options: (props) => ({
			variables: {
				offset: 0,
				bookingId: props.bookingId
			},
			fetchPolicy: 'network-only',
			ssr: false
		})
	})
)(ChatMessage);