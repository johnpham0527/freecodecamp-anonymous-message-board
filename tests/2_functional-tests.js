/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
const getDb = require('../db'); //import db in order to set up and test DELETE

chai.use(chaiHttp);

suite('Functional Tests', function() {
  const testBoard = 'general';
  const now = new Date();
  const deletePassword = 'delete123!';

  const testData1 = {
    text: 'Test message',
    delete_password: 'testpassword123!'
  }

  const testData2 = {
    text: 'Test text',
    createdon_: now,
    bumpedon_: now,
    reported: false,
    deletepassword_: deletePassword,
    replies: []
  }

  const testData3 = {
    text: 'Test text 3',
    createdon_: now,
    bumpedon_: now,
    reported: false,
    deletepassword_: deletePassword,
    replies: []
  }

  const testData4 = {
    text: 'Test text 4',
    createdon_: now,
    bumpedon_: now,
    reported: false,
    deletepassword_: deletePassword,
    replies: []
  }

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      /*
      I can POST a thread to a specific message board by passing form data text and deletepassword_ to /api/threads/{board}.
      (Recommend res.redirect to board page /b/{board}) 
      Saved will be at least _id, text, createdon_(date&time), bumpedon_(date&time, starts same as created_on), reported(boolean), deletepassword_, & replies(array).
      */

      test('POST a thread to a specific message board by passing form data text and deletepassword_ to /api/threads{board}', function(done) {
        chai.request(server)
        .post(`/api/threads/${testBoard}`)
        .type('form')
        .send(testData1)
        .end(function(err, res) {
          assert.equal(res.status, 200, 'response status should be 200'); //the page should redirect to /b/{board}, so it's not possible to check the database unless I do integration testing
          //perhaps I can write an integration test that uses Zombie to that the redirect page contains the POSTED content. I'll need to implement GET first, though.
          done();
        })
      })
    });
    
    suite('GET', function() {
      test('GET an array of the most recent 10 bumped threads on the board with only the the most recent 3 replies each from /api/threads{board}', function(done) {
        const testBoard = 'general';

        chai.request(server)
        .get(`/api/threads/${testBoard}`)
        .end(function(err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.isArray(res.body, 'response body should be an array');
          assert.isAtMost(res.body.length, 10, 'response body length should be 10 elements (threads) long at most');
          assert.notProperty(res.body[0], 'reported', 'reported should not be send to the client');
          assert.notProperty(res.body[0], 'deletepassword_', 'deletepassword_ should not be send to the client');
          assert.property(res.body[0], 'text', 'text should be sent to the client');
          assert.property(res.body[0], 'createdon_', 'createdon_ should be sent to the client');
          assert.property(res.body[0], 'bumpedon_', 'bumpedon_ should be a property send to the client');
          assert.property(res.body[0], 'replies', 'replies should be a property sent to the client');
          assert.isAtMost(res.body[0].replies.length, 3, 'replies array length should be 3 elements at the most');
          done();
        })
      })
    });
    
    suite('DELETE', function() {
    /* I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass along the threadid_ & deletepassword_. (Text response will be 'incorrect password' or 'success') */
      let id;

      test('Incorrect password given when attempting to DELETE a thread', function(done) {
        getDb.then(function(db) {
          db.collection(testBoard).insertOne(testData2, function(err, res) {
            if (err) {
              console.log(`Error inserting document: ${err}`);
            }
            id = res.insertedId;

            chai.request(server)
            .delete(`/api/threads/${testBoard}?threadid_=${id}&deletepassword_=wrongpassword`)
            .end(function(err, res) {
              assert.equal(res.status, 200, 'response status should be 200');
              console.log(`res.body is ${JSON.stringify(res.body)}`);
              assert.equal(res.body, 'incorrect password', 'The response text should be incorrect password');
              done();
            })
          })
        })
      })

      test('DELETE an entire thread, given a threadid_ and deletepassword_, passed to /api/threads', function(done) {
        chai.request(server)
        .delete(`/api/threads/${testBoard}?threadid_=${id}&deletepassword_=${deletePassword}`)
        .end(function(err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          console.log(`res.body is ${JSON.stringify(res.body)}`);
          assert.equal(res.body, 'success', 'The response text should be success');
          done();
        })
      })
    });
    
    suite('PUT', function() {
      /* I can report a thread and change its reported value to true by sending a PUT request to /api/threads/{board} and pass along the threadid_. (Text response will be 'success') */
      let id;

      test('PUT report status to true, given a threadid_, passed to /api/threads/{board}', function(done) {
        getDb.then(function(db) {
          db.collection(testBoard).insertOne(testData3, function(err, res) {
            if (err) {
              console.log(`Error inserting document: ${err}`);
            }
            id = res.insertedId;

            chai.request(server)
            .put(`/api/threads/${testBoard}?threadid_=${id}`)
            .end(function(err, res) {
              assert.equal(res.status, 200, 'response status should be 200');
              assert.equal(res.body, 'success', 'The response text should be success');
              done();
            })
          })
        })
      })
    });
  });
  
  // suite('API ROUTING FOR /api/replies/:board', function() {
  //   let id; //use this id for POST, GET, PUT, and DELETE

  //   const testComment = {
  //     text: 'Test comment',
  //     deletepassword_: 'Test password',
  //     threadid_: ''
  //   };

  //   suite('POST', function() {  
  //     test(`POST a reply to a thread on a specific board, passing form data text, deletepassword_ and threadid_, to /api/replies/{board}. The bumped_on date is updated to the comment's date`, function(done) {

  //       getDb.then(function(db) {
  //         db.collection(testBoard).insertOne(testData4, function(err, res) {
  //           if (err) {
  //             console.log(`Error inserting document: ${err}`);
  //           }
  //           testComment.threadid_ = res.insertedId;

  //           chai.request(server)
  //           .post(`/api/replies/${testBoard}`)
  //           .send(testComment) 
  //           .end(function(err, res) {
  //             assert.equal(res.status, 200, 'response status should be 200'); //the page should redirect to /b/{board}/{thread_id}, so it's not possible to check the database unless I do integration testing
  //           })
  //         })
  //       })
  //       //done();
  //     });

  //     /*
  //      I can POST a reply to a thread on a specific board by passing form data text, deletepassword_, & threadid_ to /api/replies/{board} and it will also update the bumped_on date to the comments date.
  //      (Recommend res.redirect to thread page /b/{board}/{thread_id})
  //      In the thread's replies array will be saved _id, text, createdon_, deletepassword_, & reported.
  //     */
  //   });
    
  //   suite('GET', function() {
  //     test('GET an entire thread with all replies from /api/replies/{board}?thread_id={thread_id}. Hidden are deletepassword_ and reported.', function(done) {
        
  //       chai.request(server)
  //       .get(`/api/replies/${testBoard}/${testComment.threadid_}`)
  //       .end(function(err, res) {
  //         assert.equal(res.status, 200, 'response status should be 200');
  //         assert.property(res.body[0], 'text', 'One of the replies should have a text property');
  //         assert.property(res.body[0], '_id', 'The reply should have its own id');
  //         assert.property(res.body[0], 'createdon_', 'The reply should have the createdon_ date property');
  //       })
  //       done();
  //     })
  //     /*
  //     I can GET an entire thread with all its replies from /api/replies/{board}?thread_id={thread_id}. Also hiding the same fields the client should be see.
  //     */
  //   });
    
  //   suite('PUT', function() {
  //     test(`PUT to change a comment's reported reply to true to /api/replies/{board}, passing along threadid_ & replyid_. Response is 'success'`, function(done) {
  //       chai.request(server)
  //       //.put(`/api/replies/${testBoard}?threadid_=${testComment.threadid_}&_id=${testComment.replies[0]._id}`)
  //       //done();
  //    }) 
  //     /*
  //     I can report a reply and change its reported value to true by sending a PUT request to /api/replies/{board} and pass along the threadid_ & replyid_. (Text response will be 'success')
  //     */
  //   });
    
  //   suite('DELETE', function() {
  //     test('DELETE by changing text to "[deleted]", passing along threadid_, replyid_, and deletepassword_ to /api/replies/{board}. Response is "incorrect password" or "success"', function(done) {
  //       //done();
  //   }) 

  //     /*
  //     I can delete a post(just changing the text to '[deleted]' instead of removing completely like a thread) if I send a DELETE request to /api/replies/{board} and pass along the threadid_, replyid_, & deletepassword_. (Text response will be 'incorrect password' or 'success')
  //     */
  //   });
    
  // });

});
