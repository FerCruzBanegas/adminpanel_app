import messages from './messages';

const validate = values => {

  const errors = {}

  if (!values.email) {
    errors.email = messages.emailRequired;
  } else if (!/^(([^<>()[\]\\.,;.!-#$_&%*+/=?:{|}~-\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.password) {
    errors.password = messages.passwordRequired;
  } else if (values.password.length < 8) {
    errors.password = messages.passwordInvalid;
  }

  return errors
}

export default validate
