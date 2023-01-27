import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl, FormattedMessage } from 'react-intl';
//Style
import cx from 'classnames';
import {
	Table
} from 'react-bootstrap';

import Link from '../../Link/Link';
import Loader from '../../../components/Common/Loader';

import s from './StaticPageManagement.css';

import messages from '../../../locale/messages';
import EditIcon from '../../../../public/Icons/editIcon.svg';

export class StaticPageManagement extends Component {

	render() {
		const { formatMessage } = this.props.intl;
		const { loading } = this.props;
		let data = [{
			id: 1,
			pageName: formatMessage(messages.Support),
			pageUrl: '/support'
		}, {
			id: 2,
			pageName: formatMessage(messages.user),
			pageUrl: '/user'
		}, {
			id: 3,
			pageName: formatMessage(messages.partner),
			pageUrl: '/partner'
		}, {
			id: 4,
			pageName: formatMessage(messages.partnerPrivacyPolicy),
			pageUrl: '/partner/privacy-policy'
		}, {
			id: 5,
			pageName: formatMessage(messages.legal),
			pageUrl: '/legal'
		}];

		return (

			<div className={s.widthInner}>
				{
					loading && <div>
						<Loader type="circle" />
					</div>
				}
				{!loading &&
					<div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
						<Table className="table">
							<thead>
								<tr>
									<th scope="col"><FormattedMessage {...messages.id} /></th>
									<th scope="col"><FormattedMessage {...messages.pageName} /></th>
									<th scope="col"><FormattedMessage {...messages.preview} /></th>
									<th scope="col"><FormattedMessage {...messages.editAction} /></th>
								</tr>
							</thead>
							<tbody>
								{
									data.map((o) => {
										return (
											<tr>
												<td data-label={formatMessage(messages.id)}>{o.id}</td>
												<td data-label={formatMessage(messages.pageName)}>{o.pageName}</td>
												<td data-label={formatMessage(messages.preview)}>
													<a href={o.pageUrl} target={'_blank'}><FormattedMessage {...messages.preview} /></a>
												</td>
												<td data-label={formatMessage(messages.editAction)}>
													<Link to={'/siteadmin/staticpage/edit/' + o.id} className={s.noLink}>
														<span><img src={EditIcon} className={cx(s.editIcon, 'editIconRTL')} /></span>
														<span className={s.vtrMiddle}>
															<FormattedMessage {...messages.editAction} />
														</span>
													</Link>
												</td>
											</tr>
										);
									})
								}
							</tbody>
						</Table>
					</div>
				}

			</div >
		)
	}
}

const mapState = (state) => ({
	loading: state.intl.loading
});
const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(StaticPageManagement)));