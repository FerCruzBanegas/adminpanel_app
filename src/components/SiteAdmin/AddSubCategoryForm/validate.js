import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = messages.required;
    } else if (values.name.trim() == "") {
        errors.name = messages.required;
    }

    if (!values.description) {
        errors.description = messages.required;
    } else if (values.description.trim() == "") {
        errors.description = messages.required;
    }

    if (!values.categoryId) {
        errors.categoryId = messages.required;
    }

    return errors;
};

export default validate