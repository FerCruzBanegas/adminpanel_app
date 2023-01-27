import {
	GraphQLObjectType as ObjectType,
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLFloat as FloatType,
	GraphQLList as List
} from 'graphql';

import { SubCategory, WorkLogHistory, OrderSubCategory } from '../../models';
import SubCategoryType from './SubCategory/SubCategoryType';
import WorkLogHistoryType from './WorkLogHistoryType';

import getCommonType from '../../../helpers/getCommonType';
import { workTimeConversion } from '../../../helpers/workTimeConversion';

const OrderItemsType = new ObjectType({
	name: 'OrderItemsType',
	fields: {
		id: {
			type: IntType
		},
		categoryId: {
			type: IntType
		},
		subCategoryId: {
			type: IntType
		},
		orderId: {
			type: IntType
		},
		baseFare: {
			type: FloatType
		},
		minimumHours: {
			type: IntType
		},
		currency: {
			type: StringType
		},
		totalQuantity: {
			type: IntType
		},
		workedDuration: {
			type: FloatType
		},
		pausedDuration: {
			type: FloatType
		},
		startedAt: {
			type: StringType
		},
		completedAt: {
			type: StringType
		},
		subCategoryDetails: {
			type: SubCategoryType,
			async resolve(data) {
				let result = [];

				result = await OrderSubCategory.findOne({
					where: {
						subCategoryId: data.subCategoryId,
						orderId: data.orderId
					},
				});

				if (!result) {
					result = await SubCategory.findOne({
						where: { id: data.subCategoryId },
					});
				}
				return result;
			},
		},
		workLogHistory: {
			type: new List(WorkLogHistoryType),
			async resolve(data) {
				return await WorkLogHistory.findAll({
					where: {
						orderItemId: data.id,
						orderId: data.orderId
					},
					order: [['createdAt', 'ASC']]
				});
			},
		},
		workDuration: {
			type: StringType,
			async resolve(data) {
				let result = await WorkLogHistory.sum('totalDuration',
					{
						where: {
							orderItemId: data.id,
							orderId: data.orderId
						},
						order: [['createdAt', 'ASC']]
					});
				let value = null;
				if (result > 0) {
					value = workTimeConversion(result);
				}
				return (value)
			},
		}
	}
});

export const OrderItemsCommonType = getCommonType('OrderItemsCommonType', OrderItemsType);

export default OrderItemsType;