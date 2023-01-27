import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { maxUploadSize, api } from '../../../config';
import cx from 'classnames';
import { change } from 'redux-form';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export class TripToneDropzone extends Component {

	constructor(props) {
		super(props)

		this.addedfile = this.addedfile.bind(this);
		this.success = this.success.bind(this);
		this.dropzone = null;
	}

	componentDidUpdate() {
		const isBrowser = typeof window !== 'undefined';
		const isDocument = typeof document !== undefined;
		if (isBrowser && isDocument) {
			document.querySelector(".dz-hidden-input").style.visibility = 'visible';
			document.querySelector(".dz-hidden-input").style.opacity = '0';
			document.querySelector(".dz-hidden-input").style.height = '100%';
			document.querySelector(".dz-hidden-input").style.width = '100%';
			document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
		}

	}

	async success(file, fromServer) {
		const { id, change } = this.props;
		const fileName = fromServer.fileName;
		await change("MobileSettingsForm", 'requestTimeTone', fileName);
		await change("MobileSettingsForm", 'requestToneFile', file.name);
	}

	addedfile(file, fromServer) {
		let fileFormates = [
			'application/sql',
			'application/pdf',
			'application/vnd.oasis.opendocument.presentation',
			'text/csv',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/epub+zip',
			'application/zip',
			'text/plain',
			'application/rtf',
			'application/vnd.oasis.opendocument.text',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.oasis.opendocument.spreadsheet',
			'text/tab-separated-values',
			'text/calendar',
			'image/jpeg',
			'image/png',
			'image/svg+xml',
			'image/jpg'
		];

		if (file && file.size > (1024 * 1024 * maxUploadSize)) {
			showToaster({ messageId: 'limitError', toasterType: 'error' });
			this.dropzone.removeFile(file);
		}

		if (fileFormates.indexOf(file && file.type) > 0) {
			setTimeout(() => {
				if (file && file.accepted === false) {
					showToaster({ messageId: 'filetypeError', toasterType: 'error' });
					this.dropzone.removeFile(file.name);
				}
			}, 1000)
		}

		if (file && file.accepted === false) {
			setTimeout(() => {
				if (file && file.accepted === false) {
					showToaster({ messageId: 'filetypeError', toasterType: 'error' });
					this.dropzone.removeFile(file.name);
				}
			}, 1000)
		}

		if (file && file.accepted === true) {
			setTimeout(() => {
				if (file && file.accepted === true) {
				}
			}, 1000)
		}
	}

	render() {
		const { defaultMessage, className, subTextClass, subText } = this.props;
		const apiEndpoint = api && api.apiEndpoint;

		const djsConfig = {
			dictDefaultMessage: '',
			addRemoveLinks: false,
			uploadMultiple: false,
			maxFilesize: maxUploadSize,
			acceptedFiles: 'audio/mp3, audio/mpeg',
			dictMaxFilesExceeded: 'Remove the existing file and try upload again',
			previewsContainer: false,
			hiddenInputContainer: '.dzInputContainerLogo',
			timeout: 300000,
			maxFiles: 1,
			url: apiEndpoint + '/uploadTone',
			method: "POST",
			withCredentials: false,
			headers: {
				"Cache-Control": "",
			}
		};

		var componentConfig = {
			// iconFiletypes: ['.mp3'],
			multiple: false,
			showFiletypeIcon: false,
			postUrl: apiEndpoint + '/uploadTone'
		};

		const eventHandlers = {
			init: dz => this.dropzone = dz,
			success: this.success,
			addedfile: this.addedfile
		};


		return (
			<div>
				<div className={cx('dzInputContainerLogo', 'dzInputContainerLogoOpacity')}>
					<div className={className}>
						<DropzoneComponent
							config={componentConfig}
							eventHandlers={eventHandlers}
							djsConfig={djsConfig}
						>
							{defaultMessage}
						</DropzoneComponent>
					</div>
				</div>
				<p className={cx(subTextClass, 'droupText')}>
					{subText}: {maxUploadSize}MB
				</p>
			</div>
		)
	}
}

const mapState = state => ({});

const mapDispatch = {
	change,
};

export default (connect(mapState, mapDispatch)(TripToneDropzone));
