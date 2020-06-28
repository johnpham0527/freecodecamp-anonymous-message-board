/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const threads = require('../controllers/threads');
const replies = require('../controllers/replies');

module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .get(threads)
    .post(threads)
    .put(threads)
    .delete(threads);
    
  app.route('/api/replies/:board')
    .get(replies)
    .post(replies)
    .put(replies)
    .delete(replies);

};