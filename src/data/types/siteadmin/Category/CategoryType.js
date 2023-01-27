import {
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

// import getCommonType from '../../../helpers/getCommonType';

const CategoryType = new ObjectType({
  name: 'Category',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
		description: { type: StringType },
		logoImage: { type: StringType },
		bannerImage: { type: StringType },
		isPopular: { type: BooleanType },
		isJobPhotoRequired: { type: BooleanType },
    travellingPrice: { type: FloatType },
		userServiceFeeValue: { type: FloatType },
		partnerServiceFeeValue: { type: FloatType },
		pricingType: { type: StringType },
		status: { type: StringType },
		currency: { type: StringType },
    errorMessage: { type: StringType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType },
    fieldName: { type: StringType },
    fileName: { type: StringType },
    categorylogoImageName: {
      type: StringType,
      async resolve(account) {
        let name = account.logoImage ? 'images/upload/' + account.logoImage : '';
        return name;
      }
    },
    categoryBannerImageName: {
      type: StringType,
      async resolve(account) {
        let name = account.bannerImage ? 'images/upload/' + account.bannerImage : '';
        return name;
      }
    },
  },
});

// export const CategoryCommonType = getCommonType('CategoryCommonType', CategoryType);

export default CategoryType;
