import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

import { PromoCode } from '../../../models';

import PromoCodeCommonType from '../../../types/siteadmin/PromoCode/PromoCodeCommonType';

const getPromoCode = {

    type: PromoCodeCommonType,

    args: { id: { type: new NonNull(IntType) } },

    async resolve({ request }, { id }) {
        try {
            if (!request.user || !request.user.admin) {
                return {
                    status: 500,
                    errorMessage: "Oops! Please login with your account and try again."
                };
            }

            const result = await PromoCode.findOne({ where: { id } });

            return {
                status: 200,
                result
            };
        }
        catch (error) {
            return {
                status: 400,
                errorMessage: 'Oops! Something went wrong.' + error.message
            };
        }
    },
};

export default getPromoCode;

/*
query($id: Int!) {
    getPromoCode(id: $id) {
        result{
            id
            title
            description
            code
            type
            promoValue
            currency
            expiryDate
            isEnable
            createdAt
            updatedAt
        }
    }
}
*/
