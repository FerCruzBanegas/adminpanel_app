import bodyParser from 'body-parser';
import multer from 'multer';
import sharp from 'sharp'

const fs = require('fs')
const crypto = require('crypto');

import { homePageCategoryLogoUploadDir } from '../../config';

const homePageCategoryLogoUpload = app => {
    var storage = multer.diskStorage({
        destination: `.${homePageCategoryLogoUploadDir}`,
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

    var upload = multer({ storage: storage });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    async function removeFiles(fileName, filePath) {
        if (fs.existsSync(filePath + fileName)) {
            fs.unlink(filePath + fileName, (err) => {
                if (err) console.log(err)
            })
        }
    }

    app.post('/deleteHomePageCategoryLogo', async (req, res, next) => {
        const fileName = req.body.fileName;
        const filePath = `.${homePageCategoryLogoUploadDir}`;
        await removeFiles(fileName, filePath);
        res.send({ status: 200 });
    })

    app.post('/uploadHomePageCategoryLogo', upload.array('file'), async (req, res, next) => {
        try {
            let files = req.files, fileName = files[0].filename;

            await sharp(files[0].path)
                .resize(60, null)
                .toFile(`.${homePageCategoryLogoUploadDir}` + 'small_' + fileName)
                .then(img => console.log(img))
                .catch(err => console.log(err))

            await sharp(files[0].path)
                .resize(95, null)
                .toFile(`.${homePageCategoryLogoUploadDir}` + 'medium_' + fileName)
                .then(img => console.log(img))
                .catch(err => console.log(err))

            res.send({ status:200, fileName });
        } catch (error) {
            res.send({ 
                status:400, 
                errorMessage:'Somthing went wrong' + error
             });
        }
    })
}

export default homePageCategoryLogoUpload;