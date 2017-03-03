var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var app = express()

app.set('views engine', 'pug')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/html/index.html")
})

app.post("/menu", function(req, res) {
    if (req.body.mode == "play")
        res.sendFile(__dirname + "/public/html/level.html")
    else if (req.body.mode == "ranking") {
        fs.readFile(__dirname + "/public/data/ranking.json", "utf-8", function(err, data) {
            var json = JSON.parse(data)
            console.log(json)
            res.render("ranking.pug", { data: json })
        })
    } else
        res.sendFile(__dirname + "/public/html/howto.html")
})

app.post("/play", function(req, res) {

})

app.listen(3000, function() {
    console.log("Running at PORT 3000")
})