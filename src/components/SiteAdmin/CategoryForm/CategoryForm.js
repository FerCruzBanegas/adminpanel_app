import React, { Component } from 'react';
import { Field, reduxForm, change, formValueSelector, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import cx from 'classnames';
import {
	Form,
	Col,
	Row,
	FormControl,
	FormGroup,
	Button
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './CategoryForm.css';
import bt from '../../../components/commonStyle.css';

import Dropzone from './Dropzone.js'
import Loader from '../../Common/Loader/Loader';

import submit from './submit';
import messages from '../../../locale/messages';
import validate from './validate';
import { siteUrl, homePageCategoryBannerUploadDir, homePageCategoryLogoUploadDir } from '../../../config';

//images
import addIcon from '../../../../public/Icons/plusIcon.svg';
import deleteIcon from '../../../../public/Icons/deleteIocn.svg';
import defaultIcon from '../../../../public/Icons/defaultImage.svg';


export class CategoryForm extends Component {
	constructor(props) {
		super(props);
		this.handleDropzone = this.handleDropzone.bind(this);
		this.loaderStart = this.loaderStart.bind(this);
		this.loaderEnd = this.loaderEnd.bind(this);
	}

	static defaultProps = { loading: false };

	async loaderStart(index) {
		const { change } = this.props;
		await change(`categoryList[${index}].loading`, true);
	}

	async loaderEnd(index) {
		const { change } = this.props;
		await change(`categoryList[${index}].loading`, false);
	}

	renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
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

	rendercategory = ({ fields, meta: { touched, error } }) => {
		const { categoryList, intl: { formatMessage } } = this.props;
		return (
			<div>
				{fields && fields.map((category, index) => {
					let logo = fields.get(index) && fields.get(index).logo,
						banner = fields.get(index) && fields.get(index).banner;
					let fieldLength = fields.length - 1;
					return (
						<div key={`${index}`} className={cx(s.displayInlineBock, s.borderTop)}>
							<Row className={s.gridTop}>
								<Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div className={cx(s.profileImgSection, s.profileImgWidth)}>
											<label className={bt.labelText} >{formatMessage(messages.aboutImage1)}</label><br />
											<Loader
												show={categoryList && categoryList[index] && categoryList[index].loading}
												type={"page"}
											>
												{
													logo &&
													<div className={s.backgroundImg} style={{ backgroundImage: `url(${siteUrl + homePageCategoryLogoUploadDir + 'medium_' + logo})` }} />
												}
												{
													!logo &&
													<div className={cx(s.backgroundImg, s.defaultIcon)} style={{ backgroundImage: `url(${defaultIcon})` }} />
												}
											</Loader>
											<div className={'commonFilepicker'}>
												<Dropzone
													className={cx(bt.btnPrimary, 'fileNoPadding', s.btnWidthadmin)}
													subTextClass={s.subText}
													fieldName={`${category}.logo`}
													subText={formatMessage(messages.maximumUploadSizeLabel)}
													defaultMessage={formatMessage(messages.chooseFile)}
													handleDropzone={this.handleDropzone}
													inputContainer={'.dzInputContainerAboutImage1'}
													inputContainerClass={'dzInputContainerAboutImage1'}
													postUrl={siteUrl + '/uploadHomePageCategoryLogo'}
												/>
											</div>
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div className={cx(s.profileImgSection, s.profileImgWidth)}>
											<label className={bt.labelText} >{formatMessage(messages.aboutImage2)}</label><br />
											<Loader
												show={categoryList && categoryList[index] && categoryList[index].loading}
												type={"page"}
											>
												{
													banner &&
													<div className={s.backgroundImg} style={{ backgroundImage: `url(${siteUrl + homePageCategoryBannerUploadDir + 'medium_' + banner})` }} />
												}
												{
													!banner &&
													<div className={cx(s.backgroundImg, s.defaultIcon)} style={{ backgroundImage: `url(${defaultIcon})` }} />
												}
											</Loader>
											<div className={'commonFilepicker'}>
												<Dropzone
													className={cx(bt.btnPrimary, 'fileNoPadding', s.btnWidthadmin)}
													subTextClass={s.subText}
													fieldName={`${category}.banner`}
													subText={formatMessage(messages.maximumUploadSizeLabel)}
													defaultMessage={formatMessage(messages.chooseFile)}
													handleDropzone={this.handleDropzone}
													inputContainer={'.dzInputContainerAboutImage2'}
													inputContainerClass={'dzInputContainerAboutImage2'}
													postUrl={siteUrl + '/uploadHomePageCategoryBanner'}
												/>
											</div>
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={12} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name={`${category}.title`} type="text" component={this.renderField} label={formatMessage(messages.featureTitle1)} />
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={12} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name={`${category}.description`} type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.featureDesc1)} />
										</div>
									</Form.Group>
								</Col>
							</Row>
							<div className={cx(s.textAlignRight, s.marginTop, 'textAlignLeftRTL')}>
								{fieldLength == index && <div className={cx(bt.space2, s.displayInlineBlock)}>
									<Button
										variant="primary"
										className={cx(s.categoryBtn, s.flexBtn)}
										onClick={() => fields.push({})}
									>
										<img src={addIcon} /> <span className={cx(s.paddingLeft, 'categoryLeftRTL')}>{formatMessage(messages.add)}</span>
									</Button>
								</div>}
								{index != 0 && <div className={cx(s.removeSection, s.displayInlineBlock, 'heatmapBtnRTL')}>
									<Button
										variant="primary"
										onClick={() => fields.remove(index)}
										className={cx(s.categoryBtn, s.flexBtn)}
									>
										<img src={deleteIcon} /> <span className={cx(s.paddingLeft, 'categoryLeftRTL')}>{formatMessage(messages.deleteAction)}</span>
									</Button>
								</div>}
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	handleDropzone(fileName, fieldName) {
		const { change } = this.props
		change(fieldName, fileName)
	}

	render() {
		const { handleSubmit, loading, submitting } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
				<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.addCategory)}</h1>
				<Row className={cx(s.paddingRoutesSection, s.displayBlock)}>
					<Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
						<div>
							<FieldArray
								name="categoryList"
								rerenderOnEveryChange={true}
								component={this.rendercategory}
							/>
						</div>
						<Form.Group className={cx(s.formGroup, s.btnTop, 'textAlignLeftRTL')}>
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
						</Form.Group>
					</Form>
				</Row>
			</div>
		)
	}
}

CategoryForm = reduxForm({
	form: 'CategoryForm',
	onSubmit: submit,
	validate
})(CategoryForm);

const selector = formValueSelector('CategoryForm');
const mapState = (state) => ({
	logo: selector(state, 'logo'),
	banner: selector(state, 'banner'),
	categoryList: selector(state, 'categoryList'),
	loading: state.loader.CategoryForm
});
const mapDispatch = { change };

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CategoryForm)));