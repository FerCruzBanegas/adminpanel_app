import multer from 'multer';
const crypto = require('crypto');

import { cmsUploadDir } from '../../config';

const cmsFileUpload = app => {
	var upload = multer({
		storage: multer.diskStorage({
			destination: `.${cmsUploadDir}`,
			filename: function (req, file, cb) {
				crypto.pseudoRandomBytes(16, function (err, raw) {
					if (err) return cb(err);
					let ext = '';
					switch (file.mimetype) {
						case 'image/jpeg':
							ext = '.jpeg';
							break;
						case 'image/png':
							ext = '.png';
							break;
						case 'image/jpg':
							ext = '.jpg';
							break;
					}
					cb(null, raw.toString('hex') + ext);
				})
			}
		})
	});


	app.post('/file-upload-cms', upload.single('image'), async (req, res, next) => {
		try {
			let file = req.file, fileName = file.filename;
			res.send({ status: 200, fileName, filePath: req.file.path });
		} catch (error) {
			res.send({
				status: 400,
				errorMessage: 'Somthing went wrong' + error
			});
		}
	});

}

export default cmsFileUpload;