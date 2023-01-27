import messages from '../../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.locationId) {
        errors.locationId = messages.required;
    }

    if (!values.categoryId) {
        errors.categoryId = messages.required;
    }

    if (!values.subCategoryId) {
        errors.subCategoryId = messages.required;
    }

    if (!values.basePrice || values.basePrice <= 0) {
        errors.basePrice = messages.required;
    } else if (values.basePrice.toString().trim() == "") {
        errors.basePrice = messages.required;
    } else if (isNaN(values.basePrice)) {
        errors.basePrice = messages.floatError;
    }

    if (!values.multiplierValue || values.multiplierValue <= 0) {
        errors.multiplierValue = messages.required;
    } else if (values.multiplierValue.toString().trim() == "") {
        errors.multiplierValue = messages.required;
    } else if (isNaN(values.multiplierValue)) {
        errors.multiplierValue = messages.floatError;
    }

    return errors;
};

export default validate