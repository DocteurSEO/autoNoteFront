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
    await page.goto('https://buddy.works');
    const image = await page.screenshot({path: 'buddy-screenshot.png'});
    await page.goto('https://tourmaline-pastelito-ee03df.netlify.app');
    const image2 = await page.screenshot({path: 'buddy-screenshot.png'});
    getDiff(image,image2, res)
    await browser.close();
  })();
    

});

app.listen('3000', ()=>{
    console.log('listening on 3000')
})