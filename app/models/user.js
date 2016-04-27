'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Post = require('../models/post').schema;

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	username: {type: String, required: true, index: {unique: true}},
	displayName: String,
	description: String,
	password: {type: String, required: true, select: false},

	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],

	adminPages: [{type: Schema.Types.ObjectId, ref: 'Page'}],
	memberPages: [{type: Schema.Types.ObjectId, ref: 'Page'}],

	groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],

	followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
	following: [{type: Schema.Types.ObjectId, ref: 'User'}],
	photo: String,
});

//Ensures that the password is hashed
userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

//Compare the passwords based on the hasing
userSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

var model = mongoose.model('User', userSchema);

module.exports = model;