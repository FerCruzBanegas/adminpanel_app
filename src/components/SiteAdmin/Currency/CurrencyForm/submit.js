import { addCurrency } from '../../../../actions/siteadmin/Currency/updateCurrency';

async function submit(values, dispatch) {
  
  dispatch(addCurrency(
   values
  ));
}

export default submit;
