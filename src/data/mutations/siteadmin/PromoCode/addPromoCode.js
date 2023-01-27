import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType
} from 'graphql';

import { PromoCode } from '../../../models';

import PromoCodeCommonType from '../../../types/siteadmin/PromoCode/PromoCodeCommonType';

import { sendNotifications } from '../../../../core/pushNotifications/sendNotifications';

const addPromoCode = {

    type: PromoCodeCommonType,

    args: {
        title: { type: new NonNull(StringType) },
        description: { type: new NonNull(StringType) },
        code: { type: new NonNull(StringType) },
        type: { type: IntType }, // // (1 => percentage, 2 => fixed)
        promoValue: { type: new NonNull(FloatType) },
        currency: { type: StringType },
        expiryDate: { type: StringType },
        imageName: { type: StringType }
    },

    async resolve({ request }, {
        title,
        description,
        code,
        type,
        promoValue,
        currency,
        expiryDate,
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
                    code
                },
                raw: true
            });

            if (isCodeExist && isCodeExist.code === code) {
                return await {
                    status: 400,
                    errorMessage: 'Oops! It looks like already this promo code is used. Please try again with different promo code name.'
                };
            }

            const createPromoCode = await PromoCode.create({
                title,
                description,
                code,
                type,
                promoValue,
                currency,
                expiryDate,
                imageName
            });

            if (!createPromoCode) {
                return await {
                    status: 400,
                    errorMessage: 'Oops! Something went wrong! Unable to create a new promo code. Please try again.'
                };
            }

            sendNotifications({ title, message: description, screen: "PROMO_PAGE" }, null, true, null)
            return await { status: 200 };
        }
        catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong.' + error.message

            }
        }
    },
};

export default addPromoCode;

/*
mutation(
    $title: String!,
    $description: String!,
    $code: String!,
    $type: Int!,
    $promoValue: Float!,
    $currency: String,
    $expiryDate: String
) {
    addPromoCode(
        title: $title,
        description: $description,
        code: $code,
        type: $type,
        promoValue: $promoValue,
        currency: $currency,
        expiryDate: $expiryDate
    ) {
        status
        errorMessage
    }
}
*/