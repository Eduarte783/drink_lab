

const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const db = require("../models");
const { user } = require("pg/lib/defaults");

// GET /drinks - return a page with favorited drinks
router.get('/favorites', async (req, res) => {
	const allFaves = await db.drinks.findAll()
	//where: { userId: user.id}
	// TODO: Get all records from the DB and render to view
	res.render('faves/favorites.ejs', {allFaves}) 
  });
  
  // POST /Drink- receive the name of drink and add it to the database
  router.post('/favorites', async (req, res) => {
    if (!res.locals.user) {
		res.render("users/login", { msg: "log in" });
		return
	  }
	  try {
		  const user = await db.user.findByPk(res.locals.user.dataValues.id)
		  const [drink, created] = await db.drink.findOrCreate({
			  where: {
				name: response.data.strDrink,
			  }, defaults: {
				type: response.data.strCategory,
				img_url: response.data.strDrinkThumb,
  
			  }
		  })
		  await user.addDrink(drink)
		  const allFaves = await db.drinks.findAll()
		  res.render("faves/favorites", {allFaves})
	  } catch (error) {
		  console.log(error)
	  }
  })
	// TODO: Get form data and add a new record to DB
	//res.redirect('/faves/favorites')

  
  router.get('/:id', (req, res) => {
	console.log(req.params.name)
	axios.get(`http://www.thecocktaildb.com/api/json/v1/1/random.php'${req.params.name}`)
	  .then(response =>{
		res.render('faves/favorites.ejs', {
		  name: response.data.strDrink,
		  type: response.data.strCategory,
		  instructions: response.data.strInstructions,
		  img_url: response.data.strDrinkThumb, 
		})
	  })
  
	})

module.exports = router