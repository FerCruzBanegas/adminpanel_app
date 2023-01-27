import gql from 'graphql-tag';
import {
	HOMEPAGE_SETTINGS_UPLOAD_START,
	HOMEPAGE_SETTINGS_UPLOAD_ERROR,
	HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index'
import { setLoaderStart, setLoaderComplete } from '../loader/loader'
import { showToaster } from '../../helpers/toastrMessgaes/showToaster';

export default function updateHomepageSettingsCity(values) {

	return async (dispatch, getState, { client }) => {

		dispatch({
			type: HOMEPAGE_SETTINGS_UPLOAD_START
		})

		try {

			const mutation = gql`
            mutation updateHomePageCity (
                $citySectionTitle1: String
                $citySectionContent1: String
              ) {
                updateHomePageCity (
                  citySectionTitle1: $citySectionTitle1
                  citySectionContent1: $citySectionContent1
                ) {
                  status
									errorMessage
                }
              }
            `
			dispatch(setLoaderStart('CitySettingsForm'))
			const { data } = await client.mutate({
				mutation,
				variables: {
					citySectionTitle1: values && values.citySectionTitle1,
					citySectionContent1: values && values.citySectionContent1
				}
			})

			dispatch(setLoaderComplete('CitySettingsForm'))
			if (data && data.updateHomePageCity && data.updateHomePageCity.status == 200) {

				dispatch({
					type: HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
				})
				showToaster({ messageId: 'updateCitySuccess', toasterType: 'success' });
			} else {
				dispatch({
					type: HOMEPAGE_SETTINGS_UPLOAD_ERROR
				})
				showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateHomePageCity && data.updateHomePageCity.errorMessage }, toasterType: 'error' });
			}
		} catch (err) {
			dispatch({
				type: HOMEPAGE_SETTINGS_UPLOAD_ERROR
			})
			showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
		}

	}
}