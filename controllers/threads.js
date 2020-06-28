const getDb = require('../db');

function getThreads(req, res, next) {
    console.log(`GET threads...`)
}

function postThreads(req, res, next) {
    
    console.log(`POST threads. req.params is ${JSON.stringify(req.params)} and req.body is ${JSON.stringify(req.body)}`);
    /*
    To implement: database functions
    */
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