'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var crypto = require("crypto");

var config = require('../../config/config');

var mongoose = require('mongoose');

var router = express.Router();

var User = require('../models/user');
var Post = require('../models/post');
var Page = require('../models/page');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.route('/credentials/:name')

	.get(function(req, res) {

		// var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
		// var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
		// var S3_BUCKET = process.env.S3_BUCKET;

		var filename = req.params.name;

		//var AWS_ACCESS_KEY = 'AKIAJ5EQSRZWQWJ54IBA';
		//var AWS_SECRET_KEY = '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';
		var AWS_ACCESS_KEY = 'AKIAIKBWCW37Z7Z73XMA';
		var AWS_SECRET_KEY = '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';
		var S3_BUCKET = 'goredsox';

		var policy = {
			"expiration": "2020-01-01T00:00:00Z",
			"conditions": [
		        {"bucket": S3_BUCKET},
		        ["starts-with", "$key", ""],
		        {"acl": "public-read"},
		        ["starts-with", "$Content-Type", ""],
		        ["starts-with", filename, ""],
		        ["content-length-range", 0, 524288000]
			]
		};

		// stringify and encode the policy
		var stringPolicy = JSON.stringify(policy);
		var base64Policy = Buffer(stringPolicy, "utf-8").toString("base64");

		// sign the base64 encoded policy
		var signature = crypto.createHmac("sha1", AWS_SECRET_KEY)
		    .update(new Buffer(base64Policy, "utf-8")).digest("base64");

		// build the results object
		var s3Credentials = {
		    s3Policy: base64Policy,
		    s3Signature: signature
		};

		console.log(s3Credentials);

		res.json({
			success: true,
			credentials: s3Credentials,
		})
	})


module.exports = router;