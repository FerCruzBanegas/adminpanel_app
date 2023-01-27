import { editUser } from '../../../actions/siteadmin/Users/editUser';

async function submit(values, dispatch) {
    await dispatch(
        editUser(
            values
        )
    )

}

export default submit;