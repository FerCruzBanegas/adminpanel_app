import {
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType
} from 'graphql';

import { PromoCode } from '../../../models';

import PromoCodeCommonType from '../../../types/siteadmin/PromoCode/PromoCodeCommonType';

const deletePromoCode = {
    type: PromoCodeCommonType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { id }) {
        if (!request.user || !request.user.admin) {
            return {
                status: 500,
                errorMessage: "Oops! Please login and continue."
            };
        }

        const deletedPromoCode = await PromoCode.destroy({ where: { id } });

        if (!deletedPromoCode) {
            return await {
                status: 400,
                errorMessage: "Oops! something went wrong. Unable to delete the promo code."
            };
        }

        return { status: 200 };
    }
};

export default deletePromoCode;

/*

mutation($id: Int!) {
    deletePromoCode(
        id: $id
    ) {
        status
        errorMessage
    }
}

*/