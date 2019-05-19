
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("port is runninng")

});
//kapum em classner@
var Grass = require("./modules/grass.js")
var GrassEater = require("./modules/grasseater.js")
var Predator = require("./modules/predator.js")
var Xotaqayl = require("./modules/xotaqayl.js")
var XotaqaylEater = require("./modules/xotaqayleater.js")

//haytararum em arrayner
grassArr = [];
geArr = [];
predatorArr = [];
xotaqaylArr = [];
xotaqaylEaterArr = [];


//stexcum en zangvacic patahakan andam tvox function
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

//Matrix stexum em
var w = 100
var h =100

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 40) r = 1;
            else if (r < 65) r = 2;
            else if (r < 75) r = 3;
            else if (r < 85) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}
//haytararum em matrix popoxakan@ vor kanchi genmatrix funcian
matrix = genMatrix(w,h)
//pttvelov matrix-i vrayov stexcum enq objectner
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
        }
        else if (matrix[y][x] == 2) {
            geArr.push(new GrassEater(x, y, 2));
        }
        else if (matrix[y][x] == 3) {
            predatorArr.push(new Predator(x, y, 3));
        }
        else if (matrix[y][x] == 4) {
            xotaqaylArr.push(new Xotaqayl(x, y, 4));
        }
        else if (matrix[y][x] == 5) {
            xotaqaylEaterArr.push(new XotaqaylEater(x, y, 5));
        }

    }
}

function drawserver() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in geArr) {
        geArr[i].move();
        geArr[i].eat();
        geArr[i].mul();
        geArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for (var i in xotaqaylArr) {
        xotaqaylArr[i].move();
        xotaqaylArr[i].eat();
        xotaqaylArr[i].mul();
        xotaqaylArr[i].die();
    }
    for (var i in xotaqaylEaterArr) {
        xotaqaylEaterArr[i].move();
        xotaqaylEaterArr[i].eat();
        xotaqaylEaterArr[i].mul();
        xotaqaylEaterArr[i].die();
    }
    //uxarkum em clentin
    io.sockets.emit("matrix", matrix)
}



//connectiona stexcum scriptic ekac infoi himan vra script.js i het mousePressed i jamanak
io.on('connection', function (socket) {

socket.on("Sxmvec", function (arr) {

});
});

//interval vor popoxivi 0.1 vrk mek
setInterval(drawserver, 100)
//setInterval(draw_weater,4000)

