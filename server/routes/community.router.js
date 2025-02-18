const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

// Get all users from the community:
router.get('/', (req, res)=>{
    const queryString = `SELECT id, role, username, avatar FROM "user"`;
    pool.query( queryString ).then( (results)=>{
        res.send( results.rows );
    }).catch( (err)=>{
        console.log(err);
        res.sendStatus(400);
    })
})

module.exports = router;
