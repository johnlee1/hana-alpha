'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chapterSchema = new mongoose.Schema({
	title: String,
	versesPerChapter: [{type: Number}],
});

var model = mongoose.model('Chapter', chapterSchema);

module.exports = model;

