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

        var oneBook = 'John';
        var oneChapter = 3;
        var oneVerse = 16;
        var oneArray = [oneBook, oneChapter, oneVerse];

        var twoBook = 'Jeremiah';
        var twoChapter = 29;
        var twoVerse = 11;
        var twoArray = [twoBook, twoChapter, twoVerse];

        var threeBook = 'Phillippians';
        var threeChapter = 4;
        var threeVerse = 13;
        var threeArray = [threeBook, threeChapter, threeVerse];

        var fourBook = 'Proverbs';
        var fourChapter = 3;
        var fourVerse = 5;
        var fourArray = [fourBook, fourChapter, fourVerse];

        var fiveBook = 'Romans';
        var fiveChapter = 8;
        var fiveVerse = 28;
        var fiveArray = [fiveBook, fiveChapter, fiveVerse];

        var randomArray = [oneArray, twoArray, threeArray, fourArray, fiveArray];

        var randomNumber = Math.floor((Math.random() * 5));

        var book = randomArray[randomNumber][0];
        var chapter = randomArray[randomNumber][1];
        var verse = randomArray[randomNumber][2];

        var url = "http://labs.bible.org/api/?passage=" + book + "+" + chapter + ":" + verse + "&formatting=plain";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); 
        xmlHttp.send(null);

        function callback(response) {
            var text = response;
            text = text.substr(text.indexOf(' ')+1);
            res.json({
                success: true,
                passage: text,
                book: book,
                chapter: chapter,
                verse: verse,
            })
        }

    })

module.exports = router;