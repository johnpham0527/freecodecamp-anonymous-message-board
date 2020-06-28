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

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      const testBoard = 'general';
      const testData = {
        text: 'Test message',
        delete_password: 'testpassword123!'
      }

      test('POST a thread to a specific message board by passing form data text and deletepassword_ to /api/threads{board}', function(done) {
        chai.request(server)
        .post(`/api/threads/${testBoard}`)
        .type('form')
        .send(testData)
        .end(function(err, res) {
          assert.equal(res.status, 302, 'response status should be 302');
          expect(res).to.redirectTo(`/b/${testBoard}`, `response should redirect to /b/${testBoard}`);
          //to implement: expect(res).to.redirectTo('/b/${testBoard}). That page will then GET the new thread

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
      /*
      I can GET an array of the most recent 10 bumped threads on the board with only the most recent 3 replies each from /api/threads/{board}.
      
      The reported and deletepasswords_ fields will not be sent to the client.
      */

    });
    
    suite('DELETE', function() {
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