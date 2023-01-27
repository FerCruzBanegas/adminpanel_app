import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql'
import { User, UserProfile } from '../../../models';
import UserManagementWholeType from '../../../types/siteadmin/User/UserManagementWholeData';

const getUser = {
    type: UserManagementWholeType,

    args: {
        id: { type: IntType },
        userType: { type: IntType },
    },

    async resolve({ request }, { id, userType }) {
        try {
            if (request.user && request.user.admin) {
                let result = await User.findOne({
                    where: {
                        userType
                    },
                    include: [
                        {
                            model: UserProfile,
                            as: 'profile',
                            required: true,
                            where: { profileId: id }
                        }
                    ]
                });
                return {
                    status: 200,
                    result
                }
            } else {
                return {
                    status: 500,
                    errorMessage: "Please login with your account and continue."
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

export default getUser;