import gql from 'graphql-tag';
    import {
    HOMEPAGE_SETTINGS_UPLOAD_START,
    HOMEPAGE_SETTINGS_UPLOAD_ERROR,
    HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index'
import { setLoaderStart,  setLoaderComplete } from '../loader/loader'
import { showToaster } from '../../helpers/toastrMessgaes/showToaster';

export default function updateHomepageSettingsSafety(values) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: HOMEPAGE_SETTINGS_UPLOAD_START
        })

        try {
            
            const mutation = gql`
            mutation updateHomePageSafety (
                $safetyGridImage1: String
                $safetyGridImage2: String
                $safetyGridImage3: String
                $safetyGridTitle1: String
                $safetyGridContent1: String
                $safetyGridLink1: String
                $safetyGridLink2: String
                $safetyGridImage4: String
              ) {
                updateHomePageSafety (
                  safetyGridImage1: $safetyGridImage1
                  safetyGridImage2: $safetyGridImage2
                  safetyGridImage3: $safetyGridImage3
                  safetyGridTitle1: $safetyGridTitle1
                  safetyGridContent1: $safetyGridContent1
                  safetyGridLink1: $safetyGridLink1
                  safetyGridLink2: $safetyGridLink2
                  safetyGridImage4: $safetyGridImage4
                ) {
                  status
                  errorMessage
                }
              }
            `
            dispatch(setLoaderStart('SafetySettingsForm'))
            const { data } = await client.mutate({
                mutation,
                variables: {
                    safetyGridImage1: values && values.safetyGridImage1,
                    safetyGridImage2: values && values.safetyGridImage2,
                    safetyGridImage3: values && values.safetyGridImage3,
                    safetyGridTitle1: values && values.safetyGridTitle1,
                    safetyGridContent1: values && values.safetyGridContent1,
                    safetyGridLink1: values && values.safetyGridLink1,
                    safetyGridLink2: values && values.safetyGridLink2,
                    safetyGridImage4: values && values.safetyGridImage4
                }
            })

            dispatch(setLoaderComplete('SafetySettingsForm'))
            if(data && data.updateHomePageSafety && data.updateHomePageSafety.status == 200) {
                
                dispatch({
                    type: HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
                })
				showToaster({ messageId: 'updateCitySuccess', toasterType: 'success' });
            } else {
                dispatch({
                    type: HOMEPAGE_SETTINGS_UPLOAD_ERROR
                })
				showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateHomePageSafety && data.updateHomePageSafety.errorMessage }, toasterType: 'error' });
            }
        } catch(err) {
            dispatch({
                type: HOMEPAGE_SETTINGS_UPLOAD_ERROR
            })
			showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
        }
        
    }
}