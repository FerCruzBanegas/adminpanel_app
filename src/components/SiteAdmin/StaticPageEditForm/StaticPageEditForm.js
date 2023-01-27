import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);
import VideoResize from 'quill-video-resize-module2';
Quill.register('modules/VideoResize', VideoResize);
//Style
import cx from 'classnames';
import {
	Button,
	Form,
	Col,
	Row,
	FormGroup,
	FormControl
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';

import Link from '../../Link';
import ImageUploadComponent from '../../../components/Common/ImageUploadComponent';

import s from './StaticPageEditForm.css';
import bt from '../../../components/commonStyle.css';

import { updateTempImages } from '../../../actions/siteadmin/TempImages/updateTempImages';

import submit from './submit';
import messages from '../../../locale/messages';
import validate from './validate';
import { api, staticpageUploadDir } from '../../../config';

//images
import defaultIcon from '../../../../public/Icons/defaultImage.svg';

export class StaticPageEditForm extends Component {
	constructor(props) {
		super(props)
		if (typeof window !== 'undefined') {
			this.ReactQuill = require('react-quill')
		}
		this.state = { editorHtml: '' } // You can also pass a Quill Delta here
		this.success = this.success.bind(this);
	}

	async success(file, fromServer) {
		const { change, updateTempImages } = this.props;
		await change('pageBanner', fromServer && fromServer.fileName);
		await updateTempImages('StaticPage', 'staticPage', fromServer && fromServer.fileName);
	}

	renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
		return (
			<Form.Group>
				<label className={bt.labelText} >{label}</label>
				<Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
				{touched && error && <span className={bt.errorMessage}>{error.defaultMessage}</span>}
			</Form.Group>
		)
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
						if (source === 'user' || source === 'api') {
							input.onChange(newValue);
						}
					}}
					onBlur={(range, source, quill) => {
						if (quill.getHTML() == '<p><br></p>') {
							input.onBlur('');
						}
						else {
							input.onBlur(quill.getHTML());
						}
					}}
					modules={modules}
					formats={formats}
					theme="snow"
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
		const { error, handleSubmit, submitting, pageBanner } = this.props;
		const { formatMessage } = this.props.intl;
		const ReactQuill = this.ReactQuill;
		if (typeof window !== 'undefined' && ReactQuill) {
			return (
				<div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
					<Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
						<h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.editPageDetails)}</h1>
						<div className={cx(bt.space2, s.singalCard, s.marbtm14)}>
							<Form.Group className={s.formGroup}>
								<div className={cx(s.profileImgSection, s.profileImgWidth)}>
									<label className={bt.labelText} >{formatMessage(messages.pageBanner)}</label><br />
									{
										pageBanner &&
										<div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + staticpageUploadDir}large_${pageBanner})` }} />
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
											postUrl: api.apiEndpoint + '/uploadStaticBannerImage'
										}}
										success={this.success}
									/>
								</div>
							</Form.Group>
						</div>
						<Row>
							<Col lg={6} md={6} sm={12} xs={12}>
								<div>
									<Form.Group className={s.formGroup}>
										<Field
											name="metaTitle"
											type="text"
											placeholder={formatMessage(messages.metaTitle)}
											component={this.renderFormControl}
											label={formatMessage(messages.metaTitle)}
											labelClass={bt.labelText}
											fieldClass={bt.formControlInput}
										/>
									</Form.Group>
								</div>
							</Col>
							<Col lg={6} md={6} sm={12} xs={12}>
								<div>
									<Form.Group className={s.formGroup}>
										<Field
											name="metaDescription"
											type="text"
											placeholder={formatMessage(messages.metaDescriptionText)}
											component={this.renderFormControlTextArea}
											label={formatMessage(messages.metaDescriptionText)}
											labelClass={bt.labelText}
											fieldClass={bt.formControlInput}
											onChange={(event) => { }}
										/>
									</Form.Group>
								</div>
							</Col>
							<Col lg={12} md={12} sm={12} xs={12}>
								<FormGroup className={s.formGroup}>
									<div>
										<label className={bt.labelText} ><FormattedMessage {...messages.content} /></label>
									</div>
									<div xs={12} sm={9} md={9} lg={9}>
										<Field name="content" component={this.renderQuill} onChange={(event) => { }} />
									</div>
								</FormGroup>
							</Col>
						</Row>
						<div className={cx(bt.textAlignRight, bt.spaceTop3, s.paddingBottom, 'textAlignLeftRTL')}>
							<Form.Group className={s.formGroup}>
								<Button
									type="submit"
									className={cx(bt.btnPrimary)}
								>
									{formatMessage(messages.submitButton)}
								</Button>
								<Link to={'/siteadmin/staticpage/manage'} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL')} >{formatMessage(messages.goBack)}</Link>
							</Form.Group>
						</div>
					</Form>
				</div>
			)
		} else {
			return <textarea />
		}
	}
}
StaticPageEditForm = reduxForm({
	form: 'StaticPageEditForm',
	onSubmit: submit,
	validate
})(StaticPageEditForm);
const selector = formValueSelector('StaticPageEditForm')
const mapState = (state) => ({
	pageBanner: selector(state, 'pageBanner')
})
const mapDispatch = {
	updateTempImages,
	change
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(StaticPageEditForm)));
