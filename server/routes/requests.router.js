const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

const router = express.Router();

// Get all requests for current user:
router.get('/:userId', (req, res)=>{
    const userId = req.params.userId;
    const queryString = `SELECT * , requests.id AS "request_id" FROM "requests"
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
    console.log('PUT:/', req.body);

    let newHolder = '';
    let newStatus = '';
  
    // Check if user responded yes first 
    if(req.body.requestResponse === "Yes"){
        // set holder to new person
        newHolder = req.body.requestedBy;
        newStatus = 'borrowed'
    }
    else if (req.body.requestResponse === "No"){
        // set holder to the same person (owner)
        newHolder = req.body.itemOwner;
        newStatus = 'available'
    }
    else {
        console.log('not reading response correctly');
    }

    const queryString = `
    WITH
       A AS (UPDATE "items"
            SET status=$1,
                holder_user_id=$2
        WHERE id = $3)

        UPDATE "requests"
            SET responded='TRUE'
        WHERE id = $4;`;
    const values = [ newStatus, newHolder, req.body.itemId, req.body.requestId ];
    console.log(values);
    pool.query( queryString, values ).then( (results)=>{
        res.send( results.rows );
    }).catch( (err)=>{
        console.log(err);
        res.sendStatus(400);
    })

});

// End Request and Hide
router.put('/end', (req, res)=>{
    console.log('in /requestEnd PUT/:', req.body);
    const queryString = `UPDATE "requests" SET responded='TRUE' WHERE id=$1;`;
    const values = [ req.body.requestId];
    pool.query( queryString, values ).then( (results)=>{
        res.send( results.rows );
    }).catch( (err)=>{
        console.log(err);
        res.sendStatus(400);
    })
});

module.exports = router;
