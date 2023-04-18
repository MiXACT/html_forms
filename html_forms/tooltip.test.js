// import puppeteer from 'puppeteer';
// import { fork } from 'child_process';

// // eslint-disable-next-line
// import setimmediate from 'setimmediate';
// jest.setTimeout(30000); // default puppeteer timeout

// describe('Credit Card Validator form', () => {
// 	let browser = null;
// 	let page = null;
// 	let server = null;
// 	const baseUrl = 'http://localhost:9000';

// 	beforeAll(async () => {
// 		server = fork(`${__dirname}/e2e.server.js`);
// 		await new Promise((resolve, reject) => {
// 			server.on('error', reject);
// 			server.on('message', (message) => {
// 				if (message === 'ok') {
// 					resolve();
// 				}
// 			});
// 		});
// 		const browserFetcher = puppeteer.createBrowserFetcher();
// 		const revisionInfo = await browserFetcher.download('1095492');

// 		browser = await puppeteer.launch({
// 			executablePath: revisionInfo.executablePath,
// 			// ignoreDefaultArgs: ['--disable-extensions'],
// 			headless: true,
// 			// args: ['--no-sandbox', '--disabled-setupid-sandbox'],
// 		});
// 		// browser = await puppeteer.launch({
// 		// 	// executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome',
// 		// 	// headless: false, // show gui
// 		// 	// slowMo: 250,
// 		// 	// devtools: true, // show devTools
// 		// });
// 		page = await browser.newPage();
// 	});

// 	afterAll(async () => {
// 		await browser.close();
// 		server.kill();
// 	});

// 	test('test card types', async () => {
// 		const cards = {
// 			mir: '2200220022002222',
// 			diners_club: '30328079445028',
// 			jcb: '3532590359720076',
// 			amex: '373281720024152',
// 			visa: '4716248828278863',
// 			master: '5314613736666777',
// 			discover: '6011134319283934',
// 		};
// 		await page.goto(baseUrl);
// 		const div = await page.$('.col-md-5');
// 		const input = await div.$('.form-control');
// 		for (const cardType in cards) {
// 			if (Object.prototype.hasOwnProperty.call(cards, cardType)) {
// 				/* eslint-disable */
// 				await input.type(cards[cardType]);
// 				await page.waitForSelector(`.${cardType} .cdisabled`, { hidden: true });
// 				/* eslint-enable */
// 			}
// 		}
// 	});

// 	test('test card number', async () => {
// 		await page.goto(baseUrl);
// 		const div = await page.$('.col-md-5');
// 		const input = await div.$('.form-control');
// 		const submit = await div.$('.btn');

// 		await input.type('4967538166331332');
// 		await submit.click();
// 		await page.waitForSelector('#c_valid', { visible: true });

// 		await input.type('1111111111111111');
// 		await submit.click();
// 		await page.waitForSelector('#c_invalid', { visible: true });
// 	});
// });
