var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');


module.exports = function(app) {
	// Register
	app.get('/register', function(req, res){
		res.render('register');
	});

	// Login
	app.get('/login', function(req, res){
		res.render('login');
	});

	// Register User
	app.post('/register', function(req, res){
		var name = req.body.name;
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;


		// Validation
		req.checkBody('name', 'Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
		req.checkBody('password', 'Password must be at least 6 characters').isLength({min: 6});


		var errors = req.validationErrors();

		if(errors) {
			res.render('register',{
				errors: errors
			});
		} else {

			User.find({email: email}, function(err, doc) {
				if (err) {
					console.log(err) 
				} else if (doc.length > 0) {
					// console.log(doc)
					req.flash('error_msg', 'Email already exists');
					res.redirect('/register');
				} else {
					// console.log(doc)
					var newUser = new User({
						name: name,
						email:email,
						username: username,
						password: password
					});

					User.createUser(newUser, function(err, user){
						if(err) throw err;
						console.log(user);
					});

					req.flash('success_msg', 'You are registered and can now login');

					res.redirect('/login');

				}
			})
		}
	});

	passport.use(new LocalStrategy(
	  function(username, password, done) {
	   User.getUserByUsername(username, function(err, user){
	   	if(err) throw err;
	   	if(!user){
	   		return done(null, false, {message: 'Unknown User'});
	   	}

	   	User.comparePassword(password, user.password, function(err, isMatch){
	   		if(err) throw err;
	   		if(isMatch){
	   			return done(null, user);
	   		} else {
	   			return done(null, false, {message: 'Invalid password'});
	   		}
	   	});
	   });
	  }));

	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.getUserById(id, function(err, user) {
	    done(err, user);
	  });
	});

	app.post('/login',
	  passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/login',failureFlash: true}),
	  function(req, res) {
	    res.redirect('/dashboard');
	  });

	app.get('/logout', function(req, res){
		req.logout();

		req.flash('success_msg', 'You are logged out');

		res.redirect('/login');
	});

};