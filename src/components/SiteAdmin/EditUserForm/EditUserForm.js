import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
//Style
import cx from 'classnames';
import {
	Form,
	Col,
	Card,
	Row
} from 'react-bootstrap';
import s from './EditUserForm.css';
import bt from '../../../components/commonStyle.css';
import withStyles from 'isomorphic-style-loader/withStyles';

import Link from '../../Link/Link';
import CountryList from '../../CountryList/CountryList';
import Loader from '../../Common/Loader/Loader';
import ImageUploadComponent from '../../../components/Common/ImageUploadComponent';

import uploadProfileImage from '../../../actions/siteadmin/uploadProfileImage'

import messages from '../../../locale/messages';
import { api, profilePhotouploadDir } from '../../../config';
import submit from './submit';
import validate from './validate';

//images
import defaultIcon from '../../../../public/Icons/defaultImage.svg';

export class EditUserForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			countryCode: 'US',
			country: '+1',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.success = this.success.bind(this);
	}

	static defaultProps = {
		loading: false
	};

	async success(file, fromServer) {
		const { change, uploadProfileImage, id, picture } = this.props;
		await change('picture', fromServer && fromServer.fileName);
		uploadProfileImage(id, fromServer && fromServer.fileName, picture)
	}

	renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder, disabled, maxLength }) => {
		const { formatMessage } = this.props.intl;
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} disabled={disabled} maxLength={maxLength} />
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
	componentDidMount() {
		const { initialValues } = this.props;
		if (initialValues && initialValues.country && initialValues.phoneCountryCode) {
			this.setState({
				countryCode: initialValues.phoneCountryCode,
				country: initialValues.country
			});
		}
	}
	render() {
		const { handleSubmit, id, picture, loading, submitting } = this.props
		const { formatMessage } = this.props.intl;
		const { countryCode } = this.state;
		return (
			<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
				<div className={s.responsiveNoPadding}>
					<Card className={s.card}>
						<Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
							<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.editUser)}</h1>
							<div className={cx(bt.space3, s.singalCard, s.marbtm14)}>
								<Form.Group className={s.formGroup} >
									<div className={s.profileImgSection}>
										<label className={bt.labelText} >{formatMessage(messages.profilePicture)}</label>
										<div>

											{picture &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + profilePhotouploadDir}medium_${picture})` }} />
											}
											{
												!picture &&
												<div className={cx(s.backgroundImg, s.defaultIcon)} style={{ backgroundImage: `url(${defaultIcon})` }} />
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
												postUrl: api.apiEndpoint + '/uploadProfileImage'
											}}
											success={this.success}
										/>
									</div>
								</Form.Group>
							</div>
							<Row>
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
												maxLength={15}
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
												maxLength={15}
											/>
										</div>
									</Form.Group>
								</Col>
							</Row>
							<Row>
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

								<Col lg={6} md={12} sm={12} xs={12} className={cx(s.space2)}>
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
							</Row>
							<Row>
								<Col lg={3} md={6} sm={6} xs={12} className={bt.space2}>
									<Form.Group className={s.formGroup} controlId="exampleForm.ControlSelect1">
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
								<Link to={"/siteadmin/users"} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL')}>{formatMessage(messages.goBack)}</Link>
							</div>
						</Form>
					</Card>
				</div>
			</div>
		)
	}
}
EditUserForm = reduxForm({
	form: 'EditUserForm', // a unique name for this form
	validate,
	onSubmit: submit
})(EditUserForm)
const selector = formValueSelector('EditUserForm')
const mapState = state => ({
	id: selector(state, 'id'),
	picture: selector(state, 'picture'),
	loading: state.loader.EditUser
})
const mapDispatch = {
	change,
	uploadProfileImage
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditUserForm)));


