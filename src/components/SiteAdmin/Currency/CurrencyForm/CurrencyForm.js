// General
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
// Redux Form
import { Field, reduxForm } from 'redux-form';
// Style
import {
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import s from './CurrencyForm.css';
import bt from '../../../../components/commonStyle.css';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
// Internal Components
import submit from './submit';
import validate from './validate';

class CurrencyForm extends Component {
  constructor(props) {
    super(props);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error } }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormGroup className={bt.space1}>
          <div>
            <FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} />
            {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
          </div>
        </FormGroup>
      </div>
    );
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx('maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={bt.space3}>
            <label className={bt.labelText} ><FormattedMessage {...messages.symbol} /></label>
            <Field
              name="symbol"
              type="text"
              component={this.renderFormControl}
              className={cx(bt.formControlInput)}
            />
          </FormGroup>
          <FormGroup className={s.formGroup}>
            <div>
              <label className={bt.labelText} >{formatMessage(messages.status)}</label>
              <Field name="isEnable" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                <option value={1}>{formatMessage(messages.Enable)}</option>
                <option value={0}>{formatMessage(messages.Disable)}</option>
              </Field>
            </div>
          </FormGroup>

          <FormGroup className={bt.space3}>
            <div className={cx(bt.textAlignRight, 'textAlignLeftRTL')}>
              <Button className={cx(bt.btnPrimary)} bsSize="large" type="submit" disabled={submitting}>
                {formatMessage(messages.add)}
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }
}
CurrencyForm = reduxForm({
  form: "CurrencyForm", // a unique name for this form
  validate,
})(CurrencyForm);

const mapState = (state) => ({
});
const mapDispatch = {};
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CurrencyForm)));