import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List,
} from 'graphql';

import SubCategoryType from './SubCategoryType';

const SubCategoryCommonType = new ObjectType({
  name: 'SubCategoryCommonType',
  fields: {
    result: {
      type: SubCategoryType
    },
    results: {
      type: new List(SubCategoryType)
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

export default SubCategoryCommonType;