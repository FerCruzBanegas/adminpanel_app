import {
  GraphQLInt as IntType,
} from 'graphql'
import { CancelReason } from '../../../models';
import CancelReasonWholeType from '../../../types/siteadmin/CancelReasonWholeType';
const getAllCancelReason = {

  type: CancelReasonWholeType,

  args: {
    id: { type: IntType }
  },

  async resolve({ request }, { id }) {
    try {
      if (request.user && request.user.admin) {
        const result = await CancelReason.findOne({
          where: {
            id
          },
          raw: true
        })

        return {
          result,
          status: result ? 200 : 400
        }
      }
    } catch (error) {
      return {
        errorMessage: 'Something went wrong ' + error,
        status: 400
      };
    }

  }
}

export default getAllCancelReason;

/*
query ($id: Int) {
  getCancelReason(id:$id) {
    result {
      id
      reason
      userType
      isActive
    }
  }
}
*/