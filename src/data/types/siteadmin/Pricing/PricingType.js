import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import { Category, Location, SubCategory } from '../../../models';

// External Types
import CategoryType from '../Category/CategoryType';
import SubCategoryType from '../SubCategory/SubCategoryType';
import LocationType from '../LocationType';


const PricingType = new ObjectType({
  name: 'PricingType',
  fields: {
    id: { type: IntType },
    locationId: { type: IntType },
    categoryId: { type: IntType },
    subCategoryId: { type: IntType },
    isActive: { type: BooleanType },
    currency: { type: StringType },
    isPriceEditable: { type: BooleanType },
    basePrice: { type: FloatType },
    multiplierValue: { type: FloatType },
    category: {
      type: CategoryType,
      async resolve(price) {
        return await Category.findOne({
          attributes: ['id', 'name', 'logoImage', 'bannerImage', 'status'],
          where: {
            id: price && price.categoryId,
            status: 'active'
          }
        });
      }
    },
    subCategory: {
      type: SubCategoryType,
      async resolve(price) {
        return await SubCategory.findOne({
          attributes: ['id', 'name', 'image', 'status'],
          where: {
            categoryId: price && price.categoryId,
            id: price && price.subCategoryId,
            status: 'active'
          }
        });
      }
    },
    location: {
      type: LocationType,
      async resolve(price) {
        return await Location.findOne({
          attributes: ['id', 'locationName', 'coordinates', 'description', 'isActive'],
          where: {
            id: price && price.locationId,
            isActive: true
          }
        });
      }
    },
    status: { type: IntType },
    errorMessage: { type: StringType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType }
  },
});

export default PricingType;
