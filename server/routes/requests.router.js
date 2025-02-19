const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

// Get all requests for current user:
router.get('/:userId', (req, res)=>{
    const userId = req.params.userId;
    const queryString = `SELECT * FROM "requests"
JOIN "items" ON "requests".message_item = items.id
WHERE sent_to = $1 AND responded = 'FALSE';`;
    const values = [userId];
    pool.query( queryString, values ).then( (results)=>{
        res.send( results.rows );
    }).catch( (err)=>{
        console.log(err);
        res.sendStatus(400);
    })
});

// POST new borrow request

router.post('/', (req, res)=>{
    console.log('POST:/', req.body);
    const queryString = `INSERT into "requests" ( "type", "details", "sent_by", "sent_to", "message_item", "responded")
	VALUES ( $1, $2, $3, $4, $5, $6);`
    const values = [ req.body.requestType, req.body.requestDetails, req.body.requestedBy, req.body.requestedTo, req.body.itemRequested, 'FALSE'];
    pool.query( queryString, values ).then( (results)=>{
        res.send( results.rows );
    }).catch( (err)=>{
        console.log(err);
        res.sendStatus(400);
    })
})

// ACCEPT borrow request
router.put('/', (req, res)=>{

});

module.exports = router;
