import gql from 'graphql-tag';
import {
	SITE_SETTINGS_UPLOAD_START,
	SITE_SETTINGS_UPLOAD_ERROR,
	SITE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index';

import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import { showToaster } from '../../helpers/toastrMessgaes/showToaster';

export default function updateSiteSettings({
	siteName,
	siteTitle,
	metaDescription,
	facebookLink,
	twitterLink,
	instagramLink,
	logoHeight,
	logoWidth,
	metaKeyword,
	homeLogo,
	youtubeLink,
	favicon
}) {
	return async (dispatch, getState, { client }) => {
		try {
			// let requestContent = {};
			dispatch({ type: SITE_SETTINGS_UPLOAD_START });
			const mutation = gql`
            mutation updateSiteSettings(
                $siteName: String,
                $siteTitle: String,
                $metaDescription: String, 
                $facebookLink: String,
                $twitterLink: String,
                $instagramLink: String,
                $logoHeight: Int,
                $logoWidth: Int,
                $metaKeyword: String,
                $homeLogo: String,
                $youtubeLink: String,
				$favicon: String,
                ) {
                    updateSiteSettings(
                    siteName: $siteName
                    siteTitle: $siteTitle
                    metaDescription: $metaDescription
                    facebookLink: $facebookLink
                    twitterLink: $twitterLink
                    instagramLink: $instagramLink
                    logoHeight: $logoHeight
                    logoWidth: $logoWidth
                    metaKeyword: $metaKeyword
                    homeLogo: $homeLogo
                    youtubeLink: $youtubeLink
					favicon: $favicon
                    ){
                    status
					errorMessage
                  }
                }
            `
			dispatch(setLoaderStart('SiteSettings'));

			const { data } = await client.mutate({
				mutation,
				variables: {
					siteName,
					siteTitle,
					metaDescription,
					facebookLink,
					twitterLink,
					instagramLink,
					logoHeight,
					logoWidth,
					metaKeyword,
					homeLogo,
					youtubeLink,
					favicon
				}
			})

			dispatch(setLoaderComplete('SiteSettings'));

			if (data && data.updateSiteSettings && data.updateSiteSettings.status == 200) {
				dispatch({ type: SITE_SETTINGS_UPLOAD_SUCCESS });
				showToaster({ messageId: 'siteSettingsSuccess', toasterType: 'success' });
			}
			else {
				let errorMessage = data && data.updateSiteSettings && data.updateSiteSettings.errorMessage;
				dispatch({ type: SITE_SETTINGS_UPLOAD_ERROR });
				let requestContent = {
					content: errorMessage
				};
				showToaster({ messageId: 'errorMessage', requestContent, toasterType: 'error' });
			}
		}
		catch (err) {
			dispatch({ type: SITE_SETTINGS_UPLOAD_ERROR });
			let requestContent = {
				content: err
			};
			showToaster({ messageId: 'catchMessage', requestContent, toasterType: 'error' });
		}
	}
}
