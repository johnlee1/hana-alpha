'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = require('../models/post').schema;

var pageSchema = new mongoose.Schema({
	admins: [{type: Schema.Types.ObjectId, ref: 'User'}],
	pageName: {type: String, required: true},
	pageDescription: {type: String, required: true},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
	followers: {type: Number, default: 0},
	photo: String,
});

var model = mongoose.model('Page', pageSchema);

module.exports = model;