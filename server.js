const express = require('express');
const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.json())
const {getDiff} = require('./pixel')
const nodeHtmlToImage = require('node-html-to-image');
// https://us-central1-gogokodo.cloudfunctions.net/pixelDiff
 let imageTest
 let imageTextMobile
fs.readFile('./pc.png', (err, data)=>{
  // error handle
  imageTest = data
  if(err) {
      throw err;
  }})


  fs.readFile('./pcm.png', (err, data)=>{
    // error handle
    imageTextMobile = data
    if(err) {
        throw err;
    }})

app.post(`/api`, async function(req, res) {
  
 
 

  (async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 960,
      deviceScaleFactor: 1,
    });
   
    await page.goto(req.body.url);
    const image = await page.screenshot({path: 'buddy.png'});
   //await page.goto('https://trusting-ritchie-c6942d.netlify.app');
    const image2 = imageTest
     
    await page.setViewport({
      width: 428,
      height: 926,
      deviceScaleFactor: 1,
    }); 

    await page.goto(req.body.url);
    const imageMobile = await page.screenshot({path: 'buddyMobile.png'});
    //await page.goto('https://trusting-ritchie-c6942d.netlify.app');
    const imageMobile2 = imageTextMobile


    const dataPc = await getDiff(image ,image2, res)
    const dataMobile = await getDiff(imageMobile ,imageMobile2, res)
    const note = (dataPc.match*0.1 +  dataMobile.match*0.1).toFixed(2)
    
    res.json({note,dataPc,dataMobile})


    
    await browser.close();
  })();
    

});

app.listen('3000', ()=>{
    console.log('listening on 3000')
})