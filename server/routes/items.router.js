const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();

// SETUP S3
const {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} = require('@aws-sdk/client-s3');

// setup s3 client
const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


// GET all trinkets from the database:
router.get('/', (req, res) => {
  const queryString = `SELECT * from "items";`
  pool.query( queryString).then((results)=>{
    res.send(results.rows);
  }).catch( (err)=>{
    console.log(err);
    res.sendStatus(400);
  })
});

// GET all trinkets owned by the currently logged in user:
router.get('/:userId', (req, res) => {
  console.log('in GET/userID:', req.params);
  const userId = req.params.userId;
  const queryString = `SELECT * from "items" WHERE "owner_user_id"= $1;`
  const values = [userId] ;
  pool.query( queryString, values ).then((results)=>{
    res.send(results.rows);
  }).catch( (err)=>{
    console.log(err);
    res.sendStatus(400);
  })
});


// POST new trinket
router.post('/', async (req, res)=>{
  console.log('POST /:', req.body, req.query, req.files);

  try {
    // setup variables for s3
    // will need to customize this for the image name specifically. req.query.image
    // const { imageName, imageType } = req.query;
    const imageName = req.body.trinketImage;
    const imageType = req.body.trinketImageType;
    const imageData = req.body.file.data;
    const imageKey = `images/${imageName}`; // folder/file
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: imageKey, // folder/file 
        Body: imageData, // image data to upload
    });

    
    // get response from s3 client
    const response = await s3Client.send(command);
    console.log(response); // Used for debugging

    // assemble query string for non-image items
    const queryString = `INSERT INTO "items" ( name, owner_user_id, holder_user_id, category, term, status, description, image )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 );`;

    // assemble values array
    const values = [ req.body.trinketName, req.body.trinketUser, req.body.trinketUser,req.body.trinketCategory, req.body.trinketTerms, 'available', req.body.trinketDesc, req.body.trinketImage ]

    // pool.query to insert item
    await pool.query( queryString, values);

  } catch (error){
      console.log(error)
      res.sendStatus(500);
  }
  
  // res.send('woof post');

  

});

// PUT to Edit Trinket
router.put('/', (req, res)=>{
  console.log('PUT /:', req.body);
  res.send('meow put');
})


module.exports = router;
