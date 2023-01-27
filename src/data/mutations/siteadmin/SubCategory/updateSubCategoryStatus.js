import { SubCategory, Pricing } from '../../../models';
import SubCategoryCommonType from '../../../types/siteadmin/SubCategory/SubCategoryCommonType';
import {
	GraphQLInt as IntType,
	GraphQLString as StringType,
} from 'graphql';

const updateSubCategoryStatus = {
	type: SubCategoryCommonType,

	args: {
		id: { type: IntType },
		fieldName: { type: StringType },
		fieldValue: { type: StringType },
	},

	async resolve({ request }, { id, fieldName, fieldValue }) {
		try {
			if (request.user && request.user.admin) {

				let updateSubCategoryStatus;

				if (fieldName === 'status') {
					if (fieldValue === 'inactive') {
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
					updateSubCategoryStatus = await SubCategory.update({
						status: fieldValue
					},
						{
							where: {
								id
							}
						}
					)
				}
				return {
					status: updateSubCategoryStatus ? 200 : 400,
					errorMessage: updateSubCategoryStatus ? null : "Oops, something went wrong. Please try again."
				}

			} else {
				return {
					status: 500
				}
			}
		} catch (error) {
			return {
				errorMessage: 'Something went wrong ' + error,
				status: 400
			};
		}
	}
};

export default updateSubCategoryStatus;