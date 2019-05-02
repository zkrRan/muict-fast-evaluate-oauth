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

  console.log('>> Loging in...')

  await page.waitForSelector('#txtUsrname')
  await page.type('#txtUsrname', UNI_USER)

  await page.waitForSelector('#txtPassword')
  await page.type('#txtPassword', UNI_PASS)
  
  await page.setViewport({ width: 1680, height: 893 })

  await page.waitFor(2000)
  
  await page.waitForSelector('div > .row > .col-lg-12 > #lkbLogin > b')
  await page.click('div > .row > .col-lg-12 > #lkbLogin > b')
  
  await navigationPromise

  await page.waitFor(1000)

  console.log('>> Ready!')

  var i = 1, j = 0, k = 0;
  var isStop = 0;

  while (i++) {
    console.log(i)
    const courseElement = await page.$('#ContentPlaceHolder1_gdvStdEva > tbody > tr:nth-child(' + (i) + ')')

    if (!courseElement) {
      isStop = 1;
      break;
    }
    
    const courseID = await page.evaluate(element => element.textContent, '#ContentPlaceHolder1_gdvStdEva > tbody > tr:nth-child(' + (i) + ') > td:nth-child(2)')

    const buttonElement = await page.$('#ContentPlaceHolder1_gdvStdEva_lkbEvaluate_' + (i - 2) + ' > b')

    if (!buttonElement) {
      console.log('Skipping ' + courseID + '. Reason: evaluated')
      continue;
    } else {
      await page.waitForSelector('#ContentPlaceHolder1_gdvStdEva_lkbEvaluate_' + (i - 2) + ' > b')
      await page.click('#ContentPlaceHolder1_gdvStdEva_lkbEvaluate_' + (i - 2) + ' > b')
      
      await navigationPromise

      // Course
      
      await page.waitForSelector('.tableedit:nth-child(4) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      await page.click('.tableedit:nth-child(4) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      
      await page.waitForSelector('.tableedit:nth-child(5) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      await page.click('.tableedit:nth-child(5) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      
      await page.waitForSelector('.tableedit:nth-child(6) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      await page.click('.tableedit:nth-child(6) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      
      await page.waitForSelector('.tableedit:nth-child(7) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      await page.click('.tableedit:nth-child(7) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      
      await page.waitForSelector('.tableedit:nth-child(8) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      await page.click('.tableedit:nth-child(8) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
      
      await page.waitForSelector('.row > .panel > .panel-heading > .pull-right > #ContentPlaceHolder1_lkbNext')
      await page.click('.row > .panel > .panel-heading > .pull-right > #ContentPlaceHolder1_lkbNext')

      // Lecturer

      for (j = 0 ; j > -1 ; j++) {
        await navigationPromise

        await page.waitFor(600)

        if (!await page.$('.tableedit:nth-child(5) > tbody > tr > .paddingR:nth-child(2) > .radio > label')) {
          break;
        } else {
          await page.waitForSelector('.tableedit:nth-child(5) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(5) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(6) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(6) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(7) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(7) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(8) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(8) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(9) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(9) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(10) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(10) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(11) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(11) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(12) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(12) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(13) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(13) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(14) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(14) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(16) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(16) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(17) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(17) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(18) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(18) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(22) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(22) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(21) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(21) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(20) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(20) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(19) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(19) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(24) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(24) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(25) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(25) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(26) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(26) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(27) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(27) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('.tableedit:nth-child(28) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          await page.click('.tableedit:nth-child(28) > tbody > tr > .paddingR:nth-child(2) > .radio > label')
          
          await page.waitForSelector('#ContentPlaceHolder1_lkbNext')
          await page.click('#ContentPlaceHolder1_lkbNext')
        }
      }

      await navigationPromise

      await page.waitForSelector('.panel > .panel-heading > .pull-right > #ContentPlaceHolder1_lkbSave > b')
      await page.click('.panel > .panel-heading > .pull-right > #ContentPlaceHolder1_lkbSave > b')

      await navigationPromise
      
      await page.goto('https://academic.ict.mahidol.ac.th/student/ict-ces/MainStd.aspx')
    }
  }
  
  await browser.close()
})()