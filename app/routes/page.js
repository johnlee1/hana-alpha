'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var postFunction = require('../helper/post');

var config = require('../../config/config');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId; 

var Page = require('../models/page');
var User = require('../models/user');
var Post = require('../models/post');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.route('/page')

	// create a page
	.post(function(req, res) {
		if(!req.body.userId) {
			res.json({
				success: false,
				message: 'UserId required'
			})
		}
		else if(!req.body.pageName) {
			res.json({
				success: false,
				message: 'Page Name required'
			})
		}
		else if(!req.body.pageDescription) {
			res.json({
				success: false,
				message: 'Page Description required'
			})
		}
		else {
			var page = Page();
			page.admins.push(req.body.userId); 
			page.pageName = req.body.pageName;
			page.pageDescription = req.body.pageDescription;
			
			page.save(function(err) {
				if(err) {
					res.send(err);
				}
				else if(!page) { 
					res.json({
	 					success: false,
	 					message: 'Page cannot be created'
	 				});
	 			}
	 			else {
	 				User.findById(req.body.userId, function(err, user) {
						if(err) {
							res.send(err);
						}
						if(!user) {
							res.json({
								success: false,
								message: "User not found"
							})
						}
						else {
							user.adminPages.push(page._id);
							user.save();
	 						res.json({
	 							success: true,
	 							page: page
	 						});
						}
					})
	 			}
			})
		}
	})


router.route('/:pageId')

	//get a page
	.get(function(req,res) {
		if(!req.params.pageId) {
			res.json({
				success: false,
				message: 'Page Id required'
			})
		}
		else {
			Page.findById(req.params.pageId, function(err, page) {
				if(err) {
					res.send(err);
				}
				else if(!page) {
					res.json({
						success: false,
						message: 'Page does not exist'
					})
				}
				else {
					res.json({
						success: true,
						page: page
					});
				}
			})		
		}

	})

	// update a page 
	.put(function(req, res) {
		if(!req.params.pageId) {
			req.json({
				success: false,
				message: 'Page Id required'
			})
		}
		else{
			Page.findById(req.params.pageId, function(err, page) {
		 		if(err) {
		 			res.send(err);
		 		}
		 		else if(!page) {
		 			res.json({
		 				success: false,
		 				message: 'Page does not exist'
		 			})
		 		}
		 		else {
		 			if(req.body.pageName) {
		 				page.pageName = req.body.pageName;
					}
					if(req.body.pageDescription) {
						page.pageDescription = req.body.pageDescription;
					}
					page.save(function(err) {
		 				if (err) {
		 					res.send(err);
						}
						else {
							res.json({
								success: true,
								page: page
							})
						}
		 			})
		 		}
		 	})
		}

	})

	// delete a page
	.delete(function(req, res) {
		Page.remove({_id : req.body.pageId}, function(err, page) {
			if(err) {
				res.send(err);
			}
			else if(!page) {
				res.json({
					success: false,
					message: 'Page does not exist'
				})
			}
			else {
				res.json({
					success: true,
					message: 'Successfully deleted'
				})
			}

		})
	})

router.route('/search/:query')

	//Search for pages that contain the search string above
	.get(function(req,res) {
		if(!req.params.query) {
			res.json({
				success: false,
				message: 'Query string required'
			})
		}
		else {
			Page.find({pageName: new RegExp(req.params.query,'i') }, function(err, pages) {
		 		if(err) {
		 			res.send(err);
		 		}
		 		else {
		 			res.json({
		 				success: true,
		 				pages: pages
		 			})
		 		}
			})			
		}

	})

router.route('/post')

	//create post and add the post to page. Needs pageId
	.post(function(req, res) {
		if(!req.body.pageId) {
			res.json({
				success: false,
				message: 'Page id required'
			})
		}
		else {
			postFunction.createPost(req, function(result) {
				if(!result.success) {
					res.json({
						success: false,
						message: result.message
					})
				}
				else {
					Page.findById(req.body.pageId, function(err, page) {
						if(err) {
							res.json({
								success: false,
								error: err
							})
						}
						else if(!page) {
							res.json({
								success: false,
								message: 'Page cannot be found'
							})
						}
						else {
							page.posts.push(result.post._id);
							page.save();
							res.json({
								success: true,
								page: page,
								post: result
							})
						}
					})
				}
			})
		}

	})

	//Updates the post with any info that is different. Needs postId and pageId
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

	//Deletes a post in the page. Needs the postId and pageId
	.delete(function(req, res) {
		if(!req.body.pageId) {
			res.json({
				success: false,
				message: 'Page id required'
			})
		}
		else {
			postFunction.deletePost(req, function(result) {
				if(!result.success) {
					res.json({
						success: false,
						message: 'Page cannot be deleted'
					})
				}
				else {
					Page.findById(req.body.pageId, function(err, page) {
						if(err) {
							res.send(err);
						}
						if(!page) {
							res.json({
								success: false,
								message: 'Page cannot be found'
							})
						}

						var index = page.posts.indexOf(req.body.postId);
						if(index != -1) {
							page.posts.splice(index, 1);
							page.save();
						}

						res.json({
							success: true,
							page: page
						})
					})				
				}
			})
		}

	})


router.route('/posts/:pageId')

	// get all posts of a page
	.get(function(req,res) {
		if(!req.params.pageId) {
			res.json({
				success: false,
				message: 'Page id required'
			})
		}
		else {
			Page.findById(req.params.pageId, function(err, page) {
				if(err) {
					res.send(err);
				}
				else if(!page) {
					res.json({
						success: false,
						message: 'Page not found'
					})
				}
				else {
					var pagePostIds = page.posts;
					var postInfos = [];
					var counter = 0;

					if(pagePostIds.length == 0) {
						res.json({
							success: true,
							posts: postInfos
						})
					}
					else {
						for(var i = 0; i < pagePostIds.length; i++) {
							var postId = pagePostIds[i];
							Post.findById(postId, function(err, post) {
								if(err) {
									res.send(err);
								}
								else if(!post) {
									res.json({
										success: false,
										message: 'Post does not exist'
									})
								}
								else {
									var userId = post.userId;
									User.findById(userId, function(err, user) {
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
											var postInfo = {'post': post, 'displayName': user.displayName}
											postInfos.unshift(postInfo);
											counter++;
											if(counter == pagePostIds.length) {
												res.json({
													success: true,
													posts: postInfos
												})
											}

										}	
									})
								}
							})
						}						
					}

				}
			})		
		}
	})


router.route('/post/:postId')

	// gets a particular post of a page
	.get(function(req,res) {
		if(!req.params.postId) {
			res.json({
				successs: false,
				message: 'Post id required'
			})
		}
		else {
			Post.findById(req.params.postId, function(err, post) {
				if(err) {
					res.send(err);
				}
				else if(!post) {
					res.json({
						successs: false,
						message: 'Post not found'
					})
				}
				else {
					res.json({
	 					success: true,
	 					posts: post
	 				})
				}
			})
		}

	})

router.route('/userPages/:userId')

	// gets the pages a user is associated with the userId passed in
	.get(function(req,res) {
		if(!req.params.userId) {
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
					Page.find({'_id': {$in: user.adminPages}}, function(err, adminPages) {
						if(err) {
							res.send(err);
						}
						else {
							Page.find({'_id': {$in: user.memberPages}}, function(err, memberPages) {
								if(err) {
									res.send(err);
								}
								else {
									res.json({
										success: true,
										admin: adminPages,
										member: memberPages
									})
								}
							})
						}
					})				
				}
			})			
		}

	})


router.route('/admin/:pageId/:userId')

	// check if user is admin
	.get(function(req,res) {
		if(!req.params.pageId) {
			res.json({
				success: false,
				message: 'Page id required'
			})
		}
		else if(!req.params.userId) {
			res.json({
				success: false,
				message: 'User id required'
			})
		}
		else {
			Page.findById(req.params.pageId, function(err, page) {
				if (err) {
					res.send(err);
				}
				else if(!page) {
					res.json({
						succes: false,
						message: 'Page not found'
					})
				}
				else {
					if (page.admins.indexOf(req.params.userId) > -1) {
						res.json({
							success: true,
							admin: true
						})
					}
					else {
						res.json({
							success: true,
							admin: false
						})
					}
				}
			})			
		}
	})


router.route('/follow')

	// adds user to follow a page
	.post(function(req, res) {
		if(!req.body.userId) {
			res.json({
				success: false,
				message: 'User id required'
			})
		}
		else if(!req.body.pageId) {
			res.json({
				success: false,
				message: 'Page id not required'
			})
		}
		else {
			User.findById(req.body.userId, function(err, user) {
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
					Page.findById(req.body.pageId, function(err, page) {
						if(err) {
							res.send(err);
						}
						else if(!page) {
							res.json({
								success: false,
								message: 'Page not found'
							})
						}
						else {
							user.memberPages.push(req.body.pageId);
							user.save();

							page.followers = page.followers + 1;
							page.save();

							res.json({
								success: true,
								message: 'User successfully following page'
							})
						}
					})
				}
			})			
		}
	})


router.route('/follow/:pageId/:userId')

	// check if user is following a page
	.get(function(req, res) {
		if(!req.params.userId) {
			res.json({
				success: false,
				message: 'User id required'
			})
		}
		else if(!req.params.pageId) {
			res.json({
				success: false,
				message: 'Page id required'
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
					Page.findById(req.params.pageId, function(err, page) {
						if(err) {
							res.send(err);
						}
						else if(!page) {
							res.json({
								success: false,
								message: 'Page not found'
							})
						}
						else {
							var pageIndex = user.memberPages.indexOf(req.params.pageId);
							if (pageIndex > -1) {
								res.json({
									success: true,
									following: true,
								})
							}
							else {
								res.json({
									success: true,
									following: false
								})
							}						
						}
					})
				}
			})			
		}
	})


router.route('/unfollow')

	// unfollow a page
	.post(function(req, res) {
		if(!req.body.userId) {
			res.json({
				success: false,
				message: 'User id required'
			})
		}
		else if(!req.body.pageId) {
			res.json({
				success: false,
				message: "Page id required"
			})
		}
		else {
			User.findById(req.body.userId, function(err, user) {
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
					Page.findById(req.body.pageId, function(err, page) {
						if(err) {
							res.send(err);
						}
						else if (!page){
							res.json({
								success: false,
								message: 'Page not found'
							})
						}
						else {
							page.followers = page.followers - 1;
							page.save();

							var pageIndex = user.memberPages.indexOf(req.body.pageId);
							if (pageIndex > -1) {
	    						user.memberPages.splice(pageIndex, 1);
							}			
							user.save();

							res.json({
								success: true,
								user: user
							})
						}
					})
				}
			})			
		}
	})

router.route('/photo')

	.post(function(req, res) {

		var file = req.files.file;
		var fields = req.body;

		if (!file) {return imagePaths;}
	    var name = file.name;
	    var filepath = config.imageUploadPath + 'page/' + fields.pageId;
	    var destPath = filepath + '/' + name;
	    var imagePath = "/page/photo/image?imgPath=" + destPath;
	    fs.exists(filepath, (exists) => {
		    mkdirp(filepath, function (err) {
		        if (err) console.error(err)
		        var is = fs.createReadStream(file.path);
		        var os = fs.createWriteStream(destPath);
		        is.pipe(os);
		        var imgPath = path.join(__dirname, '../../', destPath); 
		        Page.findById(fields.pageId, function(err, page) {
					if(err) res.send(err);
					else {
						page.photo = imgPath;
						page.save(function(err) {
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

router.route('/photo/:pageId')

	.get(function(req, res) {

		Page.findById(req.params.pageId, function(err, page) {
			if(err) res.send(err);
			else {
				if (page.photo) {
					var imgPath = page.photo;
					res.sendFile(imgPath);
				}
				else {
					res.status(202);
					res.send("no photo for this page");
				};
			};
		});
	})


module.exports = router;