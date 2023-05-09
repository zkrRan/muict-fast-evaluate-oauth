const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();
const {UNI_USER, UNI_PASS} = process.env;

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://academic.ict.mahidol.ac.th/student/ict-ces/Default.aspx')

  page.on('dialog', dialog => {
    dialog.accept();
  });

  console.log('>> Logging in...')

  await page.waitForSelector('#lkbOAuthLogin')
  await page.click('#lkbOAuthLogin')
  await page.waitForNavigation()

  await page.waitForSelector('#userNameInput');
  await page.type('#userNameInput', UNI_USER);

  await page.waitForSelector('#passwordInput');
  await page.type('#passwordInput', UNI_PASS);

  await page.waitForSelector('#submitButton');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('#submitButton'),
  ]);

  console.log('>> Ready!')

  var i = 1, j = 0, k = 0;
  var isStop = 0;

  while (i++) {
    const courseElement = await page.$('#ContentPlaceHolder1_gdvStdEva > tbody > tr:nth-child(' + i + ') > td:nth-child(2)')

    if (!courseElement) {
      isStop = 1;
      break;
    }
    
    const courseIDElement = await page.$(`#ContentPlaceHolder1_gdvStdEva > tbody > tr:nth-child(${i}) > td:nth-child(2)`);
    const courseID = await page.evaluate(element => element ? element.textContent.trim() : null, courseIDElement);
    if (!courseID) {
      console.log(`Unable to find course ID for row ${i}`);
      continue;
    }

    const buttonElement = await page.$('#ContentPlaceHolder1_gdvStdEva_lkbEvaluate_' + (i - 2) + ' > b')

    if (!buttonElement) {
      console.log('Skipping ' + courseID + '. Reason: evaluated')
      continue;
    } else {
      await page.waitForSelector('#ContentPlaceHolder1_gdvStdEva_lkbEvaluate_' + (i - 2) + ' > b')
      await page.click('#ContentPlaceHolder1_gdvStdEva_lkbEvaluate_' + (i - 2) + ' > b')
      
      await navigationPromise

      // Wait for the instructor list to appear
      await page.waitForSelector('#ContentPlaceHolder1_rptHead_labinstructor')

      // Extract the instructor list using page.evaluate
      const instructorList = await page.evaluate(() => {
        const instructorSpan = document.querySelector('#ContentPlaceHolder1_rptHead_labinstructor')
        const instructorText = instructorSpan.innerText
        const instructors = instructorText.trim().split(/<br>|\n/)
        return instructors.filter(Boolean) // filter out any empty strings
      })

      // Instructor

      for (let instructor of instructorList) {
        // Wait for the table to appear
        await page.waitForSelector('.tableedit')

        // Auto 5, change this to something else if you want to give lower scores
        const rdb5s = await page.$$('.tableedit .paddingR:nth-child(2) .radio input[value="rdb5"]')

        // Loop through each radio button and click it
        for (let rdb5 of rdb5s) {
          await page.waitForTimeout(500) // wait for 500ms before clicking the element
          await rdb5.click()
        }

        await page.waitForSelector('#ContentPlaceHolder1_lkbNext')
        await page.click('#ContentPlaceHolder1_lkbNext')
      }

      // Course
      
      // Wait for the table to appear
      await page.waitForSelector('.tableedit')

      // Auto 5, change this to something else if you want to give lower scores
      const rdb5s = await page.$$('.tableedit .paddingR:nth-child(2) .radio input[value="rdb5"]')

      // Loop through each radio button and click it
      for (let rdb5 of rdb5s) {
        await page.waitForTimeout(500) // wait for 500ms before clicking the element
        await rdb5.click()
      }

      await page.waitForSelector('#ContentPlaceHolder1_lkbSave > b')
      await page.click('#ContentPlaceHolder1_lkbSave > b')

      await navigationPromise
      
      await page.goto('https://academic.ict.mahidol.ac.th/student/ict-ces/MainStd.aspx')
    }
  }
  
  await browser.close()
})()