import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, initialize, change } from 'redux-form';
import { injectIntl } from 'react-intl';
import {
	Form,
	Col,
	Card,
	Row,
} from 'react-bootstrap';
import cx from 'classnames';
import s from './AddSubCategoryForm.css';
import bt from '../../../components/commonStyle.css';
import withStyles from 'isomorphic-style-loader/withStyles';

import Link from '../../Link/Link';
import Loader from '../../Common/Loader/Loader';
import ImageUploadComponent from '../../../components/Common/ImageUploadComponent';

import { updateTempImages } from '../../../actions/siteadmin/TempImages/updateTempImages';

import messages from '../../../locale/messages';
import validate from './validate';
import submit from './submit';
import { api, subCategoryUploadDir } from '../../../config';

//images
import defaultIcon from '../../../../public/Icons/defaultImage.svg';

export class AddSubCategoryForm extends Component {
	static defaultProps = {
		currency: 'USD',
		loading: false
	};

	constructor(props) {
		super(props)
		this.success = this.success.bind(this);
	}

	async success(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('image', fromServer && fromServer.fileName);
		await updateTempImages('SubCategory', 'image', fromServer && fromServer.fileName);
	}

	renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder, maxLength }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} maxLength={maxLength}
				/>
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
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

	renderSelectField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder, children }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control as="select" {...input} placeholder={placeholder} className={fieldClass}>
					{children}
				</Form.Control>
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
		)
	}

	render() {
		const { handleSubmit, image, loading, submitting, id, categories: { getActiveCategories } } = this.props;
		const { formatMessage } = this.props.intl;

		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
				<Row>
					<Col md={12} lg={12} sm={12} xs={12} >
						<Card className={s.card}>
							<Form className={s.fullWidth} onSubmit={handleSubmit(submit)} >
								<Col lg={12} md={12} sm={12} xs={12}>
									<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{id ? formatMessage(messages.editSubCategory) : formatMessage(messages.addSubCategory)}</h1>
								</Col>

								<div className={cx(s.singalCard, s.singleCardMb)}>
									<Form.Group className={s.formGroup}>
										<div className={cx(s.centerFlex, s.profileImgSection, s.profileImgWidth)}>
											<label className={bt.labelText} >{formatMessage(messages.image)}</label>
											{
												image && <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + subCategoryUploadDir}medium_${image})` }} />
											}
											{
												!image &&
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
													postUrl: api.apiEndpoint + '/uploadSubCategory'
												}}
												success={this.success}
											/>

										</div>
									</Form.Group>
								</div>

								<Row className={s.paddingRoutesSection}>
									<Col lg={6} md={6} sm={6} xs={12}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="name"
													type="text"
													placeholder={formatMessage(messages.subCategoryName)}
													component={this.renderField}
													label={formatMessage(messages.subCategoryName)}
													labelClass={bt.labelText}
													fieldClass={bt.formControlInput}
													maxLength={200}
												/>
											</div>
										</Form.Group>
									</Col>
									<Col lg={6} md={6} sm={6} xs={12}>
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
									<Col lg={6} md={6} sm={6} xs={12}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="categoryId"
													placeholder={formatMessage(messages.category)}
													component={this.renderSelectField}
													label={formatMessage(messages.category)}
													labelClass={bt.labelText}
													fieldClass={cx(bt.formControlSelect, bt.formControlInput)}
												>
													<option value={""}>{formatMessage(messages.category)}</option>
													{
														getActiveCategories && getActiveCategories.results && getActiveCategories.results.map(category => (
															<option key={category.id} value={category.id}>{category.name}</option>
														))
													}
												</Field>
											</div>
										</Form.Group>
									</Col>
									<Col lg={6} md={6} sm={6} xs={12}>
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


								<Col lg={12} md={12} sm={12} xs={12} className={cx(bt.textAlignRight, bt.spaceTop3, 'loadingBtnRTL', 'textAlignLeftRTL')}>
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
										<Link to={"/siteadmin/sub-category"} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL')} >{formatMessage(messages.goBack)}</Link>
									</Form.Group>
								</Col>

							</Form>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}
AddSubCategoryForm = reduxForm({
	form: 'AddSubCategoryForm',
	onSubmit: submit,
	validate
})(AddSubCategoryForm);
const selector = formValueSelector('AddSubCategoryForm');
const mapState = (state) => ({
	currency: state.currency,
	image: selector(state, 'image'),
	id: selector(state, 'id'),
	loading: state.loader.AddSubCategory
})
const mapDispatch = {
	initialize,
	change,
	updateTempImages
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AddSubCategoryForm)));
