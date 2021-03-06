require('dotenv').config()
// required packages
const express = require('express')
const { use } = require("express/lib/application");
const rowdy = require('rowdy-logger')
const ejsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser')
const db = require('./models')
const cryptoJS = require('crypto-js')
const res = require("express/lib/response");
const bcrypt = require('bcryptjs')
const axios = require('axios')
const methodOverride = require('method-override')


// app config
const PORT = process.env.PORT || 3000
const app = express()
app.set('view engine', 'ejs')

// middlewares
const rowdyRes = rowdy.begin(app)
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(methodOverride("_method"))


// DIY middleware
// happens on every request
app.use((req, res, next) => {
  //  handy dandy debugging request logger
  console.log(`[${new Date().toLocaleString()}] incoming request: ${req.method} ${req.url}`)
  console.log('request body:', req.body)
  // modify the response to give data to the routes/middleware that is 'downstream'
  res.locals.myData = 'hi, I came from a middleware!'
  // tell express that the middleware is done
  next()
})

// auth middleware
app.use(async (req, res, next) => {
  try {
    // if there is a cookie -- 
    if (req.cookies.userId) {
      // try to find that user in the db
      const userId = req.cookies.userId
      const decryptedId = cryptoJS.AES.decrypt(userId, process.env.ENC_KEY).toString(cryptoJS.enc.Utf8)
      const user = await db.user.findByPk(decryptedId)
      // mount the found user on the res.locals so that later routes can access the logged in user
      // any value on the res.locals is availible to the layout.ejs
      res.locals.user = user
    } else {
      // the user is explicitly not logged in
      res.locals.user = null
    }
   
  } catch (err) {
    console.log(err);
  } finally {
    next()
  }
})

// Homepage route
app.get('/', (req, res) => {
  // console.log(res.locals)
  res.render('index', { msg: null })
})

// controllers
app.use('/users', require('./controllers/users'))
app.use('/drink', require('./controllers/drink'))
app.use('/faves', require('./controllers/faves'))


// 404 error handler LAST
// app.get('/*', (req, res)=>{
//   // render your 404 here
// })
/*app.use((req, res, next)=>{
  // render a 404 template
  res.status(404).render('404.ejs')
})*/

// 500 error
// needs to have all 4 params
app.use((error, req, res, next)=>{
  // log the error
  console.log(error)
  // send a 500 error template
  res.status(500).render('500.ejs')
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  rowdyRes.print()
})
