const getDb = require('../db');
const ObjectId = require('mongodb'). ObjectId;

function getReplies(req, res, next) {
    console.log(`Get replies...`)

/*
const { board } = req.params;
const threadid_ = req.query.thread_id;

getDb.then(async function(db) {
 let thread = await db.collection(board).find(ObjectId(threadid_));
 let replies = thread.replies.map(reply => {
   return ({
     text: reply.text,
     createdon_: reply.createdon_,
     bumpedon_: reply.bumpedon_
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
const { board } = req.params;
const { threadid_, _id } = req.query;

getDb.then(async function(db) {
  let thread = await db.collection(board).find(ObjectId(threadid_));
  if (thread === null) {
  } 
  else {
    let replies = thread.replies.map(element => {

} );

    /*
     filter and map replies: if match, update reported
     db.collection(board).findOneAndUpdate(
     )
    */
  } 
}) 
*/
/*
 I can report a reply and change its reported value to true by sending a PUT request to /api/replies/{board} and pass along the threadid_ & replyid_. (Text response will be 'success')
*/

}

function postReplies(req, res, next) {
    console.log(`POST replies...`)
const { board } = req.params;
const { threadid_, text, deletepassword_} = req.query;
    /*
       I can POST a reply to a thread on a specific board by passing form data text, deletepassword_, & threadid_ to /api/replies/{board} and it will also update the bumped_on date to the comments date.
       (Recommend res.redirect to thread page /b/{board}/{thread_id})
       In the thread's replies array will be saved _id, text, createdon_, deletepassword_, & reported.
    */

  getDb.then(async function(db) {
    let thread = db.collection(board).find(ObjectId(threadid_));
thread.replies.push({
_id: ObjectId()
text: text, 
createdon_: Date(), 
deletepassword_: deletepassword_, 
reported: false
});

//update DB with new replies and bumped
//return

  }) 
/*
Find thread
Push new data into array: password (encrypted), text data, created on, reported
res.redirect to board and thread page
*/
}

function deleteReplies(req, res, next) {
    console.log(`DELETE replies...`)
const { board } = req.params;
const { threadid_, text, deletepassword_} = req.query;

getDb.then(async function(db) {
  let thread = await db.collection(board).find(ObjectId(threadid_);
let replies = thread.replies;
let newReplies = replies.map(element => {

});
  //filter and map thread
  //during mapping, check password (I should implement encryption) 
  //if passwords match, then map empty element
}) 
}

module.exports = { getReplies, putReplies, postReplies, deleteReplies };
