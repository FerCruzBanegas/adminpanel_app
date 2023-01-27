import { Category, Pricing } from '../../../models';
import CategoryCommonType from '../../../types/siteadmin/Category/CategoryCommonType';
import {
	GraphQLInt as IntType,
	GraphQLString as StringType,
} from 'graphql';

const updateCategoryStatus = {
	type: CategoryCommonType,

	args: {
		id: { type: IntType },
		fieldName: { type: StringType },
		fieldValue: { type: StringType },
	},

	async resolve({ request }, { id, fieldName, fieldValue }) {
		try {
			if (request.user && request.user.admin) {

				let updateCategoryStatus;

				if (fieldName === 'status') {
					if (fieldValue === 'inactive') {
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
					updateCategoryStatus = await Category.update({
						status: fieldValue
					},
						{
							where: {
								id
							}
						}
					)
				} else {
					updateCategoryStatus = await Category.update({
						isPopular: String(fieldValue) === 'true' ? 1 : 0
					},
						{
							where: {
								id
							}
						}
					)
				}

				return {
					status: updateCategoryStatus ? 200 : 400,
					errorMessage: updateCategoryStatus ? null : "Oops, something went wrong. Please try again."
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

export default updateCategoryStatus;