import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType
} from 'graphql';
import { workTimeConversion } from '../../../helpers/workTimeConversion';


const WorkLogHistoryType = new ObjectType({
    name: 'WorkLogHistoryType',
    fields: {
        id: {
            type: IntType,
        },
        userId: {
            type: StringType,
        },
        bookingId: {
            type: IntType,
        },
        orderId: {
            type: IntType,
        },
        orderItemId: {
            type: IntType,
        },
        status: {
            type: StringType
        },
        startedAt: {
            type: StringType
        },
        closedAt: {
            type: StringType
        },
        totalDuration: {
            type: FloatType,
        },
        totalWork: {
            type: StringType,
            async resolve(data) {
                let value = null;
                if (data.totalDuration > 0) {
                    value = workTimeConversion(data.totalDuration);
                }
                return (value)
            }
        },
        createdAt: {
            type: StringType
        }
    }
});

export default WorkLogHistoryType;