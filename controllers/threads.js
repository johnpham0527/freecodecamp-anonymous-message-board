const getDb = require('../db');

function getThreads(req, res, next) {
    console.log(`GET threads...`)
}

function postThreads(req, res, next) {
    const board = req.params.board;
    const { text, delete_password } = req.body;
    console.log(`POST threads. board is ${board}, text is ${text}, and delete_password is ${delete_password}`);


    /*
    Saved will be at least _id, text, createdon_(date&time), bumpedon_(date&time, starts same as created_on), reported(boolean), deletepassword_, & replies(array).
    */
    getDb.then(function(db) {
        
    });


    return res.send(`Hello world`);
    //Eventually, this will return a res redirect to /b/${req.params}
}

function putThreads(req, res, next) {
    console.log(`PUT threads...`)
}

function deleteThreads(req, res, next) {
    console.log(`DELETE threads...`)
}

module.exports = { getThreads, postThreads, putThreads, deleteThreads };