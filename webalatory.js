/**
 * Created by McPander on 18.03.2017.
 */
var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('Hello Webalatory!');
});

app.listen(80, function () {
    console.log('Webalatory on port 80!');
});