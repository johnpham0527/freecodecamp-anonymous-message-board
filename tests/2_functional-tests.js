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
const Browser = require('zombie');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {

    const testBoard = 'general';
    const testData = {
      text: 'Test message',
      delete_password: 'testpassword123!'
    }
    
    suite('POST', function() {
      test('POST a thread to a specific message board by passing form data text and deletepassword_ to /api/threads{board}', function(done) {
        chai.request(server)
        .post(`/api/threads/${testBoard}`)
        .type('form')
        .send(testData)
        .end(function(err, res) {
          assert.equal(res.status, 200, 'response status should be 200'); //the page should redirect to /b/{board}, so it's not possible to check the database unless I do integration testing
          //perhaps I can write an integration test that uses Zombie to that the redirect page contains the POSTED content. I'll need to implement GET first, though.
          done();
        })
      })
      /*
      I can POST a thread to a specific message board by passing form data text and deletepassword_ to /api/threads/{board}.
      (Recommend res.redirect to board page /b/{board}) 
      Saved will be at least _id, text, createdon_(date&time), bumpedon_(date&time, starts same as created_on), reported(boolean), deletepassword_, & replies(array).
      */

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
      test('DELETE an entire thread, given a threadid_ and deletepassword_, passed to /api/threads', function(done) {


      })
      /*
      I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass along the threadid_ & deletepassword_. (Text response will be 'incorrect password' or 'success')
      */

    });
    
    suite('PUT', function() {
      /*
      I can report a thread and change its reported value to true by sending a PUT request to /api/threads/{board} and pass along the threadid_. (Text response will be 'success')
      */

    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      /*
       I can POST a reply to a thread on a specific board by passing form data text, deletepassword_, & threadid_ to /api/replies/{board} and it will also update the bumped_on date to the comments date.
       
       (Recommend res.redirect to thread page /b/{board}/{thread_id})
       
       In the thread's replies array will be saved _id, text, createdon_, deletepassword_, & reported.
      */
    });
    
    suite('GET', function() {
      /*
      I can GET an entire thread with all its replies from /api/replies/{board}?thread_id={thread_id}. Also hiding the same fields the client should be see.
      */
    });
    
    suite('PUT', function() {
      /*
      I can report a reply and change its reported value to true by sending a PUT request to /api/replies/{board} and pass along the threadid_ & replyid_. (Text response will be 'success')
      */
    });
    
    suite('DELETE', function() {
      /*
      I can delete a post(just changing the text to '[deleted]' instead of removing completely like a thread) if I send a DELETE request to /api/replies/{board} and pass along the threadid_, replyid_, & deletepassword_. (Text response will be 'incorrect password' or 'success')
      */
    });
    
  });

});