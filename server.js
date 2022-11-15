const express = require('express');
const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.json())
const {getDiff} = require('./pixel')
const nodeHtmlToImage = require('node-html-to-image');
const { response } = require('express');
// https://us-central1-gogokodo.cloudfunctions.net/pixelDiff


const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];

 
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
    app.get(`/api`, async function(req, res) {
      res.send('salutation')
    })
app.post(`/api`, async function(req, res) {
  
 
 

  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: minimal_args
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1728,
      height: 1117,
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
    const note = (dataPc.match*0.15 +  dataMobile.match*0.05).toFixed(2)
    
    res.json({note,dataPc,dataMobile})


    
    await browser.close();
  })();
    

});

app.listen('3000', ()=>{
    console.log('listening on 3000')
})