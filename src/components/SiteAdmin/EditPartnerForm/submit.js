import { editPartner } from '../../../actions/siteadmin/editPartner';

async function submit(values, dispatch) {
    values.password = values.password ? values.password : undefined;
    await dispatch(
        editPartner(
            values
        )
    )
}

export default submit;