import {
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLNonNull as NonNull,
	GraphQLFloat as FloatType,
	GraphQLBoolean as BooleanType
} from 'graphql';
import moment from 'moment';

import { PromoCode } from '../../../models';

import PromoCodeCommonType from '../../../types/siteadmin/PromoCode/PromoCodeCommonType';

import { sendNotifications } from '../../../../core/pushNotifications/sendNotifications';

const updatePromoCode = {

	type: PromoCodeCommonType,

	args: {
		id: { type: new NonNull(IntType) },
		title: { type: new NonNull(StringType) },
		description: { type: new NonNull(StringType) },
		code: { type: new NonNull(StringType) },
		type: { type: IntType }, // // (1 => percentage, 2 => fixed)
		promoValue: { type: new NonNull(FloatType) },
		currency: { type: StringType },
		expiryDate: { type: StringType },
		isEnable: { type: BooleanType },
		imageName: { type: StringType }
	},

	async resolve({ request }, {
		id,
		title,
		description,
		code,
		type,
		promoValue,
		currency,
		expiryDate,
		isEnable,
		imageName
	}) {
		try {
			if (!request.user || !request.user.admin) {
				return {
					status: 500,
					errorMessage: "Oops! Please login and continue."
				};
			}

			const isCodeExist = await PromoCode.findOne({
				attributes: ['id', 'code'],
				where: {
					code,
					id: { ne: id }
				},
				raw: true
			});

			if (isCodeExist && isCodeExist.code === code) {
				return await {
					status: 400,
					errorMessage: 'Oops! It looks like already this promo code is used. Please try again with different promo code name.'
				};
			}

			let oldPromoData = await PromoCode.findOne({
				attributes: [`id`, `title`, `description`, `code`, `type`, `promoValue`, `currency`, `expiryDate`, `isEnable`],
				where: { id },
				raw: true
			});

			oldPromoData['expiryDate'] = oldPromoData.expiryDate && moment(oldPromoData.expiryDate).format('YYYY-MM-DD')

			let newPromoData = {
				id,
				title,
				description,
				code,
				type,
				promoValue,
				currency,
				expiryDate: moment(expiryDate).format('YYYY-MM-DD'),
				isEnable
			};

			const result = await PromoCode.update(
				{
					title,
					description,
					code,
					type,
					promoValue,
					currency,
					expiryDate,
					isEnable,
					imageName
				},
				{ where: { id } }
			);

			if (!result || result.includes(0)) {
				return {
					status: 400,
					errorMessage: 'Oops! Something went wrong! Unable to update the promo code. Please try again.'
				};
			}

			let pushNotificationContent = {
				title,
				message: description,
				screen: "PROMO_PAGE"
			};

			if (JSON.stringify(oldPromoData) != JSON.stringify(newPromoData)) sendNotifications(pushNotificationContent, null, true, null);
			return { status: 200 };
		}
		catch (error) {
			return {
				status: 400,
				errorMessage: 'Something went wrong.' + error.message
			};
		}
	}
};

export default updatePromoCode;

/*

mutation(
		$id: Int!,
		$title: String!,
		$description: String!,
		$code: String!,
		$type: Int!,
		$promoValue: Float!,
		$currency: String,
		$expiryDate: String,
		$isEnable: Boolean
) {
		updatePromoCode(
				id: $id,
				title: $title,
				description: $description,
				code: $code,
				type: $type,
				promoValue: $promoValue,
				currency: $currency,
				expiryDate: $expiryDate,
				isEnable: $isEnable
		) {
				status
				errorMessage
		}
}

*/
