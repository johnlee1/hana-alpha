'use strict';

var Post = require('../models/post');
var ObjectId = require('mongodb').ObjectID;

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function createPost(req, cb) {

	var post = Post();

	if(!req.body.userId) {
		cb({
			success: false,
			message: 'UserId required'
		});
		return;
	}
	else if(!req.body.postSummary) {
		cb({
			success: false,
			message: 'Post summary required'
		});
		return;
	}
	else if(!req.body.postTitle) {
		cb({
			success: false,
			message: 'Post title required'
		})
		return;
	}
	else {

		post.userId = req.body.userId;
		post.postTitle = req.body.postTitle;
		post.postSummary = req.body.postSummary;
		post.postPublic = req.body.isPublic;
		post.postUrgent = req.body.urgent;

		if(req.body.postContent) {
			post.postContent = req.body.postContent;
		} 
		if(req.body.postTime) {
			post.postTime = req.body.postTime;
		}
		if(req.body.expirationTime) {
			post.expirationTime = req.body.expirationTime;
		}

		if(req.body.postLocation) {

			post.postLocation = req.body.postLocation;

			var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + post.postLocation +
				"&key=AIzaSyAz6XLQljXy2WsYuMaltRTQizAJPRPljP0";

			var xmlHttp = new XMLHttpRequest();
			var shouldBreak = false;


			xmlHttp.open("GET", url, true); 
			xmlHttp.send(null);

			xmlHttp.onreadystatechange = function() { 
				if(xmlHttp.readyState == 4) {
					if(xmlHttp.status == 200) {
						callback(xmlHttp.responseText);
					}
					else {
						callbackError();
					}
				}
			}

			function callback(response) {
				var loc = JSON.parse(response);
				if(!loc) {
					cb({
						success: false,
						post: post
					})
					return;
				}
				else if(loc.results == 0) {
					cb({
						success: false,
						message: 'Location not found'
					})
					return;
				}
				else {
					post.postLatitude = loc.results[0].geometry.location.lat;
					post.postLongitude = loc.results[0].geometry.location.lng;

					post.save(function(err) {
						if(err) {
							cb({
								success: false,
								err: err
							})
							return;
						}
						else if(!post) {
							cb({
								success: false,
								message: 'Post cannot be created'
							})
							return;
						}
						else {
							cb({
								success: true,
								post: post
							})
							return;
						}
					})
				}
			}

			function callbackError() {
				cb({
					success: false,
					message: 'Location not valid'
				})
				return;
			}
		}

		else {
			post.save(function(err) {
				if(err) {
					cb({
						success: false,
						err: err
					})
					return;
				}
				else if(!post) {
					cb({
						success: false,
						message: 'Post cannot be created'
					})
					return;
				}
				else {
					cb({
						success: true,
						post: post
					})
					return;
				}
			});
		}		
	}
};

function editPost(req, cb) {
	Post.findById(req.body.postId, function(err, post) {
		if(err) {
			cb({
				success: false,
				error: err
			})
			return;
		}
		else if(!post) {
			cb({
				success: false,
				message: 'Post not found'
			})
			return;
		}
		else {
			if(req.body.postTitle) {
				post.postTitle = req.body.postTitle;
			}
			if(req.body.postContent) {
				post.postContent = req.body.postContent;
			}
			if(req.body.postSummary) {
				post.postSummary = req.body.postSummary;
			}
			if(req.body.postLocation) {
				post.postLocation = req.body.postLocation;
			}
			if(req.body.expirationTime) {
				post.expirationTime = req.body.expirationTime;
			}
			if(req.body.postPublic) {
				post.postPublic = req.body.postPublic;
			}
			if(req.body.postUrgent) {
				post.postUrgent = req.body.postUrgent;
			}
			post.save(function(err) {
				if(err) {
					cb({
						error: err
					})
					return;
				}
				else {
					cb({
						success: true,
						post: post
					})
					return;
				}
			})
		}
	}); 
};

function getPost(req, cb) {
	Post.findById(req.params.postId, function(err, post) {
		if(err) {
			cb({
				success: false,
				error: err
			})
			return;
		}
		else if(!post) {
			cb({
				success: false,
				message: 'Post not found'
			})
			return;
		}
		else {
			cb({
				success: true,
				post: post
			})
			return;
		}
	});
};

function deletePost(req, cb) {
	Post.remove({_id: req.body.postId}, function(err, post) {
		if(err) {
			cb({
				success: false,
				err: error
			});
			return;
		}
		else if(!post) {
			cb({
				success: false,
				messgae: 'Post not found'
			})
		}
		else {
			cb({
				success: true,
				message: 'Post deleted'
			});
		}
	});
};

module.exports = {
	createPost, editPost, getPost, deletePost
};
