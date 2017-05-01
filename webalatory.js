/**
 * Created by McPander on 18.03.2017.
 */
var path = require('path');
var express = require('express');

var app = express();
app.use('/hair', express.static(__dirname + '/hair'));
app.get('/', function (req, res) {
    res.send('Hello Webalatory!it works!!');
});

app.get('/hair', function (req, res) {
    res.sendFile('/hair/index.html', {root: __dirname });
});

app.listen(process.env.PORT || 80, function () {
    console.log('Webalatory on port '+(process.env.PORT || 80));
});