const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');


const router = express.Router();

// If the request came from an authenticated user, this route
// sends back an object containing that user's information.
// Otherwise, it sends back an empty object to indicate there
// is not an active session.
router.get('/', (req, res) => {
  const queryString = `SELECT * from "items";`
  pool.query( queryString).then((results)=>{
    res.send(results.rows);
  }).catch( (err)=>{
    console.log(err);
    res.sendStatus(400);
  })
});

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



module.exports = router;
