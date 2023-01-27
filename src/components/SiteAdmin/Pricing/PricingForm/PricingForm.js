import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, initialize, change } from 'redux-form';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import {
	Form,
	Col,
	Card,
	Row,
	InputGroup
} from 'react-bootstrap';
import s from './PricingForm.css';
import bt from '../../../../components/commonStyle.css';

import Link from '../../../Link';
import Loader from '../../../Common/Loader';

import messages from '../../../../locale/messages';
import validate from './validate';
import submit from './submit';

export class PricingForm extends Component {
	static defaultProps = {
		currency: 'USD',
		loading: false
	};

	constructor(props) {
		super(props);
		this.handlePriceType = this.handlePriceType.bind(this);
	}

	componentDidUpdate() {
		const { categoryId, categories, change } = this.props;
		categories && categories.getActiveCategories && categories.getActiveCategories.results
			&& categories.getActiveCategories.results.map(category => ((category.id == categoryId) && change('pricingType', category.pricingType)
			))
	}

	async handlePriceType(e) {
		const { categories, change } = this.props;
		categories && categories.getActiveCategories && categories.getActiveCategories.results
			&& categories.getActiveCategories.results.map(category => ((category.id == e) && change('pricingType', category.pricingType)
			))
	}

	renderField = ({ input, label, type, meta: { touched, error }, placeholder, maxlength }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} maxlength={maxlength} />
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
		)
	}

	renderSelectField = ({ input, label, type, meta: { touched, error }, fieldClass, placeholder, children, maxlength }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control as="select" {...input} placeholder={placeholder} className={fieldClass} maxlength={maxlength}>
					{children}
				</Form.Control>
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
		)
	}

	render() {
		const { handleSubmit, currency, loading, submitting, id, locations, categories, subCategories, categoryId, pricingType } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5)}>
				<Row>
					<Col md={12} lg={12} sm={12} xs={12} >
						<Card className={s.card}>
							<Form className={s.fullWidth} onSubmit={handleSubmit(submit)} >
								<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{id ? formatMessage(messages.editFare) : formatMessage(messages.addFare)}</h1>
								<Row>
									<Col lg={4} md={6} sm={6} xs={12}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="locationId"
													placeholder={formatMessage(messages.locationName)}
													component={this.renderSelectField}
													label={formatMessage(messages.locationName)}
													labelClass={bt.labelText}
													fieldClass={cx(bt.formControlSelect, bt.formControlInput)}
												>
													<option value={""}>{formatMessage(messages.locationName)}</option>
													{
														locations && locations.getAllLocation && locations.getAllLocation.results
														&& locations.getAllLocation.results.map(location => location.isActive && (
															<option key={location.id} value={location.id}>{location.locationName}</option>
														))
													}
												</Field>
											</div>
										</Form.Group>
									</Col>
									<Col lg={4} md={6} sm={6} xs={12}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="categoryId"
													placeholder={formatMessage(messages.category)}
													component={this.renderSelectField}
													label={formatMessage(messages.category)}
													labelClass={bt.labelText}
													fieldClass={cx(bt.formControlSelect, bt.formControlInput)}
													onChange={(e) => { this.handlePriceType(e && e.target.value) }}
												>
													<option value={""}>{formatMessage(messages.category)}</option>
													{
														categories && categories.getActiveCategories && categories.getActiveCategories.results
														&& categories.getActiveCategories.results.map(category => (
															<option key={category.id} value={category.id}>{category.name}</option>
														))
													}
												</Field>
											</div>
										</Form.Group>
									</Col>
									<Col lg={4} md={6} sm={6} xs={12}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="subCategoryId"
													placeholder={formatMessage(messages.subCategory)}
													component={this.renderSelectField}
													label={formatMessage(messages.subCategory)}
													labelClass={bt.labelText}
													fieldClass={cx(bt.formControlSelect, bt.formControlInput)}
												>
													<option value={""}>{formatMessage(messages.subCategory)}</option>
													{
														subCategories && subCategories.getActiveSubCategories && subCategories.getActiveSubCategories.results
														&& subCategories.getActiveSubCategories.results.map(subCategory => (subCategory.categoryId == categoryId) && (
															<option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
														))
													}
												</Field>
											</div>
										</Form.Group>
									</Col>
									<Col lg={4} md={6} sm={6} xs={12}>
										<Form.Group className={s.formGroup}>
											<div>
												<label className={bt.labelText} >{formatMessage(messages.status)}</label>
												<Field name="isActive" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
													<option value={true}>{formatMessage(messages.active)}</option>
													<option value={false}>{formatMessage(messages.inactive)}</option>
												</Field>
											</div>
										</Form.Group>
									</Col>
									<Col lg={4} md={6} sm={6} xs={12}>
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

									<Col lg={4} md={6} sm={6} xs={12}>
										<Form.Group className={s.formGroup}>
											<div>
												<label className={bt.labelText} >{formatMessage(messages.isPriceEditable)}</label>
												<Field name="isPriceEditable" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
													<option value={false}>{formatMessage(messages.no)}</option>
													<option value={true}>{formatMessage(messages.yes)}</option>
												</Field>
											</div>
										</Form.Group>
									</Col>

								</Row>
								<Row>
									<Col lg={4} md={6} sm={6} xs={12}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="basePrice"
													type="text"
													placeholder={pricingType == 'fixed' ? formatMessage(messages.basePrice) : formatMessage(messages.hourlyPrice)}
													component={this.renderField}
													label={pricingType == 'fixed' ? formatMessage(messages.basePrice) : formatMessage(messages.hourlyPrice)}
													labelClass={bt.labelText}
													fieldClass={bt.formControlInput}
													maxlength={6}
												/>
											</div>
										</Form.Group>
									</Col>
									<Col lg={4} md={6} sm={6} xs={12}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="multiplierValue"
													type="text"
													placeholder={pricingType == 'fixed' ? formatMessage(messages.maxQuantity) : formatMessage(messages.minHours)}
													component={this.renderField}
													label={pricingType == 'fixed' ? formatMessage(messages.maxQuantity) : formatMessage(messages.minHours)}
													labelClass={bt.labelText}
													fieldClass={bt.formControlInput}
													maxlength={6}
												/>
											</div>
										</Form.Group>
									</Col>

								</Row>
								<div className={cx(bt.textAlignRight, bt.spaceTop3, 'textAlignLeftRTL', 'loadingBtnRTL')}>
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
										<Link to={"/siteadmin/pricing/list"} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL', s.displayInlineBlock)} >{formatMessage(messages.goBack)}</Link>
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
PricingForm = reduxForm({
	form: 'PricingForm',
	onSubmit: submit,
	validate
})(PricingForm);
const selector = formValueSelector('PricingForm');
const mapState = (state) => ({
	currency: state.currency,
	loading: state.loader.PricingForm,
	categoryId: selector(state, 'categoryId'),
	pricingType: selector(state, 'pricingType'),

})
const mapDispatch = {
	initialize,
	change
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PricingForm)));
