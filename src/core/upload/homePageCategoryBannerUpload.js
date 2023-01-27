import multer from 'multer';
import sharp from 'sharp';

const crypto = require('crypto');
const fs = require('fs');

import { homePageCategoryBannerUploadDir } from '../../config';

const homePageCategoryBannerUpload = app => {
    var storage = multer.diskStorage({
        destination: `./${homePageCategoryBannerUploadDir}`,
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
    });

    var upload = multer({ storage });

    async function removeFiles(fileName, filePath) {
        if (fs.existsSync(filePath + fileName)) {
            fs.unlink(filePath + fileName, (err) => {
                if (err) console.log(err)
            })
        }
    }

    app.post('/deleteHomePageCategoryBanner', async (req, res) => {
        const fileName = req.body.fileName;
        const filePath = `.${homePageCategoryBannerUploadDir}`;
        await removeFiles(fileName, filePath);
        res.send({ status: 200 })
    });

    app.post('/uploadHomePageCategoryBanner', upload.array('file'), async (req, res, next) => {
        try {
            let files = req.files, fileName = files[0].filename;

            await sharp(files[0].path)
                .resize(1000, null)
                .toFile(`.${homePageCategoryBannerUploadDir}` + 'medium_' + fileName)
                .then(img => console.log(img))
                .catch(err => console.log(err))

            await sharp(files[0].path)
                .resize(1400, null)
                .toFile(`.${homePageCategoryBannerUploadDir}` + 'large_' + fileName)
                .then(img => console.log(img))
                .catch(err => console.log(err))


            res.send({ status: 200, fileName })
        }
        catch (error) {
            res.send({
                status: 400,
                errorMessage: 'Somthing went wrong' + error
            });
        }
    });
};

export default homePageCategoryBannerUpload;