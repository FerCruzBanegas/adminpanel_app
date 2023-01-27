import updateSiteSettings from '../../../actions/siteadmin/updateSiteSettings'

async function submit(values, dispatch) {
    await dispatch(updateSiteSettings(values));
}

export default submit;