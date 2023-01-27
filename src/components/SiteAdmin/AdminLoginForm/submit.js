
// Redux Form
import { SubmissionError } from 'redux-form';
import { login } from '../../../actions/siteadmin/AdminUser/login';

async function submit(values, dispatch) {

  let error = null;

  await dispatch(login(
    values.email,
    values.password
  )).then(res => {
    error = res;
  });

  if (error) {
    throw new SubmissionError({ _error: error });
  }

}

export default submit;
