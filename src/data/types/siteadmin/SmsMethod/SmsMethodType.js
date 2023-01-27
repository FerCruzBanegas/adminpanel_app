import {
	GraphQLObjectType as ObjectType,
	GraphQLString as StringType,
	GraphQLInt as IntType,
} from 'graphql';

import getCommonType from '../../../../helpers/getCommonType';

const SmsMethodType = new ObjectType({
	name: 'SmsMethodType',
	fields: {
		id: {
			type: IntType
		},

		name: {
			type: StringType
		},

		status: {
			type: StringType
		},

		accountId: {
			type: StringType
		},

		securityId: {
			type: StringType
		},

		phoneNumber: { type: StringType },
		phoneDialCode: { type: StringType },
		phoneCountryCode: { type: StringType },
	}
});

export const SmsCommonMethodType = getCommonType('SmsCommonMethodType', SmsMethodType);

export default SmsMethodType;