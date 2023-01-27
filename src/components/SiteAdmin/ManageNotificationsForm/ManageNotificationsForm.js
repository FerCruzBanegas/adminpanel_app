import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {
	Row,
	FormGroup,
	Col,
	FormControl,
	Container
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ManageNotificationsForm.css'
import bt from '../../../components/commonStyle.css';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages'

import Loader from '../../Common/Loader';

import submit from './submit';
import validate from './validate';

export class ManageNotificationsForm extends Component {
	static defaultProps = {
		loading: false
	};
	
	renderFormControl = ({ input, label, type, meta: { touched, error }, className, maxlength }) => {
		const { formatMessage } = this.props.intl
		return (
			<div>
				<FormGroup className={s.formGroup}>
					<div>
						<label className={bt.labelText} >{label}</label>
					</div>
					<div>
						<FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} maxlength={maxlength} />
						{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
					</div>
				</FormGroup>
			</div>
		)
	}
	renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
		const { formatMessage } = this.props.intl
		return (
			<div>
				<FormGroup className={s.formGroup}>
					<div>
						<label className={bt.labelText} >{label}</label>
					</div>
					<div>
						<FormControl
							{...input}
							className={className}
							placeholder={label}
							as="textarea"
							rows="3"
						>
							{children}
						</FormControl>
						{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
					</div>
				</FormGroup>
			</div>
		);
	}
	render() {
		const { formatMessage } = this.props.intl
		const { handleSubmit, loading, submitting } = this.props;
		return (
			<div className={'customRatioButton'}>
				<div>
					<Container fluid>
						<form onSubmit={handleSubmit(submit)}>
							<Row>
								<Col xs={12} sm={8} md={8} lg={6}>
									<div>
										<FormGroup className={s.formGroup}>
											<div>
												<div>
													<label className={bt.labelText}>{formatMessage(messages.to)}:</label>
												</div>
												<div className={cx(s.blockRadioButton, s.displayInlineBlock, 'floatRightRTL', 'textAlignRightRTL')}>
													<Field name="to" component="input" type="radio" value="all" />
													{' '}<label className={cx(bt.labelText, s.noMargin, s.radioTextLabel)}><FormattedMessage {...messages.allonly} /></label>
												</div>
												<div className={cx(s.blockRadioButton, s.displayInlineBlock, s.radioText, 'floatRightRTL', 'textAlignRightRTL')}>
													<Field name="to" component="input" type="radio" value="2" />
													{' '} <label className={cx(bt.labelText, s.noMargin, s.radioTextLabel)}><FormattedMessage {...messages.partner} /></label>
												</div>
												<div className={cx(s.blockRadioButton, s.displayInlineBlock, 'floatRightRTL', 'textAlignRightRTL')}>
													<Field name="to" component="input" type="radio" value="1" />
													{' '}<label className={cx(bt.labelText, s.noMargin, s.radioTextLabel)}><FormattedMessage {...messages.user} /></label>
												</div>
											</div>
										</FormGroup>
									</div>
								</Col>
							</Row>
							<Row>
								<Col xs={12} sm={8} md={8} lg={6} className={bt.space2}>
									<Field name="message" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.msgOnly)} />
								</Col>
							</Row>
							<Row>
								<Col xs={12} sm={8} md={8} lg={6} className={cx(bt.textAlignRight, 'textAlignLeftRTL', 'loadingBtnRTL')}>
									<div>

										<div className={s.displayInlineBlock}>
											<Loader
												type={"button"}
												label={formatMessage(messages.submitButton)}
												show={loading}
												buttonType={'submit'}
												className={cx(bt.btnPrimary)}
												disabled={submitting || loading}
												isSuffix={true}
											/>
										</div>
									</div>
								</Col>
							</Row>
						</form>
					</Container>
				</div>
			</div>
		)
	}
}
ManageNotificationsForm = reduxForm({
	form: 'ManageNotificationsForm',
	onSubmit: submit,
	validate
})(ManageNotificationsForm)
const mapState = (state) => ({
	loading: state.loader.sendNotification,
	siteName: state.siteSettings && state.siteSettings.data && state.siteSettings.data.siteName
})
const mapDispatch = {
	
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ManageNotificationsForm)));
