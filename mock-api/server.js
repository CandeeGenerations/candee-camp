var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes.js')

var app = express()
var port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

routes(app)

app.listen(port)

console.log('Started on port ' + port)
