'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 

var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var Chapter = require('../models/chapter');

var MongoClient = require('mongodb').MongoClient;
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

router.route('/getRandom')

    .get(function(req, res) {

        var oneVerse = 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.';
        var twoVerse = 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.';
        var threeVerse = 'I can do all things through him who strengthens me.';
        var fourVerse = 'Trust in the Lord with all your heart,and do not lean on your own understanding.';
        var fiveVerse = 'And we know that for those who love God all things work together for good, for those who are called according to his purpose.';
        
        var randomArray = [oneVerse, twoVerse, threeVerse, fourVerse, fiveVerse];

        var randomNumber = Math.floor((Math.random() * 5));

        var randomVerse = randomArray[randomNumber];

        res.json({
            success: true,
            verse: randomVerse
        })
    })

module.exports = router;