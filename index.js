/* 
 author : pedanarayana4@gmail.com
 */

const express = require('express');
const bodyParser = require('body-parser'); //Url content parsing
const cluster = require('cluster');
var mariadb = require('mariadb');

global.__base = __filename;
global.__v4root = __dirname;
process.env.port = 3000;
const api = express();
process.setMaxListeners(0);
(async () => {
    var pool = await mariadb.createPool({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "user"
    });



//    dbCon=dbCon.connect()
//    console.log("dbCon ",dbCon)
    if (cluster.isMaster) {
        var numWorkers = require('os').cpus().length;
        for (var i = 0; i < numWorkers; i++) {
            cluster.fork(); //creating child process
        }

        cluster.on('exit', function (worker, code, signal) {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });
    } else {
        api.use(bodyParser.urlencoded({
            extended: true,
            limit: '50mb',
            parameterLimit: 50000
        }));
        api.use(bodyParser.json({limit: '50mb'}));
        api.use(express.static('public'));
        api.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            return next();
        });

        module.exports.pool = pool;

        var usersRouter = require('./user.routes.js');

        api.use('/user/', usersRouter);

        api.listen(process.env.port, function (err, succ) {
            console.log("Magic Happends on 3000 port  ")
        })
    }
})()