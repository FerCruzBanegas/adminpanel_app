import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, initialize, change } from 'redux-form';
import { injectIntl } from 'react-intl';
import {
	Form,
	Col,
	Card,
	Row,
	InputGroup
} from 'react-bootstrap';
import cx from 'classnames';
import s from './AddCategoryForm.css';
import bt from '../../../components/commonStyle.css';
import withStyles from 'isomorphic-style-loader/withStyles';

import Link from '../../Link';
import Loader from '../../Common/Loader';
import ImageUploadComponent from '../../../components/Common/ImageUploadComponent';

import { updateTempImages } from '../../../actions/siteadmin/TempImages/updateTempImages';

import messages from '../../../locale/messages';
import validate from './validate';
import submit from './submit';
import { api, categoryUploadDir } from '../../../config';

//images
import defaultIcon from '../../../../public/Icons/defaultImage.svg';

export class AddCategoryForm extends Component {
	static defaultProps = {
		currency: 'USD',
		loading: false
	};

	constructor(props) {
		super(props)
		this.successLogo = this.successLogo.bind(this);
		this.successBanner = this.successBanner.bind(this);
	}

	async successLogo(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('logoImage', fromServer && fromServer.fileName);
		await updateTempImages('Category', 'logoImage', fromServer && fromServer.fileName);
	}

	async successBanner(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('bannerImage', fromServer && fromServer.fileName);
		await updateTempImages('Category', 'bannerImage', fromServer && fromServer.fileName);
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

	renderFieldDiscount = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
		const { formatMessage } = this.props.intl;
		return (
			<div className={'inputFormAddon'}>
				<Form.Group>
					<label className={bt.labelText} >{label}</label>
					<InputGroup>
						<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
						<InputGroup.Append>
							<InputGroup.Text>%</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup>
					{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
				</Form.Group>
			</div>
		)
	}

	renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
		const { formatMessage } = this.props.intl
		return (
			<div>
				<Form.Group className={s.formGroup}>
					<div>
						<label className={bt.labelText} >{label}</label>
					</div>
					<div>
						<Form.Control
							{...input}
							className={className}
							placeholder={label}
							as="textarea"
							rows="3"
							maxLength={500}
						>
							{children}
						</Form.Control>
						{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
					</div>
				</Form.Group>
			</div>
		);
	}

	render() {
		const { handleSubmit, currency, logoImage, bannerImage, loading, submitting, id } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
				<div className={s.paddingRoutesSection}>
					<Row>
						<Col md={12} lg={12} sm={12} xs={12}>
							<Card className={s.card}>
								<Form className={s.fullWidth} onSubmit={handleSubmit(submit)} >

									<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{id ? formatMessage(messages.editCategory) : formatMessage(messages.addCategory)}</h1>

									<Row>
										<Col lg={6} md={12} sm={6} xs={12}>
											<Form.Group className={s.formGroup}>
												<div className={cx(s.centerFlex, s.profileImgSection, s.profileImgWidth)}>
													<label className={bt.labelText} >{formatMessage(messages.categoryLogo)}</label>
													{
														logoImage && <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + categoryUploadDir}medium_${logoImage})` }} />
													}
													{
														!logoImage &&
														<div className={cx(s.backgroundImg, s.defaultIcon)} style={{ backgroundImage: `url(${defaultIcon})` }} />
													}

												</div>
												<div className={'commonFilepicker'}>
													<ImageUploadComponent
														className={cx(bt.btnPrimary, 'fileNoPadding', s.btnWidthadmin)}
														subTextClass={s.subText}
														subText={formatMessage(messages.maximumUploadSizeLabel)}
														defaultMessage={formatMessage(messages.chooseFile)}
														componentConfig={{
															iconFiletypes: ['.jpg', '.png', '.svg'],
															multiple: false,
															showFiletypeIcon: false,
															postUrl: api.apiEndpoint + '/uploadCategoryLogo'
														}}
														success={this.successLogo}
													/>

												</div>
											</Form.Group>
										</Col>
										<Col lg={6} md={12} sm={6} xs={12}>
											<Form.Group className={s.formGroup}>
												<div className={cx(s.centerFlex, s.profileImgSection, s.profileImgWidth)}>
													<label className={bt.labelText} >{formatMessage(messages.categoryBanner)}</label>
													{
														bannerImage && <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + categoryUploadDir}medium_${bannerImage})` }} />
													}
													{
														!bannerImage &&
														<div className={cx(s.backgroundImg, s.defaultIcon)} style={{ backgroundImage: `url(${defaultIcon})` }} />
													}

												</div>
												<div className={'commonFilepicker'}>
													<ImageUploadComponent
														className={cx(bt.btnPrimary, 'fileNoPadding', s.btnWidthadmin)}
														subTextClass={s.subText}
														subText={formatMessage(messages.maximumUploadSizeLabel)}
														defaultMessage={formatMessage(messages.chooseFile)}
														componentConfig={{
															iconFiletypes: ['.jpg', '.png', '.svg'],
															multiple: false,
															showFiletypeIcon: false,
															postUrl: api.apiEndpoint + '/uploadCategoryBanner'
														}}
														success={this.successBanner}
													/>

												</div>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
											<Form.Group className={s.formGroup}>
												<div>
													<Field
														name="name"
														type="text"
														placeholder={formatMessage(messages.categoryName)}
														component={this.renderField}
														label={formatMessage(messages.categoryName)}
														labelClass={bt.labelText}
														fieldClass={bt.formControlInput}
														maxLength={200}
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
														component={this.renderFormControlTextArea}
														label={formatMessage(messages.description)}
														labelClass={bt.labelText}
														fieldClass={bt.formControlInput}
													/>
												</div>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
											<Form.Group className={s.formGroup}>
												<div>
													<label className={bt.labelText} >{formatMessage(messages.isPopular)}</label>
													<Field name="isPopular" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
														<option value={false}>{formatMessage(messages.no)}</option>
														<option value={true}>{formatMessage(messages.yes)}</option>
													</Field>
												</div>
											</Form.Group>
										</Col>
										<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
											<Form.Group className={s.formGroup}>
												<div>
													<label className={bt.labelText} >{formatMessage(messages.isJobPhotoRequired)}</label>
													<Field name="isJobPhotoRequired" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
														<option value={false}>{formatMessage(messages.no)}</option>
														<option value={true}>{formatMessage(messages.yes)}</option>
													</Field>
												</div>
											</Form.Group>
										</Col>
										<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
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
										</Col>
										<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
											<Form.Group className={s.formGroup}>
												<div>
													<Field
														name="travellingPrice"
														type="text"
														placeholder={formatMessage(messages.travelCharge)}
														component={this.renderField}
														label={formatMessage(messages.travelCharge)}
														labelClass={bt.labelText}
														fieldClass={bt.formControlInput}
														maxLength={12}
													/>
												</div>
											</Form.Group>
										</Col>
										<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
											<Form.Group className={s.formGroup}>
												<div>
													<Field
														name="userServiceFeeValue"
														type="text"
														placeholder={formatMessage(messages.userServiceFee)}
														component={this.renderFieldDiscount}
														label={formatMessage(messages.userServiceFee)}
														labelClass={bt.labelText}
														fieldClass={bt.formControlInput}
													/>
												</div>
											</Form.Group>
										</Col>
										<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
											<Form.Group className={s.formGroup}>
												<div>
													<Field
														name="partnerServiceFeeValue"
														type="text"
														placeholder={formatMessage(messages.partnerServiceFee)}
														component={this.renderFieldDiscount}
														label={formatMessage(messages.partnerServiceFee)}
														labelClass={bt.labelText}
														fieldClass={bt.formControlInput}
													/>
												</div>
											</Form.Group>
										</Col>
										<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
											<Form.Group className={s.formGroup}>
												<div>
													<label className={bt.labelText} >{formatMessage(messages.pricingType)}</label>
													<Field name="pricingType" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
														<option value={"fixed"}>{formatMessage(messages.fixedFareType)}</option>
														<option value={"hourly"}>{formatMessage(messages.hourlyFareType)}</option>
													</Field>
												</div>
											</Form.Group>
										</Col>
										<Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
											<Form.Group className={s.formGroup}>
												<div>
													<label className={bt.labelText} >{formatMessage(messages.status)}</label>
													<Field name="status" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
														<option value={"active"}>{formatMessage(messages.active)}</option>
														<option value={"inactive"}>{formatMessage(messages.inactive)}</option>
													</Field>
												</div>
											</Form.Group>
										</Col>
									</Row>

									<div className={cx(bt.textAlignRight, bt.spaceTop3, 'loadingBtnRTL', 'textAlignLeftRTL')}>
										<Form.Group className={s.formGroup}>
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
											<Link to={"/siteadmin/category"} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL')} >{formatMessage(messages.goBack)}</Link>
										</Form.Group>
									</div>

								</Form>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}
AddCategoryForm = reduxForm({
	form: 'AddCategoryForm',
	onSubmit: submit,
	validate
})(AddCategoryForm);
const selector = formValueSelector('AddCategoryForm');
const mapState = (state) => ({
	currency: state.currency,
	logoImage: selector(state, 'logoImage'),
	bannerImage: selector(state, 'bannerImage'),
	id: selector(state, 'id'),
	loading: state.loader.AddCategory
})
const mapDispatch = {
	initialize,
	change,
	updateTempImages
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AddCategoryForm)));
