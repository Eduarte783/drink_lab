// PROFILES PAGE //

const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const db = require("../models");
const axios = require("axios")


// GET Profiles Page
router.get('/profile', async (req, res) => {
	// check if user is authorized
	if (!res.locals.user) {
		// if the user is not authorized, ask them to log in
		res.render('users/login.ejs', { msg: 'please log in to continue' })
		return // end the route here
	}
  const user = res.locals.user;
  es.render('users/profile', {user: res.locals.user, drink: drinks})
	})

// API request
	router.get('/drink', (req, res) => {
		let drinksUrl = 'http://www.thecocktaildb.com/api/json/v1/1/random.php';
		  axios.get(drinksUrl).then(apiResponse => {
		  let drink = apiResponse.data.results;
		  res.render('drink/results.ejs', { drink: apiResponse.data.drinks })
		})
		.catch(err) 
		console.log(err)

	})


// GET // Create Edit page
router.get("/edit", (req, res) => {
	const user = res.locals.user;
	res.render("drink/edit", { user, msg: null });
  });
  
  // PUT // Edit Profile
  router.put("/edit", async (req, res) => {
	const user = res.locals.user;
	const input = req.body;
	try {
	  const foundUser = await db.user.findOne({
		where: { id: user.id },
	  });
  
	  const matchedUsers = await db.user.findAll({
		where: {
		  [Op.or]: [{ email: input.email }, { username: input.username }],
		  [Op.not]: [{ id: user.id }],
		},
	  });
  
	  if (matchedUsers.length === 0) {
		const hashedPass = bcrypt.hashSync(input.password, salts);
  
		await foundUser.set({
		  email: input.email,
		  username: input.username,
		  password: hashedPass,
		});
  
		await foundUser.save();
  
		res.redirect("/drink");
	  } else {
		res.render("drink/edit", {
		  msg: "Email or Username already belongs to another user, try again...",
		});
	  }
	} catch (err) {
	  console.warn(err);
	}
  });
  

module.exports = router