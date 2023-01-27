import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, change } from 'redux-form';

import withStyles from 'isomorphic-style-loader/withStyles';
import {
  Row,
  FormGroup,
  Col,
  FormControl,
  Container,
} from 'react-bootstrap';
import cx from 'classnames';
import s from './SiteSettingsForm.css';
import bt from '../../../components/commonStyle.css';

import Loader from '../../Common/Loader';
import ImageUploadComponent from '../../../components/Common/ImageUploadComponent';

import { updateTempImages } from '../../../actions/siteadmin/TempImages/updateTempImages';

import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages'

import { siteSettings } from '../../../actions/siteadmin/siteSettings';
import onSubmit from './submit'
import validate from './validate'

import { api, logoUploadDir, faviconUploadDir, siteUrl } from '../../../config';

//images
import defaultIcon from '../../../../public/Icons/defaultImage.svg';

export class SiteSettingsForm extends Component {

  static defaultProps = { loading: false };

  constructor(props) {
    super(props)
    this.successLogo = this.successLogo.bind(this);
    this.successFavicon = this.successFavicon.bind(this);
  }

  async successLogo(file, fromServer) {
    const { change, updateTempImages } = this.props;
    await change('homeLogo', fromServer && fromServer.fileName);
    await updateTempImages('SiteSettings', 'homeLogo', fromServer && fromServer.fileName);
  }

  async successFavicon(file, fromServer) {
    const { change, updateTempImages } = this.props;
    await change('favicon', fromServer && fromServer.fileName);
    await updateTempImages('SiteSettings', 'favicon', fromServer && fromServer.fileName);
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
  };

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
  };

  render() {
    const { handleSubmit, logo, loading, submitting, favicon, intl: { formatMessage } } = this.props;
    return (
      <div>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6} className={cx(s.marbtm14, s.responsiveNoPadding)}>
                <div className={s.profileImgSection}>
                  <label className={bt.labelText} >{formatMessage(messages.logo)}</label>
                  {logo &&
                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + logoUploadDir}medium_${logo})` }} />
                  }
                  {
                    !logo &&
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
                      postUrl: api.apiEndpoint + '/uploadLogoImage'
                    }}
                    success={this.successLogo}
                  />
                </div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} className={cx(s.marbtm14, s.responsiveNoPadding)}>
                <div className={s.profileImgSection}>
                  <label className={bt.labelText} >{formatMessage(messages.favIconlogoLabel)}</label>
                  {favicon &&
                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${siteUrl + faviconUploadDir}${favicon})` }} />
                  }
                  {
                    !favicon &&
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
                      postUrl: siteUrl + '/uploadFavicon'
                    }}
                    success={this.successFavicon}
                  />
                </div>
              </Col>
              <Col xs={12} sm={4} md={6} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="logoWidth" type="text" component={this.renderFormControl} label={formatMessage(messages.logowidth)} />
              </Col>
              <Col xs={12} sm={4} md={12} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="siteName" type="text" component={this.renderFormControl} label={formatMessage(messages.siteName)} maxlength={100} />
              </Col>
              <Col xs={12} sm={4} md={6} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="logoHeight" type="text" component={this.renderFormControl} label={formatMessage(messages.logoheight)} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="siteTitle" type="text" component={this.renderFormControl} label={formatMessage(messages.siteTitle)} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="metaKeyword" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.metakey)} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="metaDescription" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.metaDesc)} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="facebookLink" type="text" component={this.renderFormControl} label={'Facebook URL'} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="twitterLink" type="text" component={this.renderFormControl} label={'Twitter URL'} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="instagramLink" type="text" component={this.renderFormControl} label={'Instagram URL'} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} className={cx(bt.space2, s.responsiveNoPadding)}>
                <Field name="youtubeLink" type="text" component={this.renderFormControl} label={'Youtube URL'} />
              </Col>
            </Row>

            <div className={cx(bt.textAlignRight, 'textAlignLeftRTL', 'loadingBtnRTL')}>
              <FormGroup className={s.formGroup}>
                <div>
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
              </FormGroup>
            </div>

          </form>
        </Container>
      </div>
    )
  }
}

SiteSettingsForm = reduxForm({
  form: 'SiteSettingsForm',
  onSubmit,
  validate
})(SiteSettingsForm);

const selector = formValueSelector('SiteSettingsForm')

const mapState = (state) => ({
  logo: selector(state, 'homeLogo'),
  favicon: selector(state, 'favicon'),
  appForceUpdate: selector(state, 'appForceUpdate'),
  loading: state.loader.SiteSettings
});

const mapDispatch = {
  siteSettings,
  change,
  updateTempImages
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SiteSettingsForm)));