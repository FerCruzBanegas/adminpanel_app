import {
	GraphQLInt as IntType,
	GraphQLString as StringType,
	GraphQLFloat as FloatType,
	GraphQLBoolean as BooleanType
} from 'graphql';
import { Category, TempImages, Pricing } from '../../../models';
import CategoryCommonType from '../../../types/siteadmin/Category/CategoryCommonType';

const addCategory = {
	type: CategoryCommonType,

	args: {
		id: { type: IntType },
		name: { type: StringType },
		description: { type: StringType },
		logoImage: { type: StringType },
		bannerImage: { type: StringType },
		isPopular: { type: BooleanType },
		isJobPhotoRequired: { type: BooleanType },
		travellingPrice:  { type: FloatType },
		userServiceFeeValue: { type: FloatType },
		partnerServiceFeeValue: { type: FloatType },
		pricingType: { type: StringType },
		status: { type: StringType },
		currency: { type: StringType },
	},

	async resolve({ request }, {
		id,
		name,
		description,
		logoImage,
		bannerImage,
		isPopular,
		isJobPhotoRequired,
		travellingPrice,
		userServiceFeeValue,
		partnerServiceFeeValue,
		pricingType,
		status,
		currency
	}) {
		try {

			if (request.user && request.user.admin) {

				let updateCategory;

				if (id) {

					if (status === 'inactive') {
						const isFareUsed = await Pricing.findOne({
							attributes: ['id'],
							where: {
								isActive: true,
								categoryId: id
							}
						});

						if (isFareUsed) {
							return await {
								status: 400,
								errorMessage: "Sorry, unable to inactive. The chosen category is used on the manage fare. Please remove the fare and try again."
							}
						}
					}

					updateCategory = await Category.update({
						name,
						description,
						logoImage,
						bannerImage,
						isPopular,
						isJobPhotoRequired,
						travellingPrice,
						userServiceFeeValue,
						partnerServiceFeeValue,
						pricingType,
						status,
						currency
					},
						{
							where: {
								id
							}
						}
					)
				} else {

					updateCategory = await Category.create({
						name,
						description,
						logoImage,
						bannerImage,
						isPopular,
						isJobPhotoRequired,
						travellingPrice,
						userServiceFeeValue,
						partnerServiceFeeValue,
						pricingType,
						status,
						currency
					});
				}

				const fieldNameArray = ['logoImage', 'bannerImage'];

				fieldNameArray.forEach(async (fieldName) => {
					await TempImages.update({
						fileName: null
					},
						{
							where: {
								tableName: 'Category',
								fieldName
							}
						})
				});

				return {
					status: updateCategory ? 200 : 400,
					errorMessage: updateCategory ? null : "Oops, something went wrong. Please try again."
				}

			} else {
				return {
					status: 500,
					errorMessage: 'Please login with your account and continue.'
				}
			};
		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}
	}
}

export default addCategory;