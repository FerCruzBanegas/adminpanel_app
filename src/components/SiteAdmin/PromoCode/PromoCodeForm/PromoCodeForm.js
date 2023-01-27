import React, { Component } from 'react';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import cx from 'classnames';
import {
	Form,
	Col,
	Card,
	Row,
	InputGroup
} from 'react-bootstrap';
import Link from '../../../Link';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './PromoCodeForm.css';
import bt from '../../../../components/commonStyle.css';

import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

import DatePicker from '../../../Common/DatePicker';
import Loader from '../../../Common/Loader';
import ImageUploadComponent from '../../../Common/ImageUploadComponent';

import validate from './validate';
import onSubmit from './submit';
import { normalizePromoCode } from './normalize';

import { api, promoCodeImageUploadDir } from '../../../../config';

//images
import defaultIcon from '../../../../../public/Icons/defaultImage.svg';

export class PromoCodeForm extends Component {
	static defaultProps = {
		currency: 'USD',
		promoId: null,
		promoCurrency: 'USD',
		expiryDate: null
	}

	state = { load: true };

	constructor(props) {
		super(props);
		this.success = this.success.bind(this);
	}

	componentDidUpdate(prevProps) {
		const { locale } = this.props.intl;
		const { locale: prevLocale } = prevProps.intl;

		if (locale !== prevLocale) {
			this.setState({ load: false });
			clearTimeout(this.loadSync);
			this.loadSync = null;
			this.loadSync = setTimeout(() => this.setState({ load: true }), 1);
		}
	}

	async success(file, fromServer) {
		const { change } = this.props;
		await change('imageName', fromServer && fromServer.fileName);
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

	renderFieldDiscount = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder, promoType, promoCurrency }) => {
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx('inputFormAddon', 'addonBorder')}>
				<Form.Group>
					<label className={bt.labelText} >{label}</label>
					<InputGroup>
						{
							promoType == 2 && <InputGroup.Append>
								<InputGroup.Text>
									{
										promoCurrency
									}
								</InputGroup.Text>
							</InputGroup.Append>
						}
						<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} maxLength={6} />
						{
							promoType != 2 && <InputGroup.Append>
								<InputGroup.Text>%</InputGroup.Text>
							</InputGroup.Append>
						}
					</InputGroup>
					{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
				</Form.Group>
			</div>
		)
	}

	renderTextAreaField = ({ input, label, type, meta: { touched, error }, children, labelClass, fieldClass, placeholder, maxLength }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control as="textarea" rows="3" {...input} placeholder={placeholder} type={type} className={fieldClass} maxLength={maxLength} />
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
		)
	}

	render() {
		const { handleSubmit, currency, promoId, promoType, promoCurrency, expiryDate, loading, submitting, imageName } = this.props;
		const { formatMessage } = this.props.intl;
		const { load } = this.state;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
				<Row>
					<Col md={12} lg={12} sm={12} xs={12}>
						<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{promoId ? formatMessage(messages.editPromoCode) : formatMessage(messages.addPromoCode)}</h1>
						<div className={cx(s.singalCard, s.marbtm14)}>
							<div className={s.profileImgSection}>
								<label className={bt.labelText} >{formatMessage(messages.promoCodeImage)}</label>
								{
									imageName && <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + promoCodeImageUploadDir}${'medium_' + imageName})` }} />
								}
								{
									!imageName &&
									<div className={cx(s.backgroundImg, s.defaultIcon)} style={{ backgroundImage: `url(${defaultIcon})` }} />
								}
							</div>
							<div className={'commonFilepicker'}>
								{
									load && <ImageUploadComponent
										className={cx(bt.btnPrimary, 'fileNoPadding', s.btnWidthadmin)}
										subTextClass={s.subText}
										subText={formatMessage(messages.maximumUploadSizeLabel)}
										defaultMessage={formatMessage(messages.chooseFile)}
										componentConfig={{
											iconFiletypes: ['.jpg', '.png', '.svg'],
											multiple: false,
											showFiletypeIcon: false,
											postUrl: api.apiEndpoint + '/uploadPromoCodeImage'
										}}
										success={this.success}
									/>
								}
								{!load && <Loader type={"text"} />}
							</div>
						</div>
						<Card className={s.card}>

							<Form className={s.fullWidth} onSubmit={handleSubmit(onSubmit)}>
								<Row>
									<Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="title"
													type="text"
													placeholder={formatMessage(messages.title)}
													component={this.renderField}
													label={formatMessage(messages.title)}
													labelClass={bt.labelText}
													fieldClass={bt.formControlInput}
													maxLength={100}
												/>
											</div>
										</Form.Group>
									</Col>
									<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="description"
													type="text"
													placeholder={formatMessage(messages.description)}
													component={this.renderTextAreaField}
													label={formatMessage(messages.description)}
													labelClass={bt.labelText}
													fieldClass={bt.formControlInput}
													maxLength={250}
												/>
											</div>
										</Form.Group>
									</Col>
									<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="code"
													type="text"
													placeholder={formatMessage(messages.code)}
													component={this.renderField}
													label={formatMessage(messages.code)}
													labelClass={bt.labelText}
													fieldClass={bt.formControlInput}
													normalize={normalizePromoCode}
													maxLength={15}
												/>
											</div>
										</Form.Group>
									</Col>
									{/* <Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<label className={bt.labelText} >{formatMessage(messages.promoType)}</label>
												<Field name="type" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
													<option value={1}>{formatMessage(messages.percentage)}</option>
													<option value={2}>{formatMessage(messages.fixedAmount)}</option>
												</Field>
											</div>
										</Form.Group>
									</Col> */}

									<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="promoValue"
													type="text"
													placeholder={formatMessage(messages.discount)}
													component={this.renderFieldDiscount}
													label={formatMessage(messages.discount)}
													labelClass={bt.labelText}
													fieldClass={bt.formControlInput}
													promoType={promoType}
													promoCurrency={promoCurrency}
												/>
											</div>
										</Form.Group>
									</Col>

								</Row>
								<Row>
									{/* <Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<label className={bt.labelText} >{formatMessage(messages.currency)}</label>
												<Field name="currency" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
													{
														currency && currency.availableCurrencies && currency.availableCurrencies.map(currency => (
															<option key={currency.id} value={currency.symbol}>{currency.symbol}</option>
														))
													}
												</Field>
											</div>
										</Form.Group>
									</Col> */}
									<Col lg={6} md={6} sm={6} xs={12} className={cx(bt.space2, 'promoDatePicker')}>
										<Form.Group className={s.formGroup}>
											<div>
												<label className={bt.labelText} >{formatMessage(messages.expireDate)}</label>
												<DatePicker
													placeholder={formatMessage(messages.expireDate)}
													formName={'PromoCodeForm'}
													fieldName={'expiryDate'}
													initialDate={expiryDate}
												/>
											</div>
										</Form.Group>
									</Col>
									{
										promoId && <Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
											<Form.Group className={s.formGroup}>
												<div>
													<label className={bt.labelText} >{formatMessage(messages.status)}</label>
													<Field name="isEnable" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
														<option value="true">{formatMessage(messages.active)}</option>
														<option value="false">{formatMessage(messages.inactive)}</option>
													</Field>
												</div>
											</Form.Group>
										</Col>
									}

								</Row>
								<div class="clearfix"></div>

								<div className={cx(bt.textAlignRight, bt.spaceTop3, 'textAlignLeftRTL', 'loadingBtnRTL')}>
									<Form.Group className={s.formGroup}>
										<div className={s.displayInlineBlock}>
											<Loader
												type={"button"}
												label={promoId ? formatMessage(messages.update) : formatMessage(messages.submitButton)}
												show={loading}
												buttonType={'submit'}
												className={cx(bt.btnPrimary)}
												disabled={submitting || loading}
												isSuffix={true}
											/>
										</div>
										<Link to={"/siteadmin/promo-code/list"} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL', s.displayInlineBlock)} >{formatMessage(messages.goBack)}</Link>
									</Form.Group>
								</div>
							</Form>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

PromoCodeForm = reduxForm({
	form: 'PromoCodeForm',
	onSubmit,
	validate
})(PromoCodeForm);

const selector = formValueSelector('PromoCodeForm');
const mapState = state => ({
	currency: state.currency,
	promoId: selector(state, 'id'),
	promoType: selector(state, 'type'),
	promoCurrency: selector(state, 'currency'),
	expiryDate: selector(state, 'expiryDate'),
	loading: state.loader.AddPromoCode,
	imageName: selector(state, 'imageName')
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PromoCodeForm)));