import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => { // закрытие и завершение тестов
    await browser.close();
    server.kill();
  });

  test('should add do something', async () => {
    await page.goto(baseUrl);
  });

  test('Проверка открытия виджета', async () => {
    await page.goto(baseUrl); // перейти на нужный Url
    await page.waitForSelector('.btn');// дождатся отображение формы

    const container = await page.$('.container'); // получить елемент
    const btn = await container.$('.btn');

    await btn.click(); // кликнуть по кнопке

    await page.waitForSelector('.container .popover'); // проверка приобретения активного класса
  });

  test('Проверка закрытие виджета', async () => {
    await page.goto(baseUrl); // перейти на нужный Url
    await page.waitForSelector('.btn');// дождатся отображение формы

    const container = await page.$('.container'); // получить елемент
    const btn = await container.$('.btn');

    await btn.click();
    await btn.click();

    await page.waitForFunction(() => !document.querySelector('div .popover')); // проверка что елемент с таким классом удалился
  });
});
