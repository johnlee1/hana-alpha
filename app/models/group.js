'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = require('../models/post').schema;


var groupSchema = new mongoose.Schema({
	groupName: {type: String, required: true},
	groupDescription: String,
	admins: [{type: Schema.Types.ObjectId, ref: 'User'}],
	members: [{type: Schema.Types.ObjectId, ref: 'User'}],
	posts: [Post],
});

var model = mongoose.model('Group', groupSchema);

module.exports = model;

