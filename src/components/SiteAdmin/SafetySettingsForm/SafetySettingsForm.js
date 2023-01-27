import React, { Component } from 'react';
import s from './SafetySettingsForm.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import submit from './submit';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl, formatMessage } from 'react-intl';
//Style
import cx from 'classnames';
import {
	Form,
	Col,
	Card,
	Row,
	FormGroup,
	FormControl
} from 'react-bootstrap';
import messages from '../../../locale/messages';
import validate from './validate';
import Loader from '../../Common/Loader';
import ImageUploadComponent from '../../../components/Common/ImageUploadComponent';

import { updateTempImages } from '../../../actions/siteadmin/TempImages/updateTempImages';

import { api, homepageUploadDir } from '../../../config';
//images
import defaultIcon from '../../../../public/Icons/defaultImage.svg';

export class SafetySettingsForm extends Component {

	constructor(props) {
		super(props)
		this.successLogo = this.successLogo.bind(this);
		this.successBanner = this.successBanner.bind(this);
		this.successAppStore = this.successAppStore.bind(this);
		this.successPlayStore = this.successPlayStore.bind(this);
	}

	async successLogo(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('safetyGridImage4', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'safetyGridImage4', fromServer && fromServer.fileName);
	}

	async successBanner(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('safetyGridImage3', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'safetyGridImage3', fromServer && fromServer.fileName);
	}

	async successAppStore(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('safetyGridImage2', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'safetyGridImage2', fromServer && fromServer.fileName);
	}

	async successPlayStore(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('safetyGridImage1', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'safetyGridImage1', fromServer && fromServer.fileName);
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
		const { handleSubmit, safetyGridImage1, safetyGridImage2, safetyGridImage3, loading, submitting, safetyGridImage4 } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
				<div className={s.responsiveNoPadding}>
					<Card className={s.card}>
						<Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
							<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.safetySectionSettings)}</h1>
							<Row>
								<Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div className={cx(s.profileImgSection, s.profileImgWidth)}>
											<label className={bt.labelText} >{formatMessage(messages.backGroundImage)}</label><br />
											{
												safetyGridImage4 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${safetyGridImage4})` }} />
											}
											{
												!safetyGridImage4 &&
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
											<label className={bt.labelText} >{formatMessage(messages.safetyImage3)}</label><br />
											{
												safetyGridImage3 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${safetyGridImage3})` }} />
											}
											{
												!safetyGridImage3 &&
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
											<label className={bt.labelText} >{formatMessage(messages.safetyImage1)}</label><br />
											{
												safetyGridImage1 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${safetyGridImage1})` }} />
											}
											{
												!safetyGridImage1 &&
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
											<label className={bt.labelText} >{formatMessage(messages.safetyImage2)}</label><br />
											{
												safetyGridImage2 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${safetyGridImage2})` }} />
											}
											{
												!safetyGridImage2 &&
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
											<Field name="safetyGridTitle1" type="text" component={this.renderField} label={formatMessage(messages.userApptitle)} maxlength={250} />
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name="safetyGridContent1" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.userAppContent)} maxlength={3000} />
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name="safetyGridLink1" type="text" component={this.renderField} label={formatMessage(messages.playstorelink)} />
										</div>
									</Form.Group>
								</Col>
								<Col lg={6} md={6} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name="safetyGridLink2" type="text" component={this.renderField} label={formatMessage(messages.appstorelink)} />
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
SafetySettingsForm = reduxForm({
	form: 'SafetySettingsForm',
	onSubmit: submit,
	validate
})(SafetySettingsForm);

const selector = formValueSelector('SafetySettingsForm');

const mapState = (state) => ({
	safetyGridImage1: selector(state, 'safetyGridImage1'),
	safetyGridImage2: selector(state, 'safetyGridImage2'),
	safetyGridImage3: selector(state, 'safetyGridImage3'),
	safetyGridImage4: selector(state, 'safetyGridImage4'),
	loading: state.loader.SafetySettingsForm
});

const mapDispatch = {
	updateTempImages,
	change
}

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SafetySettingsForm)));
