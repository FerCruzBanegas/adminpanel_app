import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import cx from 'classnames';
import {
	Form,
	Col,
	Row,
} from 'react-bootstrap';
import Link from '../../../Link/Link';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SmsForm.css';
import bt from '../../../../components/commonStyle.css';

import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

import Loader from '../../../Common/Loader/Loader';
import CountryList from '../../../CountryList/CountryList';

import validate from './validate';
import onSubmit from './submit';

export class SmsForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			phoneCountryCode: 'US',
			phoneDialCode: '+1',
		};
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const { initialValues } = this.props;
		if (initialValues && initialValues.phoneDialCode && initialValues.phoneCountryCode) {
			this.setState({
				phoneCountryCode: initialValues.phoneCountryCode,
				phoneDialCode: initialValues.phoneDialCode
			});
		}
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleCountryChange(e, selectedData) {
		this.setState({
			phoneDialCode: selectedData.dialCode,
			phoneCountryCode: selectedData.countryCode
		});
	}


	renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder, maxLength }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} maxLength={maxLength} />
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
		)
	}

	renderFieldPhoneNumber = ({ input, label, writeOnce, type, meta: { touched, error }, fieldClass, placeholder, disabled }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<Form.Control {...input} readOnly={writeOnce} placeholder={placeholder} type={type} className={cx(bt.formControlInput, fieldClass)} disabled={disabled} />
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
		)
	}


	render() {
		const { handleSubmit, loading, submitting, id } = this.props;
		const { formatMessage } = this.props.intl;
		const { phoneCountryCode, phoneDialCode } = this.state;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
				<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.editSmsMethod)}</h1>
				<Row>
					<Col md={12} lg={12} sm={12} xs={12}>
						<Form className={s.fullWidth} onSubmit={handleSubmit(onSubmit)}>
							<Row>
								<Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field
												name="accountId"
												type="text"
												placeholder={id == 1 ? formatMessage(messages.accountId) : formatMessage(messages.apiKey)}
												component={this.renderField}
												label={id == 1 ? formatMessage(messages.accountId) : formatMessage(messages.apiKey)}
												labelClass={bt.labelText}
												fieldClass={bt.formControlInput}
											/>
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field
												name="securityId"
												type="text"
												placeholder={id == 1 ? formatMessage(messages.secretId) : formatMessage(messages.secretKey)}
												component={this.renderField}
												label={id == 1 ? formatMessage(messages.secretId) : formatMessage(messages.secretKey)}
												labelClass={bt.labelText}
												fieldClass={bt.formControlInput}
											/>
										</div>
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col lg={12} md={12} sm={12} xs={12}>
									<div>
										<label className={bt.labelText}>{formatMessage(messages.phoneNumber)}</label>
									</div>
								</Col>
								<Col xl={6} lg={6} md={12} sm={12} xs={12} className={s.space2}>
									{phoneCountryCode && <CountryList
										input={
											{
												name: 'phoneDialCode',
												onChange: this.handleChange,
												value: phoneCountryCode,
											}
										}
										className={cx(s.formControlSelect, s.formControlInput, s.space1)}
										dialCode={false}
										getSelected={this.handleCountryChange}
										formName={'SmsForm'}
									/>}
								</Col>
								<Col xl={6} lg={6} md={12} sm={12} xs={12}>
									<Form.Group className={cx(s.noMargin, s.displayGridPhone)}>
										<div className={s.countrySection}>
											<span className={s.space1}>
												{phoneDialCode}
											</span>
										</div>
										<div className={s.phoneNumberSection}>
											<Field
												name="phoneNumber"
												type="text"
												placeholder={formatMessage(messages.phoneNumber)}
												component={this.renderFieldPhoneNumber}
												fieldClass={cx(s.formControlInput, s.inputRadius)}
											/>
										</div>
									</Form.Group>
								</Col>
							</Row>

							<div class="clearfix"></div>

							<div className={cx(bt.textAlignRight, bt.spaceTop3, 'textAlignLeftRTL', 'loadingBtnRTL')}>
								<Form.Group className={s.formGroup}>
									<div className={s.displayInlineBlock}>
										<Loader
											type={"button"}
											label={formatMessage(messages.update)}
											show={loading}
											buttonType={'submit'}
											className={cx(bt.btnPrimary)}
											disabled={submitting || loading}
											isSuffix={true}
										/>
									</div>
									<Link to={"/siteadmin/sms-methods"} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL', s.displayInlineBlock)} >{formatMessage(messages.goBack)}</Link>
								</Form.Group>
							</div>
						</Form>
					</Col>
				</Row>
			</div>
		)
	}
}

SmsForm = reduxForm({
	form: 'SmsForm',
	onSubmit,
	validate
})(SmsForm);

const selector = formValueSelector('SmsForm');
const mapState = state => ({
	id: selector(state, 'id'),
	loading: state.loader.UpdateSmsMethod,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SmsForm)));