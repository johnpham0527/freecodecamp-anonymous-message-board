/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const { getThreads, putThreads, deleteThreads, postThreads } = require('../controllers/threads');
const replies = require('../controllers/replies');

module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .get(getThreads)
    .post(putThreads)
    .put(putThreads)
    .delete(deleteThreads);
    
  app.route('/api/replies/:board')
    .get(replies)
    .post(replies)
    .put(replies)
    .delete(replies);

};