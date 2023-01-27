import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';

import AutoPayoutList from '../../../components/SiteAdmin/AutoPayout/AutoPayoutList';
import Loader from '../../../components/Common/Loader/Loader';

import s from './AutoPayout.css'
import getPayoutList from './getPayoutList.graphql';
import messages from '../../../locale/messages';
export class AutoPayout extends Component {

	static defaultProps = {
		booking: {
			loading: true
		}
	}

	render() {
		const { formatMessage } = this.props.intl;
		const { getPayoutData, getPayoutData: { loading } } = this.props;
		return (
			<Loader type={"page"} show={loading}>
				<div className={s.root}>
					<div className={s.container}>
						<div className={s.heading}>
							{formatMessage(messages.managePartnerPayout)}
						</div>
						<div className={s.paddingRoutesSection}>
						{!loading &&  <AutoPayoutList getPayoutData={getPayoutData} /> }
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
	graphql(getPayoutList, {
		name: 'getPayoutData',
		options: {
			variables: {
				currentPage: 1,
				searchList: ''
			},
			fetchPolicy: 'network-only'
		}
	})
)(AutoPayout);
