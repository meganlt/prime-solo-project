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
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// setup s3 client
const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


// GET all trinkets from the database:
router.get('/', (req, res) => {
  const queryString = `SELECT * from "items";`
  pool.query( queryString ).then((results)=>{
    res.send(results.rows);
  }).catch( (err)=>{
    console.log(err);
    res.sendStatus(400);
  })
});

// GET all available trinkets not owned by current user from the database:
router.get('/available/:userId', (req, res) => {
  const userId = req.params.userId;
  const queryString = `SELECT items.id, items.image, items.name, items.category, items.term, items.description, items.owner_user_id, "user".username, "user".avatar 
  FROM "user"
  JOIN "items" ON "user".id = items.owner_user_id
  WHERE items.status = 'available' AND items.owner_user_id != $1
  ORDER BY items.id;`
  const values = [userId]
  pool.query( queryString, values ).then((results)=>{
    res.send(results.rows);
  }).catch( (err)=>{
    console.log(err);
    res.sendStatus(400);
  })
});

// GET all trinkets owned by the currently logged in user:
router.get('/:userId', (req, res) => {
  // console.log('in GET/userID:', req.params);
  const userId = req.params.userId;
  const queryString = `SELECT * from "items" WHERE "owner_user_id"= $1 ORDER BY id;`
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
  // console.log('POST req.files/:', req.files);
  // console.log('POST req.body/:', req.body);
  // console.log('POST req.query/:', req.query);

  try {
    // setup variables for s3
    const imageName = req.query.imageName;
    const imageType = req.query.imageType
    const imageData = req.files.image.data;

    // console.log('image name:', imageName);
    // console.log('imageType:', imageType);
    // console.log('image data:', imageData);

    const imageKey = `images/${imageName}`; // folder/file
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: imageKey, // folder/file 
        Body: imageData, // image data to upload
        ContentType: imageType, // ensure image type
    });
    
    // Get response from s3 client
    const response = await s3Client.send(command);
    console.log('response:', response); // Used for debugging
    const imageURL = 'https://borrow-burrow-public.s3.us-east-1.amazonaws.com/images/'+imageName;

    // Assemble query string for non-image items
    const queryString = `INSERT INTO "items" ( name, owner_user_id, holder_user_id, category, term, status, description, image )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 );`;

    // Assemble values array
    const values = [ req.body.trinketName, req.body.trinketUser, req.body.trinketUser,req.body.trinketCategory, req.body.trinketTerms, 'available', req.body.trinketDesc, imageURL ]

    // pool.query to insert item
    await pool.query( queryString, values);
    res.sendStatus(201);

  } catch (error){
      console.log(error)
      res.sendStatus(500);
  }
});

// PUT to Edit Trinket
router.put('/', async (req, res)=>{
  console.log('POST req.files/:', req.files);
  console.log('PUT /:', req.body);
  console.log('POST req.query/:', req.query);

  const id = req.body.trinketId;
  let queryString = '';
  let values = [];
  let checkedHolder = '';

  if( req.body.trinketStatus == 'available' && req.body.trinketUser !== req.body.trinketHolderId){
    checkedHolder = req.body.trinketUser;
  }
  else {
    checkedHolder = req.body.trinketHolderId;
  }
  // TO DO: STRETCH: remove old image from AWS before uploading new

  try {
    // Check if new image data exists
    if( req.files !== null) {
      // If new image data exists, setup data to send to AWS 
      const imageName = req.query.imageName;
      const imageType = req.query.imageType
      const imageData = req.files.image.data;

      const imageKey = `images/${imageName}`; // folder/file
      const command = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: imageKey, // folder/file 
          Body: imageData, // image data to upload
          ContentType: imageType, // ensure image type
      });
      
      // Get response from s3 client
      const response = await s3Client.send(command);
      // console.log('response:', response); // Used for debugging
      // Setup new image URL from AWS
      const imageURL = 'https://borrow-burrow-public.s3.us-east-1.amazonaws.com/images/'+imageName;
      // Assemble query string for non-image items, and add new image URL
      queryString = `UPDATE "items" 
      SET "name"=$1,
        "category"=$2,
        "term"=$3,
        "status"=$4,
        "holder_user_id"=$5,
        "description"=$6,
        "image"=$7
      WHERE id=$8;`;
    
        // Assemble values array WITH IMAGE
        values = [ req.body.trinketName, req.body.trinketCategory, req.body.trinketTerms, req.body.trinketStatus, checkedHolder, req.body.trinketDesc, imageURL, id ];
    } else {
      // If no image data exists, setup query to update all other rows
      queryString = `UPDATE "items" 
      SET "name"=$1,
        "category"=$2,
        "term"=$3,
        "status"=$4,
        "holder_user_id"=$5,
        "description"=$6
      WHERE id=$7;`;
    
      // Assemble values array WIHOUT IMAGE
      values = [ req.body.trinketName, req.body.trinketCategory, req.body.trinketTerms, req.body.trinketStatus, checkedHolder, req.body.trinketDesc,  id ];
    }

    // pool.query to UPDATE item
    await pool.query( queryString, values);
    res.sendStatus(200);

  } catch (error){
      console.log(error)
      res.sendStatus(500);
  }
});

// DELETE to Delete Trinket
router.delete('/', async (req,res)=>{
  // console.log('DELETE/:', req.query.id);
  // Get a database client
  const client = await pool.connect(); 

    try {
        // Start a transaction
        await client.query('BEGIN'); 

        // First, delete related requests
        await client.query('DELETE FROM "requests" WHERE message_item = $1', [req.query.id]);

        // Then, delete the item itself
        await client.query('DELETE FROM "items" WHERE id = $1', [req.query.id]);

        // Commit the transaction
        await client.query('COMMIT'); 
        res.sendStatus(200);
    } catch (err) {
        // Roll back changes if an error occurs
        await client.query('ROLLBACK'); 
        console.error('Error deleting item:', err);
        res.sendStatus(500);
    } finally {
      // Release the database client
        client.release(); 
    }
});



module.exports = router;
