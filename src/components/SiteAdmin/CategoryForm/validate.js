import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};
    if (values.categoryList) {
        let errorCategory = [];
        values.categoryList.map((item, index) => {
            if (!item.title || item.title.toString().trim() === '')
                errorCategory[index] = { title: messages.required };
            if (!item.description || item.description.toString().trim() === '')
                errorCategory[index] = { ...(errorCategory[index] || {}), description: messages.required };
        });
        if (errorCategory.length > 0) errors.categoryList = errorCategory;
    }
    return errors;
};

export default validate;