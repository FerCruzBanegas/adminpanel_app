export function getSubject(type) {
	let subject, previewText;

	if (type === 'userReceipt') {
		subject = 'User Job Request';
		previewText = 'User Job Request';
	}

	if (type === 'providerReceipt') {
		subject = 'Provider Job Request';
		previewText = 'Provider Job Request';
	}


	return {
		subject,
		previewText
	};
}