const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const db = require("../models");

// GET Profiles Page
router.get('/profile', (req, res) => {
	// check if user is authorized
	if (!res.locals.user) {
		// if the user is not authorized, ask them to log in
		res.render('users/login', { msg: 'please log in to continue' })
		return // end the route here
	}

	res.render('users/profile', { user: res.locals.user })
})

module.exports = router