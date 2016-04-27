'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 

var router = express.Router();

var User = require('../models/user');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var superSecret = 'GoRedSox';


//Ensures that all routes afterards have the the correct token
router.use(function(req, res, next) {

  var token = req.body.token || req.params.token || req.headers['x-access-token'];

  //decode token
	if (token) {

    // verifies secret and checks exp
 		jwt.verify(token, superSecret, function(err, decoded) {
 			if (err) {
  				return res.status(403).send({
  				  success: false,
  				  message: 'Failed to authenticate token.'
          });
  		} 
      else {
          // if everything is good, save to request for use in other routes
  		    req.decoded = decoded;
          // make sure we go to the next routes and don't stop here
  				next();
  		}
  	});
  } 

  else {
      // if there is no token return an HTTP response of 403 (access forbidden) and an error message
  		return res.status(403).send({
  		  success: false,
  		  message: 'No token provided.'
  		});
  	}
});


router.route('/me')

  .get(function(req,res) {
    res.send(req.decoded);
  });


module.exports = router;