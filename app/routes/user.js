'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var postFunction = require('../helper/post');
var ObjectId = require('mongodb').ObjectID;

var config = require('../../config/config');

var mongoose = require('mongoose');

var router = express.Router();

var User = require('../models/user');
var Post = require('../models/post');
var Page = require('../models/page');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.route('/user/:userId')

	// get the user with username
	.get(function(req,res) {
		if (!req.params.userId) {
			res.json({
				success: false,
				message: 'User id required'
			})
		}
		else {
			User.findById(req.params.userId, function(err, user) {
				if(err) {
					res.send(err);
				}
				else if(!user) {
					res.json({
						success: false,
						message: 'User not found'
					})
				}
				else {
					res.json(user);
				}
			})
		}

	})

	//updates the username with any info that is different
	.put(function(req, res) {
		User.findById(req.params.userId, function(err, user) {
	 		if(err) {
	 			res.send(err);
	 		}
	 		else if(!user) {
	 			res.json({
	 				success: false,
	 				message: 'User not found'
	 			})
	 		}
	 		else {
	 			if(req.body.displayName) {
	 				user.displayName = req.body.displayName;
	 			}
				if(req.body.description) {
					user.description = req.body.description;
				}
				user.save(function(err) {
	 				if (err) res.send(err);
	 				else res.json({
	 					success: true,
	 					user: user
	 				});
	 			});
	 		}

	 	});
	})

	.delete(function(req, res) {
		User.remove({_id : req.params.userId}, function(err, user) {
			if(err) {
				res.send(err);
			}
			else if(!user) {
				res.json({
					success: false,
					message: 'User not found'
				});
			}
			else {
				res.json({
					success: true,
					message: 'Successfully deleted'
				});
			}
		})
	})


router.route('/search/:query/:userId')
	
	//searches the users who have displayname matching the query
	.get(function(req,res) {
		if(!req.params.userId) {
			res.json({
				success: false,
				message: 'Userid not passed in'
			})
		}
		else if(!req.params.query) {
			res.json({
				success: false,
				message: 'Query not passed in'
			})
		}
		else {
			User.find({$and: [{_id: {$ne: req.params.userId}}, {displayName: new RegExp(req.params.query,'i')}]}, function(err, users) {
		 		if(err) {
		 			res.send(err);
		 		}
		 		else {
		 			res.json({
		 				success: true,
		 				users: users
		 			})
		 		}
			})			
		}

	})


router.route('/post')

	//Creates a post for the current user logged in
	.post(function(req, res){
		postFunction.createPost(req, function(result) {
			if (!result.success) {
				res.json({
					success: false,
					message: result.message
				})
			}
			else {
				User.findById(req.body.userId, function(err, user) {
					if(err) {
						res.json({
							success: false,
							error: err
						})
					}
					else if(!user) {
						res.json({
							success: false,
							message: 'User cannot be found'
						})
					}
					else {
						user.posts.push(result.post._id);
						user.save();
						res.json({
							success: true,
							post: result.post
						})
					}

				})

			}
		});
	})

	//Updates post
	.put(function(req, res) {
		postFunction.editPost(req, function(result) {
			if(!result.success) {
				res.json({
					success: false,
					message: result.message
				})
			}
			else {
				res.json({
					success: true,
					post: result.post
				})
			}
		})
		
	})

	//Deletes post (front end implemented)
	.delete(function(req, res) {
		postFunction.deletePost(req, function(result) {
			if(!result.success) {
				res.json({
					success: false,
					message: result.message
				})
			}
			else {
				res.json({
					success: true,
					user: user
				})
			}
		})
	})


router.route('/follow')

	// follower is following followed
	.post(function(req, res) {
		User.findById(req.body.followerId, function(err, follower) {
			if(err) {
				res.send(err);
			}
			else if(!follower) {
				res.json({
					success: false,
					message: 'Follower cannot be found'
				})
			}
			else {
				follower.following.push(req.body.followedId)
				follower.save();
				res.json({
					success: true,
					follower: follower
				})
			}
		})
	})


router.route('/unfollow')

	//Follower is no longer following follower
	.post(function(req, res) {

		User.findById(req.body.followerId, function(err, follower) {
			if(err) {
				res.send(err);
			}
			else if(!follower) {
				res.json({
					success: false,
					message: 'Follower cannot be found'
				})
			}
			else {
				var followedIndex = follower.following.indexOf(req.body.followedId);
				if(followedIndex > -1) {
					follower.following.splice(followedIndex, 1);
				}
				follower.save();

				res.json({
					success: true,
					follower: follower
				})
			}
		})
	})


// determines if follower is following followed
router.route('/follow/:followerId/:followedId') 

	.get(function(req, res) {
		User.findById(req.params.followerId, function(err, follower) {
			if(err) {
				res.send(err);
			}
			else if(!follower) {
				res.json({
					success: false,
					message: 'UserFollowing cannot be found'
				})
			}
			else {
				var index = follower.following.indexOf(req.params.followedId)
				if(index > -1) {
					res.json({
						success: true,
						isTrue: true,
					})
				}
				else {
					res.json({
						success: true,
						isTrue: false,
					})
				}
			}
		})
	})


router.route('/followingUsers/:follower')

	//Returns the users follower is following
	.get(function(req, res) {
		User.findById(req.params.follower, function(err, follower) {
			if(err) {
				res.send(err);
			}
			else if(!follower) {
				res.json({
					success: false,
					message: 'User not found',
				})
			}
			else {
				var followerFollowing = follower.following;
				User.find({_id: {$in: followerFollowing}}, function(err, usersFollowerFalling) {
					res.json({
						success: true,
						following: usersFollowerFalling
					})
				})
			}
		})
	})


router.route('/followingIds/:follower')

	//Returns the userId the follower is following
	.get(function(req, res) {
		User.findById(req.params.follower, function(err, followerFollowing) {
			if(err) {
				res.send(err);
			}
			else if(!followerFollowing) {
				res.json({
					success: false,
					message: 'User not found',
				})
			}
			else {
				res.json({
					success: true,
					following: followerFollowing.following
				});
			}
		})
	})


router.route('/urgentPosts/:userId')

	//Returns the urgent prayer requests for everyone the user is following
	.get(function(req, res) {

		User.findById(req.params.userId, function(err, user) {
			if(err) {
				res.send(err);
			}
			else if(!user) {
				res.json({
					success: false,
					message: "User not found",
				})
			}
			else {
				var prayerRequests = [];
				var counterPostsAdded = 0;

				Post.find({$and: [{userId: {$in: user.following}}, {postUrgent: true}]}, function(err, postsUserFollowing) {
					if(err) {
						res.send(err);
					}
					else if(postsUserFollowing.length == 0) {
						res.json({
							success: true,
							prayerRequests: prayerRequests
						})
					}
					else {
						for(var i = 0; i < postsUserFollowing.length; i++) {
							var currentPostUserFollowing = postsUserFollowing[i];

							User.findById(currentPostUserFollowing.userId, function(err, user) {

								counterPostsAdded++;
								var postAndDisplayName = {"post": currentPostUserFollowing, "displayName": user.displayName};
								prayerRequests.push(postAndDisplayName);

								if(counterPostsAdded == postsUserFollowing.length) {
									res.json({
										success: true,
										prayerRequest: prayerRequests
									})
								}
							})
						}	
					}

				})
			}
		})
	})


//Returns the public and urgent posts for a user
router.route('/publicPosts/:userId')

	.get(function(req, res) {
		User.findById(req.params.userId, function(err, user) {
			if(err) {
				res.send(err);
			}
			else if(!user) {
				res.json({
					success: false
				})
			}
			else {
				var publicPosts = user.posts;
				Post.find({$and: [{_id: {$in: publicPosts}}, {$or: [{postUrgent: true}, {postPublic: true}]}]}, function(err, posts) {
					if(err) {
						res.send(err);
					}
					else if(!posts) {
						res.send({
							success: false,
							message: 'Posts not found'
						})
					}
					else {
						res.json({
							success: true,
							posts: posts.reverse()
						})
					}
				})
			}
		})
	})


//Returns all posts for a user
router.route('/allPosts/:userId')

	// get all posts
	.get(function(req,res) {
		User.findById(req.params.userId, function(err, user) {
			if(err) {
				res.send(err);
			}
			else if(!user) {
				res.json({
					success: false,
					message: 'User not found'
				})
			}
			else {
				Post.find({_id: {$in: user.posts}}, function(err, posts) {
					if(err) {
						res.send(err);
					}
					else if(!posts) {
						res.json({
							success: true,
							message: 'Posts not found'
						})
					}
					else {
						res.json({
							successs: true,
							posts: posts.reverse()
						})						
					}
				})

			}
		})
	})


router.route('/getlocations/:userId')

	.get(function(req,res) {
		Post.find({"userId": req.params.userId}, function(err, posts) {
			if(err) {
				res.send(err);
			}
			else if(!posts) {
				res.json({
					success: true,
					message: "No posts found for user",
				})
			}
			else {
				var locations = [];

				for(var i = 0; i < posts.length; i++) {
					var post = posts[i];
					if(post.postLatitude && post.postLongitude) {
						var cor = {"postLatitude": post.postLatitude, "postLongitude": post.postLongitude};
						var obj = {"cor": cor, "post": post};
						locations.push(obj);
					}
				}
				res.json({
					success: true,
					locations: locations,
				})
			}


		})
	})

router.route('/photo')

	.post(function(req, res) {

		var file = req.files.file;
		var fields = req.body;

		if (!file) {return imagePaths;}
	    var name = file.name;
	    var filepath = config.imageUploadPath + 'profile/' + fields.userId;
	    var destPath = filepath + '/' + name;
	    var imagePath = "/user/photo/image?imgPath=" + destPath;
	    fs.exists(filepath, (exists) => {
		    mkdirp(filepath, function (err) {
		        if (err) console.error(err)
		        var is = fs.createReadStream(file.path);
		        var os = fs.createWriteStream(destPath);
		        is.pipe(os);
		        var imgPath = path.join(__dirname, '../../', destPath); 
		        User.findById(fields.userId, function(err, user) {
					if(err) res.send(err);
					if(!user) {
						res.json({
							success: false,
							message: 'User not found'
						})
					}
					else {
						user.photo = imgPath;
						user.save(function(err) {
				 			if (err) res.send(err);
				 			else {
				 				res.sendFile(imgPath);
				 			};
				 		});
					}
				});
		    });
	    });
	})


router.route('/photo/:userId')

	.get(function(req, res) {

		User.findById(req.params.userId, function(err, user) {
			if(err) res.send(err);
			if(!user) {
				res.json({
					success: false,
					message: 'User not found'
				})
			}
			else {
				if (user.photo) {
					var imgPath = user.photo;
					res.sendFile(imgPath);
				}
				else {
					res.json({
						success: true,
						message: 'No photo exists'
					})
				}
			};
		});
	})

module.exports = router;