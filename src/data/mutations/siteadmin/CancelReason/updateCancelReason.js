import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { CancelReason } from '../../../models';
import CancelReasonType from '../../../types/siteadmin/CancelReasonType';

const updateCancelReason = {

    type: CancelReasonType,

    args: {
        id: { type: IntType },
        userType: { type: IntType },
        reason: { type: StringType },
        isActive: { type: BooleanType }
    },

    async resolve({ request }, { id, userType, reason, isActive }) {
        try {

            let updateCancelReason;
            if (id) {
                updateCancelReason = await CancelReason.update({
                    userType,
                    reason,
                    isActive
                },
                    {
                        where: {
                            id
                        }
                    });
            } else {
                updateCancelReason = await CancelReason.create({
                    userType,
                    reason,
                    isActive
                });
            }

            if (updateCancelReason) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 400
                }
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong.' + error.message
            }
        }

    },
};

export default updateCancelReason;

/*

mutation(
    $id: Int,
    $userType: Int,
    $reason: String,
    isActive: Boolean
    ) {
    updateCancelReason(
        id: $id,
        userType: $userType,
        reason: $reason,
        isActive: $isActive
        ) {
        status
        errorMessage
    }
}

*/
