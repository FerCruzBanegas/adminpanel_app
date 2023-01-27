import React, { Component } from 'react';
import s from './CitySettingsForm.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector } from 'redux-form';
import submit from './submit';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
//Style
import cx from 'classnames';
import {
    Button,
    Form,
    Col,
    Card,
    Row,
    FormGroup,
    FormControl
} from 'react-bootstrap';
import messages from '../../../locale/messages';
import validate from './validate';

export class CitySettingsForm extends Component {
    renderField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
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
                            className={bt.formControlInput}
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
        const { handleSubmit } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <div className={s.responsiveNoPadding}>
                    <Card className={s.card}>
                        <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                            <h1 className={cx('textAlignRightRTL', s.headingTwo)}>{formatMessage(messages.citySectionSettings)}</h1>
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Form.Group className={s.formGroup}>
                                        <div>
                                            <Field name="citySectionTitle1" type="text" component={this.renderField} label={formatMessage(messages.categoryTitle)} />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col lg={12} md={12} sm={12} xs={12} className={cx(bt.textAlignRight, bt.spaceTop3, 'textAlignLeftRTL')}>
                                    <Form.Group className={s.formGroup}>
                                        <Button
                                            type="submit"
                                            className={cx(bt.btnPrimary, bt.clickBtn)}
                                        >
                                            {formatMessage(messages.submitButton)}
                                        </Button>

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
CitySettingsForm = reduxForm({
    form: 'CitySettingsForm',
    onSubmit: submit,
    validate
})(CitySettingsForm);
const mapState = (state) => ({

})
const mapDispatch = {
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CitySettingsForm)));
