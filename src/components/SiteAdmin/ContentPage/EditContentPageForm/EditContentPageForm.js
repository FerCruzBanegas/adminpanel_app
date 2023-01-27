import React from 'react';
import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);
import VideoResize from 'quill-video-resize-module2';
Quill.register('modules/VideoResize', VideoResize);

import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import s from './EditContentPageForm.css';
import bt from '../../../../components/commonStyle.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import {
	Button,
	Form,
	Col,
	Row,
	FormGroup,
	FormControl,
	InputGroup,
} from 'react-bootstrap';

import Link from '../../../Link';
import ImageUploadComponent from '../../../../components/Common/ImageUploadComponent';

import { updateTempImages } from '../../../../actions/siteadmin/TempImages/updateTempImages';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';

import onSubmit from './submit';
import validate from './validate';

import { formatURL } from '../../../../helpers/formatUrl';
import { api, contentPageUploadDir, siteUrl } from '../../../../config';

//images
import defaultIcon from '../../../../../public/Icons/defaultImage.svg';

class EditContentPageForm extends React.Component {

	constructor(props) {
		super(props)
		if (typeof window !== 'undefined') this.ReactQuill = require('react-quill');
		this.success = this.success.bind(this);
	}


	async success(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('pageBanner', fromServer && fromServer.fileName);
		await updateTempImages('ContentPage', 'pageBanner', fromServer && fromServer.fileName);
	}

	handlePageTitle = (e) => {
		const { change } = this.props;
		if (e && e.target && e.target.value) change('pageUrl', formatURL(e.target.value));
		else change('pageUrl', '');
	}

	renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
		const { formatMessage } = this.props.intl;
		return (
			<FormGroup>
				<label className={bt.labelText} >{label}</label>
				<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</FormGroup>
		);
	}

	renderFormControl = ({ input, label, type, meta: { touched, error }, className, maxlength }) => {
		const { formatMessage } = this.props.intl;
		return (
			<div>
				<FormGroup className={s.formGroup}>
					<div>
						<label className={bt.labelText} >{label}</label>
					</div>
					<div>
						<FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} maxlength={maxlength} />
						{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
					</div>
				</FormGroup>
			</div>
		);
	}

	renderFormControlPageUrl = ({ input, label, placeholder, type, meta: { touched, error }, className }) => {
		const { formatMessage } = this.props.intl;
		return (
			<FormGroup className={s.formGroup}>
				<Col xs={12} sm={12} md={12} lg={12}>
					<label className={bt.labelText} >{label}</label>
				</Col>
				<Col xs={12} sm={12} md={12} lg={12}>
					<div className={'pageUrlInput'}>
						<InputGroup>
							<InputGroup.Text>
								<InputGroup.Append>
									<span>{siteUrl}/</span>
								</InputGroup.Append>
							</InputGroup.Text>
							<FormControl {...input} placeholder={placeholder} type={type} className={cx(className, 'pageUrlFormInput')} />
						</InputGroup>
						{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
					</div>
				</Col>
			</FormGroup>
		);
	}

	renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
		const { formatMessage } = this.props.intl;
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

	renderQuill = ({ input, label, type, meta: { touched, error }, className }) => {
		const ReactQuill = this.ReactQuill;
		const { formatMessage } = this.props.intl;
		let modules = {
			toolbar: {
				container: [
					[{ 'header': '1' }, { 'header': '2' }],
					[{ size: [] }],
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
					[{ 'list': 'ordered' }, { 'list': 'bullet' },
					{ 'indent': '-1' }, { 'indent': '+1' }],
					['link', 'image', 'video']
				],
				handlers: {
					image: this.imageHandler,
				}
			},
			clipboard: {
				matchVisual: false,
			},
			imageResize: {
				parchment: Quill.import('parchment'),
				modules: ['Resize', 'DisplaySize'],
				displayStyles: {
					backgroundColor: 'black',
					border: 'none',
					color: 'white'
				},
			},
			VideoResize: {
				modules: ['Resize', 'DisplaySize'],
			}
		};

		let formats = [
			'header', 'size',
			'bold', 'italic', 'underline', 'strike', 'blockquote',
			'list', 'bullet', 'indent',
			'link', 'image', 'video', 'width', 'alt', 'height', 'style', 'size'
		];

		return (
			<div data-text-editor="name">
				<ReactQuill
					{...input}
					onChange={(newValue, delta, source) => {
						if (source === 'user' || 'api') {
							input.onChange(newValue);
						}
					}}
					onBlur={(range, source, quill) => {
						if (quill.getHTML() == '<p><br></p>') input.onBlur('');
						else input.onBlur(quill.getHTML());
					}}
					modules={modules}
					formats={formats}
					theme="snow"
					preserveWhitespace={true}
					bounds={`[data-text-editor="name"]`}
				/>
				{touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
			</div>
		);
	}


	async imageHandler() {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();
		input.onchange = async () => {
			const file = input.files[0];
			const formData = new FormData();

			formData.append('image', file);

			// Save current cursor state
			const range = this.quill.getSelection(true);

			// Move cursor to right side of image (easier to continue typing)
			this.quill.setSelection(range.index + 1);

			// Get the filePath from Uploaded URL
			const res = await fetch('/file-upload-cms', {
				method: 'POST',
				body: formData
			});

			// Get Response from the String
			const data = await res.json();
			let filePath = data.filePath;

			// Remove placeholder image
			this.quill.deleteText(range.index, 1);
			filePath = "/" + filePath;

			// Insert uploaded image
			const { ops } = this.quill.insertEmbed(range.index, 'image', filePath);

		};
	}

	render() {
		const { handleSubmit, pageBanner, intl: { formatMessage } } = this.props;
		const ReactQuill = this.ReactQuill;
		if (typeof window !== 'undefined' && ReactQuill) {
			return (
				<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
					<Form className={s.fullWidth} onSubmit={handleSubmit(onSubmit)}>
						<div className={cx(s.singalCard, s.marbtm14)}>
							<Row>
								<Col lg={12} md={12} sm={12} xs={12} className={s.paddingTop}>
									<FormGroup className={s.formGroup}>
										<div className={cx(s.profileImgSection)}>
											<label className={bt.labelText} ><FormattedMessage {...messages.pageImageBanner} /></label><br />
											{
												pageBanner &&
												<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + contentPageUploadDir}large_${pageBanner})` }} />
											}
											{
												!pageBanner &&
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
													postUrl: api.apiEndpoint + '/uploadContentPageBannerImage'
												}}
												success={this.success}
											/>
										</div>
									</FormGroup>
								</Col>
							</Row>
						</div>
						<Row>
							<Col lg={6} md={12} sm={12} xs={12}>
								<FormGroup className={s.formGroup}>
									<Field
										name="metaTitle"
										type="text"
										placeholder={formatMessage(messages.metaTitle)}
										component={this.renderFormControl}
										label={formatMessage(messages.metaTitle)}
										labelClass={bt.labelText}
										fieldClass={bt.formControlInput}
									/>
								</FormGroup>
							</Col>
							<Col lg={6} md={12} sm={12} xs={12}>
								<FormGroup className={s.formGroup}>
									<Field
										name="metaDescription"
										type="text"
										placeholder={formatMessage(messages.metaDescriptionText)}
										component={this.renderFormControlTextArea}
										label={formatMessage(messages.metaDescriptionText)}
										labelClass={bt.labelText}
										fieldClass={bt.formControlInput}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col lg={6} md={12} sm={12} xs={12}>
								<FormGroup className={s.formGroup}>
									<Field
										name="pageTitle"
										type="text"
										component={this.renderFormControl}
										label={formatMessage(messages.pageTitle)}
										placeholder={formatMessage(messages.pageTitle)}
										onChange={this.handlePageTitle}
									/>
								</FormGroup>
							</Col>
							<Col lg={6} md={12} sm={12} xs={12} className={bt.noPadding}>
								<FormGroup className={s.formGroup}>
									<Field
										name="pageUrl"
										type="text"
										component={this.renderFormControlPageUrl}
										label={formatMessage(messages.pageUrl)}
										placeholder={formatMessage(messages.pageUrl)}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col lg={12} md={12} sm={12} xs={12}>
								<FormGroup className={s.formGroup}>
									<div>
										<label className={bt.labelText} ><FormattedMessage {...messages.content} /></label>
									</div>
									<div>
										<Field name="content" component={this.renderQuill} onChange={(event) => { }} />
									</div>
								</FormGroup>
							</Col>
						</Row>
						<div className={cx(bt.textAlignRight,
							bt.spaceTop3, s.paddingBottom, 'textAlignLeftRTL')}>
							<Form.Group className={s.formGroup}>
								<Button
									type="submit"
									className={cx(bt.btnPrimary)}
								>
									<FormattedMessage {...messages.submitButton} />
								</Button>
								<Link to={'/siteadmin/contentpage/manage'} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL')} ><FormattedMessage {...messages.goBack} /></Link>
							</Form.Group>
						</div>
					</Form>
				</div>
			);
		}
		else return <span></span>;
	}
}

EditContentPageForm = reduxForm({
	form: 'ContentPageForm',
	validate,
	onSubmit,
})(EditContentPageForm);

const contentPageFormSelector = formValueSelector('ContentPageForm');
const mapState = (state) => ({
	pageTitle: contentPageFormSelector(state, 'pageTitle'),
	pageBanner: contentPageFormSelector(state, 'pageBanner'),
});

const mapDispatch = {
	change,
	updateTempImages
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditContentPageForm)));



