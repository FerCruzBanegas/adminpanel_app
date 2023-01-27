import {
	GraphQLInt as IntType,
	GraphQLString as StringType,
} from 'graphql';
import { SubCategory, TempImages, Pricing } from '../../../models';
import SubCategoryCommonType from '../../../types/siteadmin/SubCategory/SubCategoryCommonType';

const addSubCategory = {
	type: SubCategoryCommonType,

	args: {
		id: { type: IntType },
		name: { type: StringType },
		description: { type: StringType },
		image: { type: StringType },
		categoryId: { type: IntType },
		status: { type: StringType },
	},

	async resolve({ request }, {
		id,
		name,
		description,
		image,
		categoryId,
		status
	}) {
		try {

			if (request.user && request.user.admin) {

				let updateSubCategory;

				if (id) {

					if (status === 'inactive') {
						const isFareUsed = await Pricing.findOne({
							attributes: ['id'],
							where: {
								isActive: true,
								subCategoryId: id
							}
						});

						if (isFareUsed) {
							return await {
								status: 400,
								errorMessage: "Sorry, unable to inactive. The chosen category is used on the manage fare. Please remove the fare and try again."
							}
						}
					}

					updateSubCategory = await SubCategory.update({
						name,
						description,
						image,
						categoryId,
						status
					},
						{
							where: {
								id
							}
						}
					)
				} else {

					updateSubCategory = await SubCategory.create({
						name,
						description,
						image,
						categoryId,
						status
					});
				}

				await TempImages.update({
					fileName: null
				},
					{
						where: {
							tableName: 'SubCategory',
							fieldName: 'image'
						}
					})


				return {
					status: updateSubCategory ? 200 : 400,
					errorMessage: updateSubCategory ? null : "Oops, something went wrong. Please try again."
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

export default addSubCategory;