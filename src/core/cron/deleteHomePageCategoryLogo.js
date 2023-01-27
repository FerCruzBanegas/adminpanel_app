var CronJob = require('cron').CronJob;
import fs from 'fs';
import { promisify } from 'util';

import { homePageCategoryLogoUploadDir } from '../../config';
import { TempImages, HomePageCategory } from '../../data/models';

const readFileAsync = promisify(fs.readdir);
const deleteFileAsync = promisify(fs.unlink);

let dir = '.' + homePageCategoryLogoUploadDir

const deleteHomePageCategoryLogo = app => {

	// CronJob(seconds minutes hours day-of-month months day-of-week)

	new CronJob('0 0 */6 * * *', async function () {

		console.log('holy moly remove homepage category logo requests...');
		try {

			const files = await readFileAsync(dir);

			const promise = files.map(async (file) => {

				if (!file.includes('small') && !file.includes('medium') && !file.includes('large')) {
					const existOnHomepage = await HomePageCategory.findOne({
						where: {
							logo: file
						},
						raw: true
					});

					const existOnTemp = await TempImages.findOne({
						where: {
							fileName: file,
							createdAt: {
								$lt: new Date(new Date() - 1 * 60 * 60 * 1000)
							}

						},
						raw: true
					});

					if (!existOnTemp && !existOnHomepage) {
						if (fs.existsSync(dir + file)) {
							await deleteFileAsync(dir + file);
						}

						if (fs.existsSync(dir + 'small_' + file)) {
							await deleteFileAsync(dir + 'small_' + file);
						}

						if (fs.existsSync(dir + 'medium_' + file)) {
							await deleteFileAsync(dir + 'medium_' + file);
						}

						if (fs.existsSync(dir + 'large_' + file)) {
							await deleteFileAsync(dir + 'large_' + file);
						}
					}

				} else {
					console.log('Not required');
				};

			});

			const resolve = await Promise.all(promise);

		} catch (error) {
			console.log('remove homepage category logo cron error: ', error);
		}

	}, null, true, 'America/Los_Angeles');

};

export default deleteHomePageCategoryLogo;