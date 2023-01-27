import {
    GraphQLInt as IntType
} from 'graphql';
import { CancelReason } from '../../../models';
import CancelReasonType from '../../../types/siteadmin/CancelReasonType';

const removeCancelReason = {

    type: CancelReasonType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {

        try {
            const removeCancelReason = await CancelReason.destroy({
                where: {
                    id
                }
            });

            return {
                status: removeCancelReason ? 200 : 400
            };

        } catch (error) {
            return {
                errorMessage: 'Something went wrong ' + error,
                status: 400
            };
        }

    },
};

export default removeCancelReason;

/*

mutation($id: Int) {
    removeCancelReason(id: $id) {
        status
    }
}

*/
