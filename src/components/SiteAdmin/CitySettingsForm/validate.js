import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.citySectionTitle1) {
        errors.citySectionTitle1 = messages.required;
    } else if (values.citySectionTitle1.trim() == "") {
        errors.citySectionTitle1 = messages.required;
    } else if (values.citySectionTitle1.length < 2 ) {
        errors.citySectionTitle1 = messages.required
    } else if (values.citySectionTitle1.length > 55 ) {
        errors.citySectionTitle1 = messages.exceedLimit
    }

    

    return errors;
};

export default validate;