import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLList as List
} from 'graphql';

import CancelReasonType from './CancelReasonType';

const CancelReasonListType = new ObjectType({
  name: 'CancelReasonList',
  fields: {
    result: {
      type: CancelReasonType
    },
    results: {
      type: new List(CancelReasonType)
    },
    count: { type: StringType },
    status: { type: IntType },
    errorMessage: {
      type: StringType
    },
  },
});

export default CancelReasonListType;
