const getDb = require('../db');

function getThreads(req, res, next) {
    console.log(`GET threads...`)
}

function postThreads(req, res, next) {
    console.log(`POST threads...`)
}

function putThreads(req, res, next) {
    console.log(`PUT threads...`)
}

function deleteThreads(req, res, next) {
    console.log(`DELETE threads...`)
}

module.exports = { getThreads, postThreads, putThreads, deleteThreads };