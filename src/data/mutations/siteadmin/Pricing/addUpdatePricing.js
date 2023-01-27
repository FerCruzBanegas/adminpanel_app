import { Pricing } from '../../../models'
import PricingType from '../../../types/siteadmin/Pricing/PricingType';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull
} from 'graphql';

const addUpdatePricing = {
    type: PricingType,

    args: {
        id: { type: IntType },
        locationId: { type: new NonNull(IntType) },
        categoryId: { type: new NonNull(IntType) },
        subCategoryId: { type: new NonNull(IntType) },
        isActive: { type: BooleanType },
        currency: { type: new NonNull(StringType) },
        isPriceEditable: { type: BooleanType },
        basePrice: { type: FloatType },
        multiplierValue: { type: FloatType },
    },

    async resolve({ request }, {
        id,
        locationId,
        categoryId,
        subCategoryId,
        isActive,
        currency,
        isPriceEditable,
        basePrice,
        multiplierValue,
    }) {
        let status = 200, errorMessage, fareId;

        try {
            if (request.user && request.user.admin) {
                if (id) { // Update a existing fare
                    const findAlreadyExistWithId = await Pricing.findOne({
                        attributes: ['id'],
                        where: {
                            subCategoryId,
                            categoryId,
                            locationId,
                            id: {
                                ne: id
                            }
                        }
                    });

                    if (findAlreadyExistWithId) {
                        status = 400;
                        errorMessage = 'Sorry, it looks like the fare is already exist for the chosen location and category.';
                    } else {
                        const updatePricing = await Pricing.update({
                            locationId,
                            categoryId,
                            subCategoryId,
                            isActive,
                            currency,
                            isPriceEditable,
                            basePrice,
                            multiplierValue,
                        }, {
                            where: {
                                id
                            }
                        });

                        if (updatePricing) {
                            fareId = updatePricing.dataValues && updatePricing.dataValues.id;
                        } else {
                            status = 400;
                            errorMessage = 'Sorry, unable to create a fare for the chosen location and category.'
                        }
                    }
                } else { // Add a new fare
                    const findAlreadyExist = await Pricing.findOne({
                        attributes: ['id'],
                        where: {
                            categoryId,
                            subCategoryId,
                            locationId
                        }
                    });

                    if (findAlreadyExist) {
                        status = 400;
                        errorMessage = 'Sorry, it looks like the fare is already exist for the chosen location and category.';
                    } else {
                        const addPricing = await Pricing.create({
                            locationId,
                            categoryId,
                            subCategoryId,
                            isActive,
                            currency,
                            isPriceEditable,
                            basePrice,
                            multiplierValue,
                        });

                        if (addPricing) {
                            fareId = addPricing.dataValues && addPricing.dataValues.id;
                        } else {
                            status = 400;
                            errorMessage = 'Sorry, unable to create a fare for the chosen location and category.'
                        }
                    }
                }

                return await {
                    status,
                    errorMessage
                };
            } else {
                return {
                    status: 500,
                    errorMessage: 'Please login with your account and continue.'
                };
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Sorry something went wrong, ' + error
            };
        }
    }
}

export default addUpdatePricing;