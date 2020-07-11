const getDb = require('../db');

function getReplies(req, res, next) {
    console.log(`Get replies...`)
}

function putReplies(req, res, next) {
    console.log(`PUT replies...`)
}

function postReplies(req, res, next) {
    console.log(`POST replies...`)
    /*
       I can POST a reply to a thread on a specific board by passing form data text, deletepassword_, & threadid_ to /api/replies/{board} and it will also update the bumped_on date to the comments date.
       (Recommend res.redirect to thread page /b/{board}/{thread_id})
       In the thread's replies array will be saved _id, text, createdon_, deletepassword_, & reported.
    */
}

function deleteReplies(req, res, next) {
    console.log(`DELETE replies...`)
}

module.exports = { getReplies, putReplies, postReplies, deleteReplies };