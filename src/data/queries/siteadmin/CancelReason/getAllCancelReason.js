import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';
import sequelize from '../../../sequelize';
import { CancelReason } from '../../../models';
import CancelReasonWholeType from '../../../types/siteadmin/CancelReasonWholeType';

const getAllCancelReason = {

    type: CancelReasonWholeType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {
        try {

            if (request.user && request.user.admin) {

                let limit = 10;
                let offset = 0;
                let keywordFilter;

                if (currentPage) {
                    offset = (currentPage - 1) * limit;
                }

                keywordFilter = [{
                    id: {
                        or: [
                            { in: [sequelize.literal(`SELECT id FROM CancelReason where id like '%${searchList}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM CancelReason where reason like '%${searchList}%'`)] },
                        ]
                    }
                }]

                const results = await CancelReason.findAll({
                    limit,
                    offset,
                    where: {
                        and: keywordFilter
                    },
                    order: [['createdAt', 'DESC']]
                })

                const count = await CancelReason.count({
                    where: {
                        and: keywordFilter
                    }
                })

                return {
                    results,
                    count
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
query getAllCancelReason ($searchList: String $currentPage: Int) {
  getAllCancelReason(searchList: $searchList currentPage: $currentPage) {
    count
    results{
      id
    }
    status
  }
}
*/