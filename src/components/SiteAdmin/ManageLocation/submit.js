import { addLocation } from '../../../actions/siteadmin/Location/addLocation';

async function submit(values, dispatch) {
   
   await dispatch(
        addLocation(
            values.locationName,
            JSON.stringify(values.path),
            values.description
        )
    )
}

export default submit;