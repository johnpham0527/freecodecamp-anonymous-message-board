const getDb = require('../db');
const ObjectId = require('mongodb'). ObjectId;

function getReplies(req, res, next) {
    console.log(`Get replies...`)

/*
const { board } = req.params;
const threadid_ = req.query.thread_id;

getDb.then(function(db) {
 let thread = db.collection(board).find(ObjectId(threadid_));
 let replies = thread.replies.map(reply => {
   const now = new Date();
   return ({
     text: reply.text,
     createdon_: reply.now,
     bumpedon_: reply.now
   });
 });
  return res.json(replies);
}) 
*/
/*
I can GET an entire thread with all its 
replies from /api/replies/{board}?thread_id={thread_id}. 
Also hiding the same fields the client should be see.
*/
}

function putReplies(req, res, next) {
    console.log(`PUT replies...`)
/*
 I can report a reply and change its reported value to true by sending a PUT request to /api/replies/{board} and pass along the threadid_ & replyid_. (Text response will be 'success')
*/

}

function postReplies(req, res, next) {
    console.log(`POST replies...`)
    /*
       I can POST a reply to a thread on a specific board by passing form data text, deletepassword_, & threadid_ to /api/replies/{board} and it will also update the bumped_on date to the comments date.
       (Recommend res.redirect to thread page /b/{board}/{thread_id})
       In the thread's replies array will be saved _id, text, createdon_, deletepassword_, & reported.
    */
/*
Find thread
Push new data into array: password (encrypted), text data, created on, reported
res.redirect to board and thread page
*/
}

function deleteReplies(req, res, next) {
    console.log(`DELETE replies...`)
/*
Find thread
Edit thread to modify the text data 
What else? 
*/
}

module.exports = { getReplies, putReplies, postReplies, deleteReplies };
