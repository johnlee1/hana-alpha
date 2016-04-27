'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId; 

var User = require('./../models/user');
var Post = require('../models/post');
var Page = require('../models/page');
var List = require('../models/list');
var Group = require('../models/group');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.route('/write')

	.post(function(req,res) {

		var list = new List();

		if(!req.body.userId) {
			res.json({
				success: false,
				message: 'userId not provided'
			})
		}

		if(!req.body.listName) {
			res.json({
				succes: false,
				message: 'listName not provided'
			})
		}

		list.userId = req.body.userId;
		list.listName = req.body.listName;

		list.save(function(err) {
			if(err) res.send(err)
			else if(!list) {
				res.json({
					success: false,
					message: 'List cannot be created'
				})
			}
			else {
				res.json({
					succes: true,
					list: list
				})
			}
		})

	})

	.put(function(req, res) {

		List.findById(req.body.listId, function(err, list) {
			if(err) res.send(err);
			if(req.body.listName) {
				list.listName = req.body.listName;
			}

			list.save(function(err) {
				if(err) res.send(err);
				else res.json({
					success: true,
					list: list
				})
			})
		})
	})

router.route('/page') 

	.post(function(req, res) {

		List.findById(req.body.listId, function(err, list) {
			if(err) res.send(err);

			list.pages.push(req.body.pageId);
			console.log(req.body.pageId);
			list.save(function(err) {
				if(err) res.send(err);
				else res.json({
					success: true,
					list: list
				})
			})
		})
	})

	.delete(function(req, res) {

		List.findById(req.body.listId, function(err, list) {
			if(err) res.send(err);

			var index = list.pages.indexOf(new ObjectId(req.body.pageId));
			if(index != -1) {
				list.pages.splice(index, 1);
				list.save();	
			}
			res.json({
				success: true,
				list: list
			})		
		})
	})

router.route('/group') 

	.post(function(req, res) {

		List.findById(req.body.listId, function(err, list) {
			if(err) res.send(err);

			list.groups.push(req.body.groupId);
			list.save(function(err) {
				if(err) res.send(err);
				else res.json({
					success: true,
					list: list
				})
			})
		})
	})

	.delete(function(req, res) {

		List.findById(req.body.listId, function(err, list) {
			if(err) res.send(err);

			var index = list.groups.indexOf(new ObjectId(req.body.groupId));
			if(index != -1) {
				list.groups.splice(index, 1);
				list.save();	
			}
			res.json({
				success: true,
				list: list
			})		
		})
	})

router.route('/user') 

	.post(function(req, res) {

		List.findById(req.body.listId, function(err, list) {
			if(err) res.send(err);

			list.users.push(req.body.userId);
			list.save(function(err) {
				if(err) res.send(err);
				else res.json({
					success: true,
					list: list
				})
			})
		})
	})

	.delete(function(req, res) {

		List.findById(req.body.listId, function(err, list) {
			if(err) res.send(err);

			var index = list.users.indexOf(new ObjectId(req.body.userId));
			if(index != -1) {
				list.users.splice(index, 1);
				list.save();	
			}
			res.json({
				success: true,
				list: list
			})		
		})
	})

router.route('/post') 

	.post(function(req, res) {

		List.findById(req.body.listId, function(err, list) {
			if(err) res.send(err);

			list.posts.push(req.body.postId);
			list.save(function(err) {
				if(err) res.send(err);
				else res.json({
					success: true,
					list: list
				})
			})
		})
	})

	.delete(function(req, res) {

		List.findById(req.body.listId, function(err, list) {
			if(err) res.send(err);

			var index = list.posts.indexOf(new ObjectId(req.body.postId));
			if(index != -1) {
				list.posts.splice(index, 1);
				list.save();	
			}
			res.json({
				success: true,
				list: list
			})		
		})
	})

router.route('/user/:userId') 

	.get(function(req, res) {

		List.find({userId: req.params.userId}, function(err, lists) {
			if(err) res.send(err);
			else {
				res.json({
					success: true, 
					lists: lists
				})
			}
		})
	})


module.exports = router;