import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';

import { UserDocument } from '../../../models';
import UserProfileType from './UserProfileType';
import UserDocumentType from './UserDocumentType';

import getCommonType from '../../../../helpers/getCommonType';

const UserType = new ObjectType({
  name: 'User',
  fields: {
    id: { type: ID },
    email: { type: StringType },
    phoneNumber: { type: StringType },
    phoneDialCode: { type: StringType },
    phoneCountryCode: { type: StringType },
    password: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    userStatus: { type: StringType },
    isActive: { type: IntType },
    isBan: { type: IntType },
    userType: { type: IntType },
    createdAt: { type: StringType },
    activeStatus: { type: StringType },
    overallRating: { type: FloatType },
    status: { type: IntType },
    errorMessage: { type: StringType },
    deletedAt: { type: StringType },
    profile: {
      type: UserProfileType
    },
    identityDocument: {
      type: new List(UserDocumentType),
      async resolve(data) {
        return await UserDocument.findAll({
          where: { userId: data.id, type: 'identity' }
        });
      }
    },
    experienceDocument: {
      type: new List(UserDocumentType),
      async resolve(data) {
        return await UserDocument.findAll({
          where: { userId: data.id, type: 'experience' }
        });
      }
    }
  },
});

export const UserCommonType = getCommonType('UserCommonType', UserType);

export default UserType;
