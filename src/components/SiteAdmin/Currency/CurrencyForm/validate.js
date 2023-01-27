import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.symbol) {
    errors.symbol = messages.required;
  } else if (values.symbol && values.symbol.toString().trim() == "") {
    errors.symbol = messages.required;
  } else if (values.symbol && values.symbol.length > 20) {
    errors.symbol = messages.exceedLimit;
  }

  return errors
}

export default validate
