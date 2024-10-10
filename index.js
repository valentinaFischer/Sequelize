const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
    }),
);

app.use(express.json());

//ROUTES

app.get("/", (req, res) => {
    res.render('home');
});

// CONECTION
app.listen(3000);