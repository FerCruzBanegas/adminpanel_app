import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, Button } from 'react-bootstrap';
import s from './ContentPageManagement.css';
import bt from '../../../components/commonStyle.css';
import cx from 'classnames';

import Link from '../../Link/Link';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import { deleteContentPageDetails, updateContentPageStatus } from '../../../actions/siteadmin/ContentPageAction';

import EditIcon from '../../../../public/Icons/editIcon.svg';
import TrashIcon from '../../../../public/Icons/deleteIcon.svg';

class ContentPageList extends React.Component {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			metaTitle: PropTypes.string,
			metaDescription: PropTypes.string,
			pageUrl: PropTypes.string,
			content: PropTypes.string
		}))
	};

	static defaultProps = { data: [] };

	render() {
		const { data, deleteContentPageDetails, updateContentPageStatus, intl: { formatMessage } } = this.props;
		return (
			<div className={s.widthInner}>
				<div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.btnSection, 'textAlignLeftRTL')}>
					<Link to={'/siteadmin/contentpage/add'} className={cx(bt.btnPrimary)}><FormattedMessage {...messages.addPage} /></Link>
				</div>
				<div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable', bt.spaceTop4)}>
					<Table className="table">
						<thead>
							<tr>
								<th scope="col"><FormattedMessage {...messages.id} /></th>
								<th scope="col"><FormattedMessage {...messages.metaTitle} /></th>
								<th scope="col"><FormattedMessage {...messages.metaDescriptionText} /></th>
								<th scope="col"><FormattedMessage {...messages.pageTitle} /></th>
								<th scope="col"><FormattedMessage {...messages.pageUrl} /></th>
								<th scope="col"><FormattedMessage {...messages.status} /></th>
								<th scope="col"><FormattedMessage {...messages.preview} /></th>
								<th scope="col"><FormattedMessage {...messages.action} /></th>
								<th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
							</tr>
						</thead>
						<tbody>
							{
								data && data.length > 0 && data.map((item, index) => (
									<tr key={index}>
										<td data-label={formatMessage(messages.id)}>{item && item.id}</td>
										<td data-label={formatMessage(messages.metaTitle)}>{item && item.metaTitle}</td>
										<td data-label={formatMessage(messages.metaDescriptionText)}>{item && item.metaDescription}</td>
										<td data-label={formatMessage(messages.pageTitle)}>{item && item.pageTitle}</td>
										<td data-label={formatMessage(messages.pageUrl)}>{item && item.pageUrl}</td>
										<td data-label={formatMessage(messages.status)}>
											<a href="javascript:void(0)" onClick={() => updateContentPageStatus(item.id, item.isEnable)}>
												{formatMessage(messages[item.isEnable == 1 ? 'Disable' : 'Enable'])}
											</a>
										</td>
										<td data-label={formatMessage(messages.preview)}>
											<a href={'/' + item.pageUrl} target="_blank">
												<FormattedMessage {...messages.preview} />
											</a>
										</td>
										<td data-label={formatMessage(messages.action)}>
											<Link to={'/siteadmin/contentpage/edit/' + item.id} className={cx('editAlign', s.noLink)}>
												<span><img src={EditIcon} className={cx(s.editIcon, 'editIconRTL')} /></span>
												<span className={cx(s.vtrMiddle, s.topPosition)}>
													<FormattedMessage {...messages.editAction} />
												</span>
											</Link>
										</td>
										<td data-label={formatMessage(messages.deleteAction)} >
											<Button className={s.iconBtn} onClick={() => deleteContentPageDetails(item.id)}>
												<img src={TrashIcon} className={cx(s.editIcon, 'editIconRTL')} />
												<span className={s.vtrMiddle}>
													<FormattedMessage {...messages.deleteAction} />
												</span>
											</Button>
										</td>
									</tr>
								))
							}
							{
								data && data.length == 0 && (
									<tr>
										<td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
									</tr>
								)
							}
						</tbody>
					</Table>
				</div>
			</div>
		)
	}
}

const mapState = (state) => ({});

const mapDispatch = {
	deleteContentPageDetails,
	updateContentPageStatus
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ContentPageList)));