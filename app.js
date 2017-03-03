var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()

app.set('views engine', 'pug')
app.use('static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


app.listen(3000, function() {
    console.log("Running at PORT 3000")
})