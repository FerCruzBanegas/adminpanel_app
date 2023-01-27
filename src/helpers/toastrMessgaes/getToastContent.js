/*

Supported languages

 // English - en
	// Spanish - es
	// French - fr
	// Russian - ru
	// Japanese - ja	
	// Indonesian - id
	// Croatian - hr
	// Chinese - zh
	// Swedish - sv
*/

export async function getToastContent({ messageId, requestContent, lang }) {
	let title = '', message = '', requestLang;
	let supportedLang = ['en', 'es', 'fr', 'ru', 'ja', 'id', 'hr', 'zh', 'sv', 'ar'];
	requestLang = lang ? lang : 'en';
	requestLang = (supportedLang.indexOf(requestLang) >= 0) ? requestLang : 'en';

	if (messageId === 'errorMessage') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = requestContent['content'] || "Oops! something went wrong! Please try again.";
		}
	}
	if (messageId === 'catchMessage') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = "Oops! Something went wrong! " + requestContent['content'];
		}
	}

	// ```````````````````````````PromoCode```````````````````````````
	if (messageId === 'addPromoCodeSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Promo Code has been ${requestContent['id'] ? 'updated' : 'added'} successfully.`;
		}
	}

	if (messageId === 'deletePromoCodeSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Promo Code has been deleted successfully.`;
		}
	}

	// ``````````````````````````SiteSettings``````````````````````````
	if (messageId === 'siteSettingsSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The site settings have been updated successfully!`;
		}
	}

	// ````````````````````````````ContentPage````````````````````````````

	// delete
	if (messageId === 'deleteContentSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Changes are updated!`;
		}
	}

	// update
	if (messageId === 'updateStatusSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Changes are updated!`;
		}
	}

	// ````````````````````````````EditPartner````````````````````````````

	if (messageId === 'editPartnerSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Service Provider has been updated!`;
		}
	}

	// ````````````````````````````HomePageCategory````````````````````````````

	if (messageId === 'updateHomeSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Changes are updated!`;
		}
	}

	// ````````````````````````````HomePageCity````````````````````````````

	if (messageId === 'updateCitySuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Homepage settings changes have been successfully applied!`;
		}
	}

	// ````````````````````````````HomePageFooter````````````````````````````

	if (messageId === 'updateFooterSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Homepage settings changes have been successfully applied!`;
		}
	}

	// ``````````````````````````MobileSettings``````````````````````````
	if (messageId === 'mobileSettingsSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The mobile app settings have been updated successfully!`;
		}
	}

	// ``````````````````````````UpdateProfileImage``````````````````````````
	if (messageId === 'updateProfileSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Profile image has been uploaded!`;
		}
	}

	// `````````````````````````AddAdminRole``````````````````````````
	if (messageId === 'adminRoleSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Admin Role has been ${requestContent['id'] ? 'updated' : 'added'} successfully.`;
		}
	}

	// `````````````````````````DeleteAdminRoleImage``````````````````````````
	if (messageId === 'adminDeleteSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Admin Role has been deleted successfully!`;
		}
	}

	// `````````````````````````AddAdminUser`````````````````````````
	if (messageId === 'adminUserSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Admin User has been ${requestContent['id'] ? 'updated' : 'added'} successfully.`;
		}
	}

	// `````````````````````````DeleteAdminRoleImage``````````````````````````
	if (messageId === 'adminUserDeleteSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Admin User has been deleted successfully!`;
		}
	}

	// `````````````````````````CancelReason`````````````````````````
	if (messageId === 'addCancelSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Cancel Reason has been ${requestContent['id'] ? 'updated' : 'added'} successfully.`;
		}
	}

	if (messageId === 'removeCancelSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Cancel Reason has been deleted successfully.`;
		}
	}

	// `````````````````````````Category`````````````````````````
	if (messageId === 'addCatSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The category has been ${requestContent['id'] ? 'updated' : 'added'} successfully.`;
		}
	}

	if (messageId === 'removeCatSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The category has been deleted successfully.`;
		}
	}

	// `````````````````````````Currency`````````````````````````
	if (messageId === 'failedCurrency') {
		if (requestLang == 'en') {
			title = `Failed!`;
			message = `Sorry, you can't disable the base currency. Try to set a different base currency and disable this one.`;
		}
	}

	if (messageId === 'successCurrency') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Currency status has changed.`;
		}
	}

	if (messageId === 'baseCurrency') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Base Currency is set successfully.`;
		}
	}

	if (messageId === 'allowedCurrency') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Allowed Payment Currency Success.`;
		}
	}

	if (messageId === 'addCurrency') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Currency has been added successfully.`;
		}
	}

	if (messageId === 'deleteCurrency') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Currency has been deleted successfully.`;
		}
	}

	if (messageId === 'failedDeleteCurrency') {
		if (requestLang == 'en') {
			title = `Failed!`;
			message = `Sorry, you can't delete the base currency. Try to set a different base currency and delete this one.`;
		}
	}


	// `````````````````````````Upload`````````````````````````
	if (messageId === 'userExp') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `User experience has been uploaded!`;
		}
	}

	if (messageId === 'removeDoc') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = ` ${requestContent['type']} document has been removed!`;
		}
	}

	if (messageId === 'userIdentity') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `User Identity has been uploaded!`;
		}
	}


	// `````````````````````````Location`````````````````````````
	if (messageId === 'selectLoc') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `Please select location!`;
		}
	}

	if (messageId === 'addLoc') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The Location has been added successfully!`;
		}
	}

	if (messageId === 'updateLoc') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The Location has been updated successfully!`;
		}
	}

	if (messageId === 'delLoc') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The Location has been deleted successfully!`;
		}
	}

	// `````````````````````````Payout`````````````````````````
	if (messageId === 'updateCashPayout') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Updated status for Cash Payout!`;
		}
	}

	if (messageId === 'updatePayout') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Updated status!`;
		}
	}

	// `````````````````````````Pricing`````````````````````````
	if (messageId === 'addFareSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The fare has been ${requestContent['id'] ? 'updated' : 'added'} successfully.`;
		}
	}

	if (messageId === 'delFareSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The fare has been deleted successfully.`;
		}
	}

	if (messageId === 'statusFareSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The status has been updated successfully.`;
		}
	}

	// `````````````````````````SMS`````````````````````````

	if (messageId === 'updateSms') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Sms method has been updated successfully.`;
		}
	}

	// `````````````````````````SubCategory`````````````````````````
	if (messageId === 'addSubCatSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The sub category has been ${requestContent['id'] ? 'updated' : 'added'} successfully.`;
		}
	}

	if (messageId === 'removeSubCatSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The sub category has been deleted successfully.`;
		}
	}

	if (messageId === 'statusSubCatSuccess') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `The sub category status has been updated successfully.`;
		}
	}


	// `````````````````````````TepImages`````````````````````````
	if (messageId === 'tempImage') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `${requestContent['fileName'] ? 'Your Image has been uploaded.' : 'Your Image has been removed.'}`;
		}
	}


	// `````````````````````````User`````````````````````````
	if (messageId === 'delUser') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `${requestContent['userType'] === 2 ? 'The provider' : 'The user'} has been deleted successfully.`;
		}
	}

	if (messageId === 'updateUser') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `User has been updated!`;
		}
	}

	if (messageId === 'passwordChange') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Admin details changed successfully!`;
		}
	}


	// `````````````````````````DropZone`````````````````````````

	if (messageId === 'limitError') {
		if (requestLang == 'en') {
			title = `Maximum upload size Exceeded!`;
			message = `Try with smallest size image.`;
		}
	}

	if (messageId === 'filetypeError') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.`;
		}
	}

	// `````````````````````````Submit file error`````````````````````````

	if (messageId === 'categoryLogo') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `Category Logo Image is required.`;
		}
	}

	if (messageId === 'categoryBanner') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `Category Banner Image is required.`;
		}
	}

	if (messageId === 'subCategoryImage') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `SubCategory Image is required.`;
		}
	}

	if (messageId === 'noCategory') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `No categories found.`;
		}
	}

	if (messageId === 'pleaseUpload') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `Please upload image.`;
		}
	}

	if (messageId === 'addCmsContent') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `Please Add  Content.`;
		}
	}

	if (messageId === 'timer') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `Please add timer tone.`;
		}
	}

	if (messageId === 'addDescription') {
		if (requestLang == 'en') {
			title = `Error!`;
			message = `Please Add  Description.`;
		}
	}

	if (messageId === 'pushNotificationSent') {
		if (requestLang == 'en') {
			title = `Success!`;
			message = `Push notification has been sent.`;
		}
	}

	return {
		title,
		message
	};
}