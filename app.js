var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var app = express()
var index = require('./routes/index')
var morgan = require('morgan')


app.set('views engine', 'pug')
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use('/', index)

app.listen(3000, function() {
    console.log("Running at PORT 3000")
})