import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.homeSectionTitle1) {
        errors.homeSectionTitle1 = messages.required;
    } else if (values.homeSectionTitle1.trim() == "") {
        errors.homeSectionTitle1 = messages.required;
    }
    

    return errors;
};

export default validate;