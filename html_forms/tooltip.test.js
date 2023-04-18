import puppeteer from 'puppeteer';
import { fork } from 'child_process';

// eslint-disable-next-line
import setimmediate from 'setimmediate';
jest.setTimeout(50000); // default puppeteer timeout

describe('Tooltip test', () => {
	let browser = null;
	let page = null;
	let server = null;
	const baseUrl = 'http://localhost:9000';

	beforeAll(async () => {
		server = fork(`${__dirname}/tooltip.server.js`);
		await new Promise((resolve, reject) => {
			server.on('error', reject);
			server.on('message', (message) => {
				if (message === 'ok') {
					resolve();
				}
			});
		});
		const browserFetcher = puppeteer.createBrowserFetcher();
		const revisionInfo = await browserFetcher.download('1095492');

		browser = await puppeteer.launch({
			executablePath: revisionInfo.executablePath,
			// ignoreDefaultArgs: ['--disable-extensions'],
			headless: true,
			// args: ['--no-sandbox', '--disabled-setupid-sandbox'],
		});
		// browser = await puppeteer.launch({
		// 	executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome',
		// 	headless: false, // show gui
		// 	slowMo: 250,
		// 	devtools: true, // show devTools
		// });
		page = await browser.newPage();
	});

	afterAll(async () => {
		await browser.close();
		server.kill();
	});

	test('test popover', async () => {
		await page.goto(baseUrl);
		const btn = await page.$('.btn');
		await btn.click();
		await page.waitForSelector('.popover', { visible: true });
	});
});
