import React, { Component } from 'react';
import s from './HomeSettingsForm.css';
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

export class HomeSettingsForm extends Component {

	constructor(props) {
		super(props)
		this.successImage = this.successImage.bind(this);
		this.successBanner = this.successBanner.bind(this);
	}

	async successBanner(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('homeSectionImage1', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'homeSectionImage1', fromServer && fromServer.fileName);
	}

	async successImage(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('homeSectionImage2', fromServer && fromServer.fileName);
		await updateTempImages('Homepage', 'homeSectionImage2', fromServer && fromServer.fileName);
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
		const { handleSubmit, loading, submitting, homeSectionImage1, homeSectionImage2 } = this.props;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
				<div className={s.responsiveNoPadding}>
					<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.homepageBanner)}</h1>
					<Card className={s.card}>
						<Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
							<Row>
								<Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup}>
										<div className={cx(s.profileImgSection, s.profileImgWidth)}>
											<label className={bt.labelText} >{formatMessage(messages.homeImage1)}</label><br />
											{
												homeSectionImage1 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage1})` }} />
											}
											{
												!homeSectionImage1 &&
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
											<label className={bt.labelText} >{formatMessage(messages.homeImage2)}</label><br />
											{
												homeSectionImage2 &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage2})` }} />
											}
											{
												!homeSectionImage2 &&
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
												success={this.successImage}
											/>
										</div>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col lg={8} md={12} sm={12} xs={12}>
									<Form.Group className={s.formGroup}>
										<div>
											<Field name="homeSectionTitle1" type="text" component={this.renderField} label={formatMessage(messages.homeTitle)} maxlength={250} />
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
											className={cx(bt.btnPrimary, bt.clickBtn)}
											disabled={submitting || loading}
											isSuffix={true}
										/>
									</div>
								</Form.Group>
							</div>
						</Form>
					</Card>
				</div>
			</div>
		)
	}
}
HomeSettingsForm = reduxForm({
	form: 'HomeSettingsForm',
	onSubmit: submit,
	validate
})(HomeSettingsForm);
const selector = formValueSelector('HomeSettingsForm')
const mapState = (state) => ({
	homeSectionImage1: selector(state, 'homeSectionImage1'),
	homeSectionImage2: selector(state, 'homeSectionImage2'),
	homeSectionImage3: selector(state, 'homeSectionImage3'),
	homeSectionImage4: selector(state, 'homeSectionImage4'),
	homeSectionImage5: selector(state, 'homeSectionImage5'),
	homeSectionImage6: selector(state, 'homeSectionImage6'),
	homeSectionImage7: selector(state, 'homeSectionImage7'),
	homeSectionImage8: selector(state, 'homeSectionImage8'),
	loading: state.loader.HomeSettingsForm
})
const mapDispatch = {
	change,
	updateTempImages
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(HomeSettingsForm)));
