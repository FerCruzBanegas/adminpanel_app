import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List,
} from 'graphql';

import CategoryType from './CategoryType';

const CategoryCommonType = new ObjectType({
  name: 'CategoryCommonType',
  fields: {
    result: {
      type: CategoryType
    },
    results: {
      type: new List(CategoryType)
    },
    status: {
      type: IntType
    },
    count: {
      type: IntType
    },
    errorMessage: {
      type: StringType
    }
  }
});

export default CategoryCommonType;