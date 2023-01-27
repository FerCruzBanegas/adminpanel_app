import { updateLocation } from '../../../actions/siteadmin/Location/updateLocation';

async function submit(values, dispatch) {
  values.isActive = values.isActive == true ? 1 : 0;
   await dispatch(
        updateLocation(
            values.locationName,
            JSON.stringify(values.path),
            values.id,
            values.description,
            values.isActive,
        )
    )
}

export default submit;