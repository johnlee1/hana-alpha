'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 

var router = express.Router();

var User = require('../models/user');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var superSecret = 'GoRedSox';


//Register the users with the database by creating the user
router.route('/register')

	.post(function(req,res) {

		var user = new User();
		if(!req.body.username) {
			res.json({
 				success: false,
 				message: 'Username not provided'
 			});
		}
		else if(!req.body.password || !req.body.confirmPassword) {
			res.json({
 				success: false,
 				message: 'Password not provided'
 			});
		}
		else {
			User.find({username: req.body.username}, function(err, userFound) {
				if(userFound.length) {
					res.json({
						success: false,
						message: 'Username already exists'
					})
				}
				else if(req.body.password.localeCompare(req.body.confirmPassword) != 0) {
					res.json({
						success: false,
						message: 'Passwords do not match'
					})
				}
				else {
					//Required fields
					user.username = req.body.username;
					user.password = req.body.password;

					user.save(function(err) {
						if (err) {
							res.send(err);
						}
						else if (!user) {
							res.json({
			 					success: false,
			 					message: 'User cannot be created'
			 				});
			 			}
			 			else {
							var token = jwt.sign({id: user._id}, superSecret, {expiresIn: '2h' });
			 				res.json({
			 					success: true,
								user: user,
			 					token: token
			 				})
						}
					})
				}
			})
		}
 	})

//Log in the user by returning the token if the username and password match
router.route('/login')

	.post(function(req,res) {

		User.findOne({username: req.body.username})
			.select('username password').exec(function(err, user) {
 				if (err) {
 					res.send(err);
 				}
 				else if (!user) {
 					res.json({
 						success: false, 
 						message: 'Username not found.'
 					});
				} 
				else {
					var validPassword = user.comparePassword(req.body.password);
 					if (!validPassword) {
 						res.json({
 							success: false,
 							message: 'Password is incorrect.'
 						});
 					}
 					else {
 						var token = jwt.sign({id: user._id}, superSecret, {expiresIn: '1h' });
 						res.json({
 							success: true,
							message: 'Enjoy your token!',
 							token: token,
 							user: user
 						});
 					}
	
 				}

 		});
 	});


module.exports = router;