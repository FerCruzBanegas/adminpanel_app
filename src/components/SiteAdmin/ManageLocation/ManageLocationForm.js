import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { flowRight as compose } from 'lodash';
import { connect } from 'react-redux';
// Style
import {
  FormGroup,
  Col,
  FormControl,
  Container,
  Row,
  Form
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';

import Link from '../../Link';
import Loader from '../../Common/Loader';
import GooglePolygonMap from '../../Common/GooglePolygonMap';

import s from './ManageLocation.css';
import bt from '../../../components/commonStyle.css';
import messages from '../../../locale/messages';
import submit from './submit';
import validate from './validate';

class ManageLocationForm extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    loading: false
  };

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    this.props.onPlaceLoaded(place);
  }
  renderFormControl = ({ input, label, type, meta: { touched, error }, className, note }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.formGroup}>
        <div className={bt.noPadding}>
          <label className={bt.labelText} >{label}</label>
          <FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} />
          {
            note && <p className={s.subtext}>{note}</p>
          }
          {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
        </div>
      </FormGroup>
    );
  }
  renderTextAreaField = ({ input, label, type, meta: { touched, error }, children, labelClass, fieldClass, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <Form.Group className={s.formGroup}>
        <label className={bt.labelText} >{label}</label>
        <Form.Control as="textarea" rows="3" {...input} placeholder={placeholder} type={type} className={fieldClass} />
        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
      </Form.Group>
    )
  }
  render() {
    const { error, handleSubmit, submitting, dispatch, title, loading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'mapSection')}>
        <Container className={s.containerWith}>
          <div className={s.contentBox}>
            <h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.addLocation)}</h1>
            <Form onSubmit={handleSubmit(submit)} >
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  {error && <strong>{error}</strong>}
                  {
                    <Field
                      name="locationName"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.nameOnly)}
                      className={cx(bt.formControlInput, bt.space2)}
                    />

                  }
                  {
                    <Field
                      name="description"
                      type="text"
                      placeholder={formatMessage(messages.description)}
                      component={this.renderTextAreaField}
                      label={formatMessage(messages.description)}
                      labelClass={bt.labelText}
                      fieldClass={cx(bt.formControlInput, bt.space2)}
                    />
                  }
                </Col>
                <Col lg={12} md={21} sm={12} xs={12}>
                  <div className={s.relative}>
                    <GooglePolygonMap
                      formName={'ManageLocationForm'}
                      fieldName={'path'}
                    />
                  </div>
                </Col>
              </Row>


              <div className={cx(bt.textAlignRight, bt.spaceTop4, 'textAlignLeftRTL', 'loadingBtnRTL')}>
                <Form.Group className={s.formGroup}>
                  <div className={s.displayInlineBlock}>
                    <Loader
                      type={"button"}
                      label={formatMessage(messages.submitButton)}
                      show={loading}
                      buttonType={'submit'}
                      className={cx(bt.btnPrimary)}
                      disabled={submitting || loading}
                      isSuffix={true}
                    />
                  </div>
                  <Link to={"/siteadmin/location"} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL', s.displayInlineBlock)} >{formatMessage(messages.goBack)}</Link>
                </Form.Group>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}
ManageLocationForm = reduxForm({
  form: 'ManageLocationForm',
  onSubmit: submit,
  validate
})(ManageLocationForm);

const mapState = (state) => ({
  loading: state.loader.AddLocation
});
const mapDispatch = {};
export default injectIntl(compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch)
)(ManageLocationForm));
