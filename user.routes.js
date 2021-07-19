/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var userList = require('./list.js');
var userById = require('./user_by_id.js');
var login = require('./login.js');

var express = require('express');
var user_router = express.Router();

user_router.route('/list').get(userList);
user_router.route('/userById').get(userById);
user_router.route('/login').post(login);


module.exports = user_router;