import messages from '../../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.accountId) {
        errors.accountId = messages.required;
    } else if (values.accountId && values.accountId.toString().trim() == '') {
        errors.accountId = messages.required;
    }

    if (!values.securityId) {
        errors.securityId = messages.required;
    } else if (values.securityId && values.securityId.toString().trim() == '') {
        errors.securityId = messages.required;
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = messages.required;
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(values.phoneNumber)) {
        errors.phoneNumber = messages.phoneError;
    }

    if (!values.phoneDialCode) {
        errors.phoneDialCode = messages.required;
    }

    return errors;
};

export default validate