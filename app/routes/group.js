'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 
var postFunction = require('../helper/post')

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId; 

var User = require('../models/user');
var Post = require('../models/post');
var Group = require('../models/group');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.route('/write')

	// create a group
	.post(function(req, res) {
		
		var group = Group();

		group.admins.push(req.body.userId); 
		group.members.push(req.body.userId);
		group.groupName = req.body.groupName;
		
		group.save(function(err) {
			if(err) res.send(err);
			else if(!group) { 
				res.json({
 					success: false,
 					message: 'Group cannot be created'
 				});
 			}
 			else {
 				User.findById(req.body.userId, function(err, user) {
					if(err) res.send(err);
					else {
						user.groups.push(group._id);
						user.save();
 						res.json({
 							success: true,
 							group: group
 						});
					}
				})

 			}
		})


	})

	//update group with the groupID passed into the body. Needs groupId
	.put(function(req, res) {

		Group.findById(req.body.groupId, function(err, group) {

	 		if(err) res.send(err);
	 		if(!group) {
	 			res.send({
	 				success: false,
	 				message: 'Group not found'
	 			})
	 		}
	 		if(req.body.groupName) {
	 			group.groupName = req.body.groupName;
			}

			group.save(function(err) {
	 			if (err) {
	 				res.send(err);
				}
	 			res.json(group);
	 		});
	 	});
	})

	//Deletes a group. Needs groupId
	.delete(function(req, res) {
		Group.remove({
			_id : req.body.groupId
		}, function(err, group) {
			if(err) return res.send(err);
			return res.json({message: 'Successfully deleted'});
		})
	})


router.route('/post')

	//create post and add the post to group. Needs groupId
	.post(function(req, res) {

		postFunction.createPost(req, function(result) {
			if(!result.success) {
				res.json({
					success: false,
					message: result.message
				})
			}
			else {
				Group.findById(req.body.groupId, function(err, group) {
					if(err) {
						res.json({
							success: false,
							message: err
						})
					}
					if(!group) {
						res.json({
							success: false,
							message: 'Group not found'
						})
					}
					group.posts.push(result.post._id);
					group.save();
					res.json({
						success: true,
						group: group
					})
				})

			}
		});

	})

	//Updates the post with any info that is different. Needs postId and groupId
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

	//Deletes a post in the group. Needs the groupId and groupId
	.delete(function(req, res) {

		postFunction.deletePost(req, function(result) {

			if(!result.success) {
				res.json({
					success: false
				})
			}
			else {
				Group.findById(req.body.groupId, function(err, group) {
					if(err) {
						res.json({
							success: false,
							error: err
						})
					}
					if(!group) {
						res.json({
							success: false,
							message: 'Group not found'
						})
					}
					var index = group.posts.indexOf(req.body.postId);
					if(index != -1) {
						group.posts.splice(index, 1);
						group.save();	
					}
					res.json({
						success: true,
						group: group
					})
				})
			}
		})
	})


router.route('/getPost/:groupId/:month/:year')
	//Gets the posts based on the month and year (note taht month is indexed fmor 0 - 11)
	.get(function(req,res) {
		Group.findById(req.params.groupId, function(err, group) {
			if(err) res.send(err);
			var start = new Date(req.params.year, req.params.month, 1);
			var end = new Date(req.params.year, req.params.month, 31);
			var posts = [];
			postFunction.getPostsInInterval(req, start, end, function(result) {
				if(!result.success) {
					res.json({
						success: false,
						message: result.message
					})
				}
				else {
					res.json({
						success: true,
						posts: result.posts
					})
				}		
			})
		})
	})


router.route('/getMembers/:groupId')

	//Gets the members in the group
	.get(function(req, res) {
		Group.findById(req.params.groupId, function(err, group) {
			if(err) res.send(err);
			var members = group.members;
			var length = members.length;
			var users = new Array();
			for(var i = 0; i < members.length; i++) {
				var member = members[i];
				User.findById(member, function(err, user) {
					if(err) res.send(err);
					users.push(user);
					callback(users, length)
				})
			}

			function callback(users, length) {
				if(users.length == length) {
					res.json(users);
				}
			}
		})

	})


router.route('/:userId')

	//Gets the groups a user is an admin of with the userId passed in
	.get(function(req,res) {
		Group.find({admin: new ObjectId(req.params.userId)}, function(err, groups) {
			if(err) res.send(err);
			else res.json(groups);
		});
	})


router.route('/read/:groupId') 
	
	.get(function(req,res) {
		Group.findById(req.params.groupId, function(err, group) {
			if(err) res.send(err);
			else res.json(group);
		});
	})

module.exports = router;