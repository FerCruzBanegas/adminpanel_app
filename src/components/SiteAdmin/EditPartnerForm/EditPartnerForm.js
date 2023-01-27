import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
//Style
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import {
	Form,
	Col,
	Card,
	Row,
	Badge
} from 'react-bootstrap';

import CountryList from '../../CountryList/CountryList';
import Link from '../../Link/Link';
import Loader from '../../Common/Loader/Loader';
import ImageUploadComponent from '../../../components/Common/ImageUploadComponent';

import s from './EditPartnerForm.css'
import bt from '../../../components/commonStyle.css';

import { removeExperience, uploadExperience } from '../../../actions/siteadmin/Document/uploadExperience';
import uploadProfileImage from '../../../actions/siteadmin/uploadProfileImage';
import uploadIdentity from '../../../actions/siteadmin/Document/uploadIdentity';

import submit from './submit';
import validate from './validate';
import { api, profilePhotouploadDir, documentUploadDir } from '../../../config';
import messages from '../../../locale/messages';

//images
import defaultIcon from '../../../../public/Icons/defaultImage.svg';
import deleteIcon from '../../../../public/Icons/deleteIocn.svg';

export class EditPartnerForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			countryCode: 'IN',
			country: '+91'
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.successProfile = this.successProfile.bind(this);
		this.successIdentity = this.successIdentity.bind(this);
		this.successExperience = this.successExperience.bind(this);
	}

	static defaultProps = {
		loading: false
	};

	componentDidMount() {
		const { initialValues, initialize } = this.props;

		if (initialValues && initialValues.country && initialValues.phoneCountryCode) {
			this.setState({
				countryCode: initialValues.phoneCountryCode,
				country: initialValues.country
			});
		}
	}

	async successProfile(file, fromServer) {
		const { change, uploadProfileImage, id, picture } = this.props;
		await change('picture', fromServer && fromServer.fileName);
		await uploadProfileImage(id, fromServer && fromServer.fileName, picture);
	}

	async successIdentity(file, fromServer) {
		const { change, uploadIdentity, id } = this.props;
		await uploadIdentity(id, fromServer && fromServer.fileName);
	}

	async successExperience(file, fromServer) {
		const { change, uploadExperience, id } = this.props;
		await uploadExperience(id, fromServer && fromServer.fileName);
	}

	renderField = ({ input, label, type, meta: { touched, error }, fieldClass, placeholder, disabled }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} disabled={disabled} />
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
		)
	}
	renderFieldPhoneNumber = ({ input, label, writeOnce, type, meta: { touched, error }, fieldClass, placeholder, disabled }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<Form.Control {...input} readOnly={writeOnce} placeholder={placeholder} type={type} className={bt.formControlInput} disabled={disabled} />
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</Form.Group>
		)
	}
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleCountryChange(e, selectedData) {
		this.setState({
			country: selectedData.dialCode,
			countryCode: selectedData.countryCode
		});
	}

	render() {
		const { handleSubmit, id, picture, loading, submitting, getUser, identityDocument, experienceDocument, removeExperience, userIdentityLoading } = this.props
		const { formatMessage } = this.props.intl;
		const { countryCode } = this.state;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, 'tabLabelText')}>
				<Row>
					<Col md={12} lg={12} sm={12} xs={12}>
						<Card className={s.card}>
							<Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
								<h1 className={cx('textAlignRightRTL', s.headingTwo)}>
									{formatMessage(messages.editPartner)}
									<span className={s.userStatusBadge}>
										<Badge pill variant={getUser && getUser.result && getUser.result.isActive === 1 && getUser.result.isBan === 0 ? 'success' : 'danger'}>
											{getUser && getUser.result && getUser.result.isActive === 1 && getUser.result.isBan === 0 ? formatMessage(messages.online) : formatMessage(messages.offline)}
										</Badge>
										{' '}
										{getUser && getUser.result && getUser.result.isActive === 1 && getUser.result.isBan === 0 && <Badge pill variant={getUser.result.activeStatus === "inactive" ? 'success' : 'danger'}>
											{getUser.result.activeStatus === "inactive" ? formatMessage(messages.eligibleForAService) : formatMessage(messages.notEligibleForAService)}
										</Badge>}
									</span>
								</h1>
								<Row>
									<Col lg={12} md={12} sm={6} xs={12} className={cx(bt.space2, s.marbtm14)}>
										<Form.Group className={s.formGroup}>
											<div className={cx(s.profileImgSection, s.singalCard)}>
												<label className={bt.labelText} >{formatMessage(messages.profilePicture)}</label><br />
												{
													picture &&
													<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + profilePhotouploadDir}medium_${picture})` }} />
												}
												{
													!picture &&
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
														postUrl: api.apiEndpoint + '/uploadProfileImage'
													}}
													success={this.successProfile}
												/>
											</div>
										</Form.Group>
									</Col>

									<Col lg={6} md={12} sm={6} xs={12} className={cx(bt.space2, s.marbtm14)}>
										<Form.Group className={s.formGroup}>
											<div className={cx(s.profileImgSection)}>
												<label className={bt.labelText} >{formatMessage(messages.userIdentity)}</label><br />
												<Loader
													show={userIdentityLoading}
													type={"page"}
												>
													{
														identityDocument && identityDocument.length === 0 &&
														<div className={cx(s.backgroundImg, s.defaultIcon)} style={{ backgroundImage: `url(${defaultIcon})` }} />
													}

													<div className={cx('row')}>
														{
															identityDocument && identityDocument.length > 0 && identityDocument.map((item, key) => {
																return (
																	<div className={s.positionRelative}>
																		<Col lg={12} md={12} sm={6} xs={6}>
																			<div className={s.bannerImageBg} style={{ backgroundImage: `url(${api.apiEndpoint + documentUploadDir}medium_${item.imageName})` }} />
																			<a href="javascript:void(0);" onClick={() => removeExperience(id, item.imageName, 'identityDocument')} className={cx(s.bannerDelete, 'trashIconNewRTL')}>
																				<img src={deleteIcon} alt='Delete' />
																			</a>
																		</Col>
																	</div>

																);
															})
														}
													</div>
												</Loader>
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
														postUrl: api.apiEndpoint + '/uploadIdentityImage'
													}}
													success={this.successIdentity}
													loaderName={"userIdentityLoading"}
												/>

											</div>
										</Form.Group>
									</Col>

									<Col lg={6} md={12} sm={6} xs={12} className={cx(bt.space2, s.marbtm14)}>
										<Form.Group className={s.formGroup}>
											<div className={cx(s.profileImgSection)}>
												<label className={bt.labelText} >{formatMessage(messages.userExperience)}</label><br />

												{
													experienceDocument && experienceDocument.length === 0 &&
													<div className={cx(s.backgroundImg, s.defaultIcon)} style={{ backgroundImage: `url(${defaultIcon})` }} />
												}

												<div className={cx('row')}>
													{
														experienceDocument && experienceDocument.length > 0 && experienceDocument.map((item, key) => {
															return (

																<div className={s.positionRelative}>
																	<Col lg={12} md={12} sm={6} xs={6}>
																		<div className={s.bannerImageBg} style={{ backgroundImage: `url(${api.apiEndpoint + documentUploadDir}medium_${item.imageName})` }} />
																		<a href="javascript:void(0);" onClick={() => removeExperience(id, item.imageName, 'experienceDocument')} className={cx(s.bannerDelete, 'trashIconNewRTL')}>
																			<img src={deleteIcon} alt='Delete' />
																		</a>
																	</Col>
																</div>

															);
														})
													}
												</div>
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
														postUrl: api.apiEndpoint + '/uploadExperienceImage'
													}}
													success={this.successExperience}
												/>

											</div>
										</Form.Group>
									</Col>

									<Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="firstName"
													type="text"
													placeholder={formatMessage(messages.firstName)}
													component={this.renderField}
													label={formatMessage(messages.firstName)}
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
													name="lastName"
													type="text"
													placeholder={formatMessage(messages.lastName)}
													component={this.renderField}
													label={formatMessage(messages.lastName)}
													labelClass={bt.labelText}
													fieldClass={bt.formControlInput}
												/>
											</div>
										</Form.Group>
									</Col>
									<Col lg={6} md={12} sm={12} xs={12} className={cx(bt.space2)}>
										<div><label className={bt.labelText} >{formatMessage(messages.phoneNumber)}</label></div>
										<div className={cx(s.displayInlineBlock, s.countryCode, 'phoneColor')}>
											<Form.Group className={s.formGroup}>
												<div>
													<Field
														name="phoneDialCode"
														type="text"
														placeholder={formatMessage(messages.phoneDialCode)}
														component={this.renderFieldPhoneNumber}
														labelClass={bt.labelText}
														fieldClass={cx(bt.formControlInput, bt.formControlInputCountryCode)}
														writeOnce={true}
													/>
												</div>
											</Form.Group>
										</div>
										<div className={cx(s.displayInlineBlock, s.countryPhoneNumber, 'phoneNumber')}>
											<Form.Group className={s.formGroup}>
												<div>
													<Field
														name="phoneNumber"
														type="text"
														placeholder={formatMessage(messages.phoneNumber)}
														component={this.renderFieldPhoneNumber}
														labelClass={bt.labelText}
														fieldClass={cx(bt.formControlInput, bt.formControlInputCountry)}
														disabled={true}
													/>
												</div>
											</Form.Group>
										</div>
									</Col>
									<Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<Field
													name="email"
													type="text"
													component={this.renderField}
													placeholder={formatMessage(messages.email)}
													label={formatMessage(messages.email)}
													labelClass={bt.labelText}
													fieldClass={bt.formControlInput}
													disabled={true}
												/>
											</div>
										</Form.Group>
									</Col>
									<Col lg={3} md={6} sm={6} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<label className={bt.labelText} >{formatMessage(messages.userStatus)}</label><br />
												<Field name="userStatus" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
													<option value="pending">{formatMessage(messages.pending)}</option>
													<option value="active">{formatMessage(messages.approve)}</option>
													<option value="inactive">{formatMessage(messages.decline)}</option>
												</Field>
											</div>
										</Form.Group>
									</Col>
									<Col lg={3} md={6} sm={6} xs={12} className={bt.space2}>
										<Form.Group className={s.formGroup}>
											<div>
												<label className={bt.labelText} >{formatMessage(messages.banStatus)}</label><br />
												<Field name="isBan" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
													<option value="0">{formatMessage(messages.permit)}</option>
													<option value="1">{formatMessage(messages.ban)}</option>
												</Field>
											</div>
										</Form.Group>
									</Col>
								</Row>
								<div className={cx(bt.textAlignRight, bt.spaceTop3, 'textAlignLeftRTL', 'loadingBtnRTL')}>
									<Form.Group className={s.formGroup}>
										<div className={s.displayInlineBlock}>
											<Loader
												type={"button"}
												label={formatMessage(messages.update)}
												show={loading}
												buttonType={'submit'}
												className={cx(s.button, bt.btnPrimary)}
												disabled={submitting || loading}
												isSuffix={true}
											/>
										</div>
										<Link to={"/siteadmin/partners"} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL')}>{formatMessage(messages.goBack)}</Link>
									</Form.Group>
								</div>
							</Form>
						</Card>
					</Col>
				</Row>
			</div >
		)
	}
}
EditPartnerForm = reduxForm({
	form: 'EditPartnerForm', // a unique name for this form
	validate,
	onSubmit: submit
})(EditPartnerForm)
const selector = formValueSelector('EditPartnerForm')
const mapState = state => ({
	id: selector(state, 'id'),
	picture: selector(state, 'picture'),
	identityDocument: selector(state, 'identityDocument'),
	experienceDocument: selector(state, 'experienceDocument'),
	loading: state.loader.EditPartner,
	userIdentityLoading: state.loader.userIdentityLoading,
	userExperienceLoading: state.loader.userExperienceLoading,
})
const mapDispatch = {
	removeExperience,
	uploadIdentity,
	uploadProfileImage,
	change,
	uploadExperience
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditPartnerForm)));
