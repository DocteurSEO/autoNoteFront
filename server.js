const express = require('express');
const axios = require('axios');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.json())
const {getDiff} = require('./pixel')
const nodeHtmlToImage = require('node-html-to-image');
// https://us-central1-gogokodo.cloudfunctions.net/pixelDiff
app.post(`/api`, async function(req, res) {
  
   
 

  (async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setViewport({
      width: 1200,
      height: 1700,
      deviceScaleFactor: 1,
    });
    await page.goto('https://keen-klepon-978cd0.netlify.app');
    const image = await page.screenshot({path: 'buddy.png'});
    await page.goto('https://trusting-ritchie-c6942d.netlify.app');
    const image2 = await page.screenshot({path: 'buddy-screenshot.png'});
     
    await page.setViewport({
      width: 393,
      height: 851,
      deviceScaleFactor: 1,
    }); 

    await page.goto('https://keen-klepon-978cd0.netlify.app');
    const imageMobile = await page.screenshot({path: 'buddyMobile.png'});
    await page.goto('https://trusting-ritchie-c6942d.netlify.app');
    const imageMobile2 = await page.screenshot({path: 'buddy-mobile2.png'});


    const dataPc = await getDiff(image ,image2, res)
    const dataMobile = await getDiff(imageMobile ,imageMobile2, res)
    const note = (dataPc.match*0.1 +  dataMobile.match*0.1).toFixed(2)
    
    res.json({note})


    
    await browser.close();
  })();
    

});

app.listen('3000', ()=>{
    console.log('listening on 3000')
})