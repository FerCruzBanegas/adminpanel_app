import {
    GraphQLString as StringType,
} from 'graphql';
import { UserDocument } from '../../../models/index';
import UserProfileType from '../../../types/siteadmin/User/UserProfileType';

const removeExperienceDocument = {

    type: UserProfileType,

    args: {
        imageName: { type: StringType },
        userId: { type: StringType },
    },

    async resolve({ request }, { imageName, userId }) {

        try {

            if (!request.user || !request.user.admin) {
                return {
                    status: 500,
                    errorMessage: "Oops! Please login with your account and try again."
                };
            }

            const removeDocument = await UserDocument.destroy({
                where: {
                    imageName,
                    userId
                }
            });

            const experienceDoc = await UserDocument.findAll({
                where: {
                    userId,
                    type: 'experience'
                }
            });

            const identityDoc = await UserDocument.findAll({
                where: {
                    userId,
                    type: 'identity'
                }
            });

            return {
                status: removeDocument ? 200 : 400,
                experienceDoc,
                identityDoc,
                errorMessage: removeDocument ? null : "Oops! Couldn't update document!"
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: "Something went wrong. " + error
            };
        }
    }
}

export default removeExperienceDocument;