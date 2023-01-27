import {
	GraphQLString as StringType,
	GraphQLID as ID
} from 'graphql'
import UserProfileType from '../../../types/siteadmin/User/UserProfileType'
import { UserDocument } from '../../../models/index'

const uploadIdentityImage = {

	type: UserProfileType,

	args: {
		userId: { type: ID },
		imageName: { type: StringType },
		type: { type: StringType },
	},

	async resolve({ request }, { userId, imageName, type }) {

		try {
			let userDocument;

			if (!request.user || !request.user.admin) {
				return {
					status: 500,
					errorMessage: "Oops! Please login with your account and try again."
				};
			}

			userDocument = await UserDocument.create({
				imageName,
				userId,
				type
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
				status: userDocument ? 200 : 400,
				experienceDoc,
				identityDoc,
				errorMessage: userDocument ? null : "Oops! Couldn't update document!"
			}

		} catch (error) {
			return {
				status: 400,
				errorMessage: "Something went wrong. " + error
			};
		}
	}
}

export default uploadIdentityImage;