import React, { Component } from 'react';
import s from './FooterSettingsForm.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector } from 'redux-form';
import submit from './submit';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
//Style
import cx from 'classnames';
import {
    Form,
    Col,
    Card,
    Row,
    FormControl,
    FormGroup
} from 'react-bootstrap';
import messages from '../../../locale/messages';
import validate from './validate';
import Dropzone from './Dropzone.js'
import Loader from '../../Common/Loader';
import { api, homepageUploadDir } from '../../../config';

export class FooterSettingsForm extends Component {
    renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
        const { formatMessage } = this.props.intl
        return (
            <Form.Group>
                <label className={bt.labelText} >{label}</label>
                <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </Form.Group>
        )
    }
    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl
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
    render() {
        const { handleSubmit, footerLogo1, footerLogo2, footerLogo3, footerLogo4, loading, submitting } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <div className={s.responsiveNoPadding}>
                    <Card className={s.card}>
                        <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                            <h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.footerSectionSettings)}</h1>
                            <Row>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Form.Group className={s.formGroup}>
                                        <div>
                                            <Field name="footerTitle1" type="text" component={this.renderField} label={formatMessage(messages.footerTitle1)} />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Form.Group className={s.formGroup}>
                                        <div>
                                            <Field name="footerContent1" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.footerContent1)} />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Form.Group className={s.formGroup}>
                                        <div>
                                            <Field name="footerLinkTitle" type="text" component={this.renderField} label={formatMessage(messages.footerUrltitle)} />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Form.Group className={s.formGroup}>
                                        <div>
                                            <Field name="footerBottom" type="text" component={this.renderField} label={formatMessage(messages.copyRightcontent)} />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={12} md={12} sm={12} xs={12} className={cx(bt.textAlignRight, bt.spaceTop3, 'textAlignLeftRTL', 'loadingBtnRTL')}>
                                    <Form.Group className={s.formGroup}>
                                        <div className={s.displayInlineBlock}>
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
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </div>
            </div>
        )
    }
}
FooterSettingsForm = reduxForm({
    form: 'FooterSettingsForm',
    onSubmit: submit,
    validate
})(FooterSettingsForm);
const selector = formValueSelector('FooterSettingsForm')
const mapState = (state) => ({
    footerLogo1: selector(state, 'footerLogo1'),
    footerLogo2: selector(state, 'footerLogo2'),
    footerLogo3: selector(state, 'footerLogo3'),
    footerLogo4: selector(state, 'footerLogo4'),
    loading: state.loader.SignupSettingsForm
})
const mapDispatch = {

}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(FooterSettingsForm)));
