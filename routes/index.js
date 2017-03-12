var express = require('express')
var path = require('path')
var fs = require('fs')
var route = express.Router()

route.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/../public/html/index.html"))
})

route.post("/", function(req, res) {
    var name = req.body.name
    var time = Math.floor(req.body.timeuse / 60) + ":" + req.body.timeuse % 60 + " min"
    fs.readFile(path.resolve(__dirname + "/../public/data/ranking.json"), "utf-8", function(err, data) {
        var json = JSON.parse(data)
        if (req.body.level == "easy") {
            json.easy.push({
                name: name,
                time: time
            })
        } else if (req.body.level == "medium") {
            json.medium.push({
                name: name,
                time: time
            })
        } else {
            json.hard.push({
                name: name,
                time: time
            })
        }
        var nj = JSON.stringify(json)
        fs.writeFile(path.resolve(__dirname + "/../public/data/ranking.json"), nj, 'utf8', function(err, data) {
            res.sendFile(path.resolve(__dirname + "/../public/html/index.html"))
        })
    })
})

route.post("/menu", function(req, res) {
    if (req.body.mode == "play")
        res.sendFile(path.resolve(__dirname + "/../public/html/level.html"))
    else if (req.body.mode == "ranking") {
        fs.readFile(path.resolve(__dirname + "/../public/data/ranking.json"), "utf-8", function(err, data) {
            var json = JSON.parse(data)
            res.render("ranking.pug", { data: json })
        })
    } else
        res.sendFile(path.resolve(__dirname + "/../public/html/howto.html"))
})

route.all('*', function(req, res) {
    res.sendFile(path.resolve(__dirname + "/../public/html/index.html"))
})

module.exports = route