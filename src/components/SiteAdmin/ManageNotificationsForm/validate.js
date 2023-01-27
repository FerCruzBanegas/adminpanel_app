import messages from '../../../locale/messages'

const validate = values => {
    const errors = {}

    if(!values.message) {
        errors.message = messages.messageRequired
    }else if(values.message == '') {
        errors.message = messages.messageRequired
    }else if(values.message && values.message.length > 200) {
        errors.message = messages.messageLength
    }

    return errors
}

export default validate;