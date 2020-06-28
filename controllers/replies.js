const getDb = require('../db');

function getReplies(req, res, next) {
    console.log(`Get replies...`)
}

function putReplies(req, res, next) {
    console.log(`PUT replies...`)
}

function postReplies(req, res, next) {
    console.log(`POST replies...`)
}

function deleteReplies(req, res, next) {
    console.log(`DELETE replies...`)
}

module.exports = { getReplies, putReplies, postReplies, deleteReplies };