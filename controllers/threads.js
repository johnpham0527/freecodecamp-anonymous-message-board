const getDb = require('../db');
const ObjectId = require('mongodb').ObjectId;

function getThreads(req, res, next) {
    getDb.then(function(db) {
        db.collection(req.params.board).find({}, { 
            //find the 10 most recently bumped threads
            limit: 10, 
            sort: { bumpedon_: -1 } ,
            projection: { //do not display the password and reported status
                deletepassword_: 0,
                reported: 0,
                replies: { $slice: -3 } //this assumes that the last three replies are the most recent
            }
        }) 
            .toArray(function (err, data) {
                if (err) {
                    console.err(`Error finding threads: ${err}`);
                }
                return res.json(data);
            })
    })
}

function postThreads(req, res) {
    const board = req.params.board;
    const { text, delete_password } = req.body;
    console.log(`POST threads. board is ${board}, text is ${text}, and delete_password is ${delete_password}`);

    const now = new Date();

    const data = {
        text: text,
        createdon_: now,
        bumpedon_: now,
        reported: false,
        deletepassword_: delete_password,
        replies: []
    }

    /*
    Saved will be at least _id, text, createdon_(date&time), bumpedon_(date&time, starts same as created_on), reported(boolean), deletepassword_, & replies(array).
    */
    getDb.then(function(db) {
        //db.collection('threads').insertOne(data, function(err, res) {
        db.collection(board).insertOne(data, function(err, res) {
            if (err) {
                console.log(`Error inserting new thread. Error is ${err}`);
            }
            console.log(`New thread inserted.`);
        })
    });

    return res.redirect(302, `/b/${board}/`)
    //return res.send(`Hello world`);
    //Eventually, this will return a res redirect to /b/${req.params}
    
}

function putThreads(req, res, next) {
    const board = req.params.board;
    const { threadid_ } = req.query;
    /* I can report a thread and change its reported value to true by sending a PUT request to /api/threads/{board} and pass along the threadid_. (Text response will be 'success') */

    console.log(`The thread id is ${threadid_}`);
    getDb.then(function(db) {
        db.collection(board).findOneAndUpdate({ _id: ObjectId(threadid_)}, { reported: true }, { new: true },  function(err, result) {
            if (err) {
                console.log(`Error executing find and modify: ${err}`);
            }

            console.log(`result is ${result}`);
            return res.json('success');
        })
    });


    console.log(`PUT threads... threadid_ is ${threadid_}`);
}

function deleteThreads(req, res) {
    /* I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass along the threadid_ & deletepassword_. (Text response will be 'incorrect password' or 'success') */

    const board = req.params.board;
    const { threadid_, deletepassword_ } = req.query;

    console.log(`DELETE threads... board is ${board}, threadis_ is ${threadid_} and deletepassword_ is ${deletepassword_}`);

    getDb.then(function(db) {
        console.log(`Made it here...`)
        db.collection(board).findOne({_id: ObjectId(threadid_)}, function(err, result) {
            if (err) {
                console.log(`Error finding document: ${err}`);
            }
            
            console.log(`result is ${result}`);
            console.log(`password is ${result.deletepassword_}`);

            if (result.deletepassword_ === deletepassword_) {
                //implement db.collection(board).delete...
                db.collection(board).deleteOne({_id: ObjectId(threadid_)}, function(err, result) {
                    if (err) {
                        console.log(`Error finding document: ${err}`);
                    }
                    console.log(`Deleted document: ${result}`);
                    return res.json('success');
                })
            }
            else { // handle incorrect password
                console.log(`Incorrect password. Database password ${result.deletepassword_} is not equal to given password ${deletepassword_}`);
                return res.json('incorrect password');
            }
        })
    })

    /* To-do: implement bcrypt to hash passwords */
}

module.exports = { getThreads, postThreads, putThreads, deleteThreads };
