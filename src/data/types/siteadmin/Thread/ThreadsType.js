import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
// Models
import { ThreadItems } from '../../../models';


const ThreadsType = new ObjectType({
    name: 'Threads',
    fields: {
        id: {
            type: IntType
        },
        bookingId: {
            type: IntType
        },
        userId: {
            type: StringType
        },
        partnerId: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        threadItemsCount: {
            type: IntType,
            resolve(threads) {
                return ThreadItems.count({
                    where: {
                        threadId: threads.id,
                    },
                    order: [['createdAt', 'DESC']]
                });
            }
        },
    }
});
export default ThreadsType;