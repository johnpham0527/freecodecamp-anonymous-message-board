const getDb = require('../db');

function getThreads(req, res, next) {
    console.log(`GET threads...`)

    getDb.then(function(db) {
        db.collection('threads').find({}, {limit: 10, sort: {datetime: -1}}, function (err, data) {
            if (err) {
                console.err(`Error finding threads: ${err}`);
            }
            console.log(`data is ${data}`);
        })
    })

    return res.json(data);
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
        db.collection('threads').insertOne(data, function(err, res) {
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
    console.log(`PUT threads...`)
}

function deleteThreads(req, res, next) {
    console.log(`DELETE threads...`)
}

module.exports = { getThreads, postThreads, putThreads, deleteThreads };