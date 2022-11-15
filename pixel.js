
const axios = require('axios')
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
 
const getBuffer = async url => {
    const response = await axios(url, { responseType: 'arraybuffer' })
    const buffer64 = Buffer.from(response.data, 'utf8') 
    return buffer64
  }


 function getDiff (imgURL1, imgURL2, response){


    const img1 = PNG.sync.read(imgURL1 );
    const img2 = PNG.sync.read( imgURL2 );
    const {width, height} = img1;
    const diff = new PNG({width, height});
     
    const diffPixel =  pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0});
    const totalPixel = width * height
    const ramdom= new Date().getTime();
    //fs.writeFileSync('./diff/'+ramdom+'.png', PNG.sync.write(diff));
    const data = {
        diffPixel, 
        totalPixel, 
        match : 100 - ((diffPixel * 100) / totalPixel)
    }
    return data 
      //response.send(data);




 } 



 module.exports = {getDiff}
// exports.helloWorld = functions.https.onRequest(async (request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// if(!request.body.img1 || !request.body.img2){
//     response.send('Please send a valid image ');
//     return
// }

 
//  if(!request.body.buffer){
 
  

    

// const img1Buffer = await getBuffer(request.body.img1)
// const img2Buffer = await getBuffer(request.body.img2)

// getDiff(img1Buffer, img2Buffer, response)
// return 



//  }

// // TODO Generate Diff pixel in Buffer 
// // getDiff(request.body.img1 , request.body.img2 , response  )
// // return

// response.send('for now, I cant generate diff width buffer, please Ahmed code this ! ');

// });