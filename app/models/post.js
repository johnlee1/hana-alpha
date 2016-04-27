'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'User'},
	postTitle: String,
	postContent: String,
	postSummary: {type: String, required: true},
	postLocation: String, 
	postCreateTime: {type : Date, default: Date.now},
	postExpirationTime: Date,
	postPublic: {type: Boolean, default: true},
	postUrgent: {type: Boolean, default: false},
	postLatitude: Number,
	postLongitude: Number,
});


var model = mongoose.model('Post', postSchema);

module.exports = model;