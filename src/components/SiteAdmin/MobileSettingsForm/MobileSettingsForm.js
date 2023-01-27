import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import withStyles from 'isomorphic-style-loader/withStyles';
import {
  Row,
  FormGroup,
  Col,
  FormControl,
  Container,
  Form,
  InputGroup
} from 'react-bootstrap';
import cx from 'classnames';
import s from './MobileSettingsForm.css';
import bt from '../../../components/commonStyle.css';

import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import Loader from '../../Common/Loader/Loader';
import ToneDropzone from './ToneDropzone';

import onSubmit from './submit';
import validate from './validate';
import { distanceArray } from '../../../helpers/commonHelper';
import { api, toneUploadDir } from '../../../config';
import { deleteTone } from '../../../actions/siteadmin/updateMobileSettings';
import pauseIcon from '../../../../public/Icons/pauseIcon.svg';
import playIcon from '../../../../public/Icons/playIcon.svg';
import deleteIcon from '../../../../public/Icons/deleteIconAudio.svg';
export class MobileSettingsForm extends Component {
  static defaultProps = { loading: false };

  constructor(props) {
    super(props);
    this.state = {
      play: false
    }
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? audioEl.play() : audioEl.pause();
    });
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, maxlength }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormGroup className={s.noMargin}>
          <div>
            <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{label}</label>
          </div>
          <div>
            <FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} maxlength={maxlength} />
            {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
          </div>
        </FormGroup>
      </div>
    );
  };

  renderFieldApp = ({ input, label, type, meta: { touched, error }, className, maxlength, version, time }) => {
    return (
      <div className={cx('inputFormAddon', 'addonBorder')}>
        <Form.Group className={s.noMargin}>
          <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{label}</label>
          <InputGroup>
            {version && <InputGroup.Append>
              <InputGroup.Text>
                V
              </InputGroup.Text>
            </InputGroup.Append>}
            <FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} maxlength={maxlength} />
            {time && <InputGroup.Append>
              <InputGroup.Text>
                min
              </InputGroup.Text>
            </InputGroup.Append>}
          </InputGroup>
          {touched && error && <span className={bt.errorMessage}>{error.defaultMessage}</span>}
        </Form.Group>
      </div>
    )
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, loading, submitting, appForceUpdate, requestTone, deleteTone, requestToneFile } = this.props;
    let distanceData = distanceArray(5, 100);

    return (
      <div>
        <Container fluid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={6} className={bt.space2}>
                <div>
                  <Field name="allowedServices" type="text" component={this.renderFormControl} label={formatMessage(messages.allowedServices)} />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6} className={bt.space2}>
                <Form.Group className={s.noMargin}>
                  <div>
                    <Field name="notificationInterval" type="text" component={this.renderFieldApp} label={formatMessage(messages.notificationInterval)} maxlength={5} time={true} />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={6} className={bt.space2}>
                <div>
                  <Form.Group className={s.noMargin}>
                    <div><label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.allowableDistaceTitle)}{' (KM)'}</label></div>
                    <div>
                      <Field name="allowableDistace" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        {
                          distanceData && distanceData.map(distance => (
                            <option key={distance} value={distance}>{distance}</option>
                          ))
                        }
                      </Field>
                    </div >
                  </Form.Group>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6} className={bt.space2}>
                <div>
                  <Field name="maximumEmergencyContact" type="text" component={this.renderFormControl} label={formatMessage(messages.maximumEmergencyContact)} />
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={6} className={bt.space5}>
                <Form.Group className={s.noMargin}>
                  <div>
                    <Field name="defaultScheduleInterval" type="text" component={this.renderFieldApp} label={formatMessage(messages.defaultScheduleInterval)} maxlength={5} time={true} />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12} sm={12} xs={12} className={bt.space5}>
                <h5 className={cx(s.headingMobile, 'headingMobileRTL')}>{formatMessage(messages.manageForceUpdate)}</h5>
                <Form.Group className={s.noMargin}>
                  <div>
                    <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)}>{formatMessage(messages.forceUpdate)}</label>
                    <Field name="appForceUpdate" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">{formatMessage(messages.forceUpdate)}
                      <option value="true">{formatMessage(messages.Enable)}</option>
                      <option value="false">{formatMessage(messages.Disable)}</option>
                    </Field>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {
              String(appForceUpdate) === 'true' && <Row>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space4}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <Field name="userAndroidVersion" type="text" label={formatMessage(messages.userAndriodVersion)} component={this.renderFieldApp} version={true}
                        maxlength={10} />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <Field name="userIosVersion" type="text" component={this.renderFieldApp} label={formatMessage(messages.useriosVersion)} maxlength={10} version={true} />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space5}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <Field name="partnerAndroidVersion" type="text" component={this.renderFieldApp} label={formatMessage(messages.partnerAndriodVersion)} version={true}
                        maxlength={10} />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space5}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <Field name="partnerIosVersion" type="text" component={this.renderFieldApp} label={formatMessage(messages.partneriosVersion)} maxlength={10} version={true} />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            }

            <Row>
              <Col xl={6} lg={12} md={12} sm={12} xs={12} className={bt.space5}>
                <div>
                  <h5 className={cx(s.headingMobile, 'headingMobileRTL')}>{formatMessage(messages.stripeSettings)}</h5>
                  <Field name="stripePublishableKey" type="text" component={this.renderFormControl} label={formatMessage(messages.stripePublishableKey)} />
                </div>
              </Col>
            </Row>

            <div className={bt.space5}>
              <Row >
                <Col lg={12} md={12} sm={12} xs={12}>
                  <h5 className={cx(s.headingMobile, 'headingMobileRTL')}>{formatMessage(messages.sleepMode)}</h5>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.sleepPartnerios)}</label>
                      <Field name="sleepPartnerios" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.inactive)}</option>
                        <option value="1">{formatMessage(messages.active)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.sleepPartnerAndroid)}</label>
                      <Field name="sleepPartnerAndroid" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.inactive)}</option>
                        <option value="1">{formatMessage(messages.active)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div>
              <Row >
                <Col lg={12} md={12} sm={12} xs={12}>
                  <h5 className={cx(s.headingMobile, 'headingMobileRTL')}>{formatMessage(messages.jobRequestWindow)}</h5>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.duration)}</label>
                      <Field name="duration" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.hide)}</option>
                        <option value="1">{formatMessage(messages.show)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.job)}</label>
                      <Field name="job" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.hide)}</option>
                        <option value="1">{formatMessage(messages.show)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.jobPhoto)}</label>
                      <Field name="photo" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.hide)}</option>
                        <option value="1">{formatMessage(messages.show)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.jobDescription)}</label>
                      <Field name="description" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.hide)}</option>
                        <option value="1">{formatMessage(messages.show)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.estimatedPrice)}</label>
                      <Field name="estimatedPrice" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.hide)}</option>
                        <option value="1">{formatMessage(messages.show)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={bt.space2}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.jobLocation)}</label>
                      <Field name="location" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.hide)}</option>
                        <option value="1">{formatMessage(messages.show)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={bt.space5}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.appOpenRequest)}</label>
                      <Field name="openAppOnRequest" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.Disable)}</option>
                        <option value="1">{formatMessage(messages.Enable)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className={bt.space5}>
                  <Form.Group className={s.noMargin}>
                    <div>
                      <label className={cx(bt.labelText, s.normalFontWeight, s.descriptionText)} >{formatMessage(messages.requestTone)}</label>
                      <Field name="isRequestTimerToneEnable" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                        <option value="0">{formatMessage(messages.Disable)}</option>
                        <option value="1">{formatMessage(messages.Enable)}</option>
                      </Field>
                    </div >
                  </Form.Group>
                </Col>

                <Col lg={6} md={12} sm={12} xs={12} className={bt.space5}>
                  <Form.Group className={s.formGroup}>
                    <div>
                    <h5 className={cx(s.headingMobile, 'headingMobileRTL')}>{formatMessage(messages.uploadRequestTone)}</h5>
                     
                      {!requestTone && <div className={'commonFilepicker'}>
                        <ToneDropzone
                          className={cx(bt.btnSecondary, 'fileNoPadding')}
                          subTextClass={s.subText}
                          subText={formatMessage(messages.maximumUploadSizeLabel)}
                          defaultMessage={formatMessage(messages.chooseFile)}
                        />
                      </div>}
                      {requestTone && <div className={s.audioSection}>
                        <div>{requestToneFile}</div>
                        <div className={s.flex}>
                          <div>
                            <span onClick={this.togglePlay}>{this.state.play ? <img src={pauseIcon} /> : <img src={playIcon} />}
                            </span>
                          </div>
                          <div className={s.paddingLeft}>
                            <span onClick={() => deleteTone(requestTone)}><img src={deleteIcon} /></span>
              
                          </div>
                        </div>
                        <audio className="audio-element">
                          <source src={api.apiEndpoint + toneUploadDir + requestTone}></source>
                        </audio>
                      </div>}
                    </div >
                  </Form.Group>
                </Col>

              </Row>
            </div>

            <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                <h5 className={cx(s.headingMobile, 'headingMobileRTL')}>{formatMessage(messages.Support)}</h5>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} className={bt.space2}>
                <Field name="contactPhoneNumber" type="text" component={this.renderFormControl} label={formatMessage(messages.contactPhoneNumber)} maxLength={15} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} className={bt.space2}>
                <Field name="contactEmail" type="text" component={this.renderFormControl} label={formatMessage(messages.contactEmail)} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} className={bt.space2}>
                <Field name="skype" type="text" component={this.renderFormControl} label={formatMessage(messages.skype)} />
              </Col>
            </Row>
            <div className={cx(bt.textAlignRight, bt.spaceTop3, 'textAlignLeftRTL', 'loadingBtnRTL')}>
              <FormGroup className={s.noMargin}>
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
      </div >
    )
  }
}

MobileSettingsForm = reduxForm({
  form: 'MobileSettingsForm',
  onSubmit,
  validate
})(MobileSettingsForm);

const selector = formValueSelector('MobileSettingsForm')

const mapState = (state) => ({
  appForceUpdate: selector(state, 'appForceUpdate'),
  loading: state.loader.MobileSettings,
  requestTone: selector(state, 'requestTimeTone'),
  requestToneFile: selector(state, 'requestToneFile'),
});

const mapDispatch = {
  deleteTone
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(MobileSettingsForm)));