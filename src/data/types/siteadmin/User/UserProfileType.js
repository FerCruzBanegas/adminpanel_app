import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType
} from 'graphql';

import { UserDocument } from '../../../models';
import UserDocumentType from './UserDocumentType';

const UserProfileType = new ObjectType({
  name: 'UserProfile',
  fields: {
    userId: { type: ID },
    firstName: { type: StringType },
    lastName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    email: { type: StringType },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    status: { type: IntType },
    country: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    verificationCode: { type: IntType },
    licenceFront: { type: StringType },
    licenceBack: { type: StringType },
    profileId: { type: IntType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    experienceDescription: {
      type: StringType,
    },
    picture: {
      type: StringType,
    },
    createdAt: {
      type: StringType
    },
    displayName: {
      type: StringType,
    },
    countryCode: { type: StringType },
    preferredPaymentMethod: {
      type: BooleanType
    },
    walletBalance: { type: FloatType },
    uploadStatus: { type: StringType },
    errorMessage: { type: StringType },
    experienceDocument: {
      type: new List(UserDocumentType),
      async resolve(data) {
        return await UserDocument.findAll({
          where: { userId: data.id, type: 'experience' }
        })
      }
    },
    identityDocument: {
      type: new List(UserDocumentType),
      async resolve(data) {
        return await UserDocument.findAll({
          where: { userId: data.id, type: 'identity' }
        })
      }
    },
    experienceDoc: {
      type: new List(UserDocumentType),
    },
    identityDoc: {
      type: new List(UserDocumentType),
    }
  },
});

export default UserProfileType;
