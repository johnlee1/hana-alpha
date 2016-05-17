'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 
var router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.route('/group')


	// create a group
	// returns group in json with success message
	.post(function(req, res) {

		// TODO

	})


	// updates a group name or group description
	// returns group in json with success message
	.put(function(req, res) {

		// TODO

	})




router.route('/group/:groupId')


	// returns group in json with success message
	.get(function(req, res) {

		// TODO

	})



router.route('/:userId')


	// returns the groups a user is an admin of 
	.get(function(req,res) {
		
		// TODO

	})


module.exports = router;