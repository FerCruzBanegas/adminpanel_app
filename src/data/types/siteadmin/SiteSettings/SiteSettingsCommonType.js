import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

import SiteSettingsType from './SiteSettingsType';

const SiteSettingsCommonType = new ObjectType({
    name: 'SiteSettingsCommonType',
    fields: {
        results: {
            type: new List(SiteSettingsType)
        },

        status: {
            type: IntType
        },

        errorMessage: {
            type: StringType
        }
    }
});

export default SiteSettingsCommonType;
  