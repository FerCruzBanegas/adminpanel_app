import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  Form
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AdminLoginForm.css';
import bt from '../../../components/commonStyle.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import Loader from '../../Common/Loader';
import AdminLogo from './arrow.svg';
import submit from './submit';
import validate from './validate';
import { api, logoUploadDir } from '../../../config';

import adminLoginImage from '../../../../public/static/adminLogin.svg'


class AdminLoginForm extends Component {

  static defaultProps = {
    loading: false,
    siteName: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true
    }
  }

  componentDidMount() {
    this.setState({ isLoad: true });
  }

  UNSAFE_componentWillMount() {
    this.setState({ isLoad: false });
  }

  renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <Form.Group>
        <label className={bt.labelText} >{label}</label>
        <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
      </Form.Group>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, loading, logo } = this.props;
    const { formatMessage } = this.props.intl;
    const { isLoad } = this.state;

    return (
      <div className={s.loginMainBg}>
        <div className={s.loginBg} style={{ backgroundImage: `url(${adminLoginImage})` }} />
        <div className={s.formSection}>
          <div className={s.formInner}>
            <div className={s.loginTitleScetion}>
              {logo &&
                <img
                  src={api.apiEndpoint + logoUploadDir + logo}
                />
              }
              {!logo &&
                <img
                  src={AdminLogo}
                />
              }
              <p className={s.loginTitle}><FormattedMessage {...messages.welcomeAdminLabel} /></p>
            </div>
            <div className={'loginInput'}>
              <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                {error && <span className={bt.errorMessage}>{error}</span>}
                <Field
                  name="email"
                  type="text"
                  component={this.renderField}
                  label={formatMessage(messages.email)}
                  placeholder={formatMessage(messages.emailaddress)}
                  labelClass={bt.labelText}
                  fieldClass={cx(bt.formControlInput)}
                />
                <Field
                  name="password"
                  type="password"
                  component={this.renderField}
                  label={formatMessage(messages.password)}
                  placeholder={formatMessage(messages.password)}
                  labelClass={bt.labelText}
                  fieldClass={cx(bt.formControlInput)}
                />
                <Form.Group className={cx(s.loginButton, 'loadingBtnRTL')}>
                  <Loader
                    type={"button"}
                    label={formatMessage(messages.login)}
                    show={loading}
                    buttonType={'submit'}
                    className={cx(bt.btnPrimary)}
                    disabled={submitting || loading}
                    isSuffix={true}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminLoginForm = reduxForm({
  form: 'AdminLoginForm', // a unique name for this form
  validate,
  onSubmit: submit
})(AdminLoginForm);

const mapState = (state) => ({
  loading: state.loader.AdminLogin,
  siteName: state.siteSettings.data.siteName,
  logo: state.siteSettings.data.homeLogo
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminLoginForm)));

