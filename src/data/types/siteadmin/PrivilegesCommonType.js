import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

import { PrivilegesLink } from '../../models';

const PrivilegesType = new ObjectType({
    name: 'PrivilegesType',
    fields: {
        id: {
            type: IntType
        },
        name: {
            type: StringType
        },
        permittedUrls: {
            type: new List(StringType),
            async resolve(data) {
                let privilegesURL = await PrivilegesLink.findAll({
                    attributes: ['url'],
                    where: {
                        privilegeId: data.id
                    },
                    raw: true
                });

                return await privilegesURL.map((item) => item.url);

            }
        }
    }
});

const PrivilegesCommonType = new ObjectType({
    name: 'PrivilegesCommonType',
    fields: {
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        result: {
            type: PrivilegesType
        },
        results: {
            type: new List(PrivilegesType)
        }
    }
});

export default PrivilegesCommonType;