const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'livemusic'
});

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET POST DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res)=> {
    console.log('home requested');
   db.query('SELECT * FROM v_concerts', (err, data)=> {
       console.log('query');
       if(err){
           res.status(500).json(err);
       } else {
           res.json(data);
       }
   });
});

app.get('/bands', (req, res)=> {
    db.query('SELECT * FROM bands', (err, data)=> {
        if(err){
            res.status(500).json(err);
        } else {
            res.json(data);
        }
    });
});

app.get('/locations', (req, res)=> {
    db.query('SELECT * FROM locations', (err, data)=> {
        if(err){
            res.status(500).json(err);
        } else {
            res.json(data);
        }
    });
});

app.post('/concert/new', (req, res)=> {
    db.query('INSERT INTO concerts SET ?', req.body, (err, data)=> {
        if(err){
            res.status(500).json(err);
        } else {
            res.json(data);
        }
    });
});


app.listen(3000, ()=> console.log('app started'));






