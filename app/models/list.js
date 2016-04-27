'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var listSchema = new mongoose.Schema({
	userId: {type: String, required: true},
	listName: {type: String, required: true},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
	users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	groups:[{type: Schema.Types.ObjectId, ref: 'Group'}],
	pages: [{type: Schema.Types.ObjectId, ref: 'Page'}],
});

var model = mongoose.model('List', listSchema);

module.exports = model;