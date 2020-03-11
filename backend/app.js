//importation de la bibliothèque Express
//qui gère le routage et propose un système de middlewares
const express = require('express');
//import de body-parser
//qui récupère les données postées (envoyées avec la méthode post)
//et les enregistre dans un objet body de l'objet request
const bodyParser = require('body-parser');
//import de la bibliothèque mysql
const mysql = require('mysql');

//création de la connexion au serveur de BD
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'livemusic'
});

//Création de l'application express
const app = express();

//Référencement du middleware body-parser
app.use(bodyParser.json());
//Récupération des données postées au format urlencoded
//pour le test avec Postman
app.use(bodyParser.urlencoded());

//Middleware de test pour démontrer le principe
//de l'nchaînement des middlewares
app.use((req, res, next) => {
    console.log(req.body);
    //Attention à ce qu'un middleware passe toujours
    //la main au suivant (next) ou définisse une réponse
    next();
});

// Ajout d'en-têtes à la requête pour autoriser le partage
// des informations entre des domaines différents CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET POST DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Définition des routes de l'application

//Factorisation de la gestion des réponses
//aux requêtes SQL
function handleQuery(err, res, data) {
    if (err) {
        //Réponse d'erreur
        res.status(500).json(err);
    } else {
        //Réponse de succès
        res.json(data);
    }
}

// Liste des concerts
app.get('/', (req, res) => {
    // Requête SQL sur la base de données
    db.query('SELECT * FROM v_concerts ORDER BY performance_date DESC',
        //callback de retour de la fonction query
        //avec deux arguments : l'erreur et les données
        (err, data) => {
            console.log('query');
            handleQuery(err, res, data);
        });
});

//Liste des groupes
app.get('/bands', (req, res) => {
    db.query('SELECT * FROM bands', (err, data) => {
        handleQuery(err, res, data);
    });
});

// Liste des lieux de concert
app.get('/locations', (req, res) => {
    db.query('SELECT * FROM locations', (err, data) => {
        handleQuery(err, res, data);
    });
});

//traitement des données envoyées par le frontend
//pour l'ajout d'un nouveau concert
app.post('/concert/new', (req, res) => {
    db.query(
        //La requête SQL
        'INSERT INTO concerts SET ?',
        //Un objet représentant les données
        req.body,
        //Le callback de l'éxécution de la fonction query
        (err, data) => {
            handleQuery(err, res, data);
        });
});


app.listen(3000, () => console.log('app started'));






