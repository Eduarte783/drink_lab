const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");

// GET /drinks - return a page with favorited drinks
router.get('/', (req, res) => {
  const allFaves = db.drinks.findAll()
  // TODO: Get all records from the DB and render to view
  res.render('/drink/index', {allFaves}) 
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  await db.drink.create({
    name: req.body.name
  })
  // TODO: Get form data and add a new record to DB
  res.redirect('/drink')
});

router.get('/:id', (req, res) => {
  console.log(req.params.name)
  axios.get(`http://www.thecocktaildb.com/api/json/v1/1/random.php'${req.params.name}`)
    .then(response =>{
      res.render('drink/show.ejs', {
        name: response.data.strDrink,
        stats: response.data.stats,
        abilities: response.data.abilities,
        moves: response.data.moves,
        img_url: response.data.sprites.front_default 
      })
    })

  })

module.exports = router;