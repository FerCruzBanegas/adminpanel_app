import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import {
    Form,
    Col,
    Card,
    Row,
    InputGroup
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import { injectIntl } from 'react-intl';

import Link from '../../Link';
import Loader from '../../Common/Loader';
import s from './AddCancelReasonForm.css';
import bt from '../../../components/commonStyle.css';

import messages from '../../../locale/messages';
import validate from './validate';
import submit from './submit';

export class AddCancelReasonForm extends Component {
    static defaultProps = {
        loading: false
    };
    componentDidMount() {
        const { initialize, initialValues } = this.props;
        if (initialValues && initialValues.id) {
            initialize({
                id: initialValues && initialValues.id,
                userType: initialValues && initialValues.userType,
                reason: initialValues && initialValues.reason,
                isActive: initialValues && initialValues.isActive == 0 ? 0 : 1
            })
        } else {

            initialize({ userType: 1, isActive: 1 })
        }
    }
    renderField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <Form.Group>
                <label className={bt.labelText} >{label}</label>
                <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </Form.Group>
        )
    }
    renderTextAreaField = ({ input, label, type, meta: { touched, error }, fieldClass, placeholder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <Form.Group>
                <label className={bt.labelText} >{label}</label>
                <Form.Control as="textarea" rows="3" {...input} placeholder={placeholder} type={type} className={fieldClass} />
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </Form.Group>
        )
    }
    render() {
        const { handleSubmit, initialValues, loading, submitting } = this.props;
        const id = initialValues && initialValues.id
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>

                <div className={s.responsiveNoPadding}>
                    <Card className={s.card}>
                        <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                            <h1 className={cx('textAlignRightRTL', s.headingTwo)}>{id ? formatMessage(messages.editCancelReason) : formatMessage(messages.addCancelReason)}</h1>
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12} className={bt.space2}>
                                    <Form.Group className={s.formGroup}>
                                        <div>
                                            <Field
                                                name="reason"
                                                type="text"
                                                placeholder={formatMessage(messages.reason)}
                                                component={this.renderTextAreaField}
                                                label={formatMessage(messages.reason)}
                                                labelClass={bt.labelText}
                                                fieldClass={bt.formControlInput}
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
                                    <Form.Group className={s.formGroup}>
                                        <div>
                                            <label className={bt.labelText} >{formatMessage(messages.cancelledBy)}</label>
                                            <Field name="userType" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                <option value={1}>{formatMessage(messages.user)}</option>
                                                <option value={2}>{formatMessage(messages.partner)}</option>
                                            </Field>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={12} className={bt.space2}>
                                    <Form.Group className={s.formGroup}>
                                        <div>
                                            <label className={bt.labelText} >{formatMessage(messages.status)}</label>
                                            <Field name="isActive" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                <option value={"1"}>{formatMessage(messages.active)}</option>
                                                <option value={"0"}>{formatMessage(messages.inactive)}</option>
                                            </Field>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className={cx(bt.textAlignRight, bt.spaceTop3, 'textAlignLeftRTL', 'loadingBtnRTL')}>
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
                                    <Link to={"/siteadmin/cancel-reasons"} className={cx(s.backBtn, bt.btnSecondary, 'backBtnRTL', s.displayInlineBlock)} >{formatMessage(messages.goBack)}</Link>
                                </Form.Group>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        )
    }
}
AddCancelReasonForm = reduxForm({
    form: 'AddCancelReasonForm',
    onSubmit: submit,
    validate
})(AddCancelReasonForm);
const mapState = (state) => ({
    loading: state.loader.AddCancellation
})

const mapDispatch = {
    initialize
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AddCancelReasonForm)));