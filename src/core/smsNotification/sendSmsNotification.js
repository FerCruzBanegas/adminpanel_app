import { User } from '../../data/models';

export async function getUserPhoneNumber(id) {
	if (!id) return '';

	const userData = await User.findOne({
		attributes: ['phoneNumber', 'phoneDialCode'],
		where: { id }
	});

	if (!userData) return '';
	else return `${userData.phoneDialCode || ''}${userData.phoneNumber || ''}`
}