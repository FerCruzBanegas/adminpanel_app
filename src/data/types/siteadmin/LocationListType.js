import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql'

import LocationType from './LocationType';

const LocationListType = new ObjectType({
    name: 'LocationListType',
    fields: {
        results: {
            type: new List(LocationType)
        },
        result: {
            type: LocationType
        },
        count: {
            type: IntType
        },
        errorMessage: { type: StringType },
        status: { type: IntType },
    }
});

export default LocationListType;