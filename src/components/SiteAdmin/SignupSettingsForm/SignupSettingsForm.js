import React, { Component } from 'react';
import s from './SignupSettingsForm.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector } from 'redux-form';
import submit from './submit';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
//Style
import cx from 'classnames';
import {
	Form,
	Col,
	Card,
	Row,
	FormControl,
	FormGroup
} from 'react-bootstrap';
import messages from '../../../locale/messages';
import validate from './validate';
import Loader from '../../Common/Loader';
import ImageUploadComponent from '../../../components/Common/ImageUploadComponent';

import { updateTempImages } from '../../../actions/siteadmin/TempImages/updateTempImages';

import { api, homepageUploadDir } from '../../../config';
//images
import defaultIcon from '../../../../public/Icons/defaultImage.svg';

export class SignupSettingsForm extends Component {

	constructor(props) {
		super(props)
		this.successLogo = this.successLogo.bind(this);
		this.successBanner = this.successBanner.bind(this);
		this.successAppStore = this.successAppStore.bind(this);
		this.successPlayStore = this.successPlayStore.bind(this);
	}

	async successLogo(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('signupGridImage4', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'signupGridImage4', fromServer && fromServer.fileName);
	}

	async successBanner(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('signupGridImage3', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'signupGridImage3', fromServer && fromServer.fileName);
	}

	async successAppStore(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('signupGridImage2', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'signupGridImage2', fromServer && fromServer.fileName);
	}

	async successPlayStore(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('signupGridImage1', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'signupGridImage1', fromServer && fromServer.fileName);
	}

	renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder, maxlength }) => {
		const { formatMessage } = this.props.intl
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} maxlength={maxlength} />
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
		)
	}
	renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className, maxlength }) => {
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
							maxlength={maxlength}
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
		const { handleSubmit, signupGridImage1, signupGridImage2, signupGridImage3, loading, submitting, signupGridImage4 } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
				<div className={s.responsiveNoPadding}>
					<Card className={s.card}>
						<Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
							<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.signupSectionSettings)}</h1>

							<Row>
								<Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div className={cx(s.profileImgSection, s.profileImgWidth)}>
											<label className={bt.labelText} >{formatMessage(messages.backGroundImage)}</label><br />
											{
												signupGridImage4 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + 'medium_' + signupGridImage4})` }} />
											}
											{
												!signupGridImage4 &&
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
													postUrl: api.apiEndpoint + '/uploadHomepageImage'
												}}
												success={this.successLogo}
											/>

										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div className={cx(s.profileImgSection, s.profileImgWidth)}>
											<label className={bt.labelText} >{formatMessage(messages.signupImage3)}</label><br />
											{
												signupGridImage3 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + 'medium_' + signupGridImage3})` }} />
											}
											{
												!signupGridImage3 &&
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
													postUrl: api.apiEndpoint + '/uploadHomepageImage'
												}}
												success={this.successBanner}
											/>

										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div className={cx(s.profileImgSection, s.profileImgWidth)}>
											<label className={bt.labelText} >{formatMessage(messages.signupImage1)}</label><br />
											{
												signupGridImage1 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + 'medium_' + signupGridImage1})` }} />
											}
											{
												!signupGridImage1 &&
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
													postUrl: api.apiEndpoint + '/uploadHomepageImage'
												}}
												success={this.successPlayStore}
											/>
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div className={cx(s.profileImgSection, s.profileImgWidth)}>
											<label className={bt.labelText} >{formatMessage(messages.signupImage2)}</label><br />
											{
												signupGridImage2 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + signupGridImage2})` }} />
											}
											{
												!signupGridImage2 &&
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
													postUrl: api.apiEndpoint + '/uploadHomepageImage'
												}}
												success={this.successAppStore}
											/>
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name="signupGridTitle1" type="text" component={this.renderField} label={formatMessage(messages.partnerapptitle)} maxlength={250} />
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name="signupGridContent1" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.partnerappcntn)} maxlength={3000} />
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name="signupGridLink1" type="text" component={this.renderField} label={formatMessage(messages.playstorelink)} />
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name="signupGridLink2" type="text" component={this.renderField} label={formatMessage(messages.appstorelink)} />
										</div>
									</Form.Group>
								</Col>
								<Col lg={12} md={12} sm={12} xs={12} className={cx(bt.textAlignRight, bt.spaceTop3, 'textAlignLeftRTL', 'loadingBtnRTL')}>
									<Form.Group className={s.formGroup}>
										<div className={s.displayInlineBlock}>
											<Loader
												type={"button"}
												label={formatMessage(messages.submitButton)}
												show={loading}
												buttonType={'submit'}
												className={cx(bt.btnPrimary, bt.clickBtn)}
												disabled={submitting || loading}
												isSuffix={true}
											/>
										</div>
									</Form.Group>
								</Col>
							</Row>
						</Form>
					</Card>
				</div>
			</div>
		)
	}
}
SignupSettingsForm = reduxForm({
	form: 'SignupSettingsForm',
	onSubmit: submit,
	validate
})(SignupSettingsForm);
const selector = formValueSelector('SignupSettingsForm')
const mapState = (state) => ({
	signupGridImage1: selector(state, 'signupGridImage1'),
	signupGridImage2: selector(state, 'signupGridImage2'),
	signupGridImage3: selector(state, 'signupGridImage3'),
	signupGridImage4: selector(state, 'signupGridImage4'),
	loading: state.loader.SignupSettingsForm
})
const mapDispatch = {
	updateTempImages,
	change
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SignupSettingsForm)));
