import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = messages.required;
    } else if (values.name.toString().trim() == "") {
        errors.name = messages.required;
    }

    if (!values.description) {
        errors.description = messages.required;
    } else if (values.description.toString().trim() == "") {
        errors.description = messages.required;
    }

    if (!values.userServiceFeeValue && values.userServiceFeeValue !== 0) {
        errors.userServiceFeeValue = messages.required;
    } else if (values.userServiceFeeValue && values.userServiceFeeValue.toString().trim() == '') {
        errors.userServiceFeeValue = messages.required;
    } else if (values.userServiceFeeValue && (isNaN(values.userServiceFeeValue) || (!/^[0-9\.]+$/.test(values.userServiceFeeValue)) || (parseFloat(values.userServiceFeeValue, 10) < 1) || (parseInt(values.userServiceFeeValue, 10) > 99))) {
        errors.userServiceFeeValue = messages.invalid;
    }

    if (!values.partnerServiceFeeValue && values.partnerServiceFeeValue !== 0) {
        errors.partnerServiceFeeValue = messages.required;
    } else if (values.partnerServiceFeeValue && values.partnerServiceFeeValue.toString().trim() == '') {
        errors.partnerServiceFeeValue = messages.required;
    } else if (values.partnerServiceFeeValue && (isNaN(values.partnerServiceFeeValue) || (!/^[0-9\.]+$/.test(values.partnerServiceFeeValue)) || (parseFloat(values.partnerServiceFeeValue, 10) < 1) || (parseInt(values.partnerServiceFeeValue, 10) > 99))) {
        errors.partnerServiceFeeValue = messages.invalid;
    }

    if (!values.travellingPrice && values.travellingPrice !== 0) {
        errors.travellingPrice = messages.required;
    } else if (values.travellingPrice.toString().trim() == "") {
        errors.travellingPrice = messages.required;
    } else if (isNaN(values.travellingPrice)) {
        errors.travellingPrice = messages.floatError;
    }

    return errors;
};

export default validate