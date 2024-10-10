const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');

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

app.get('/users/create', (req, res) => {
    res.render('add_user');
});

app.post('/users/create', async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on') { // Pois vem como 'on' se estiver marcada
        newsletter = true;
    } else {
        newsletter = false; // Opcional
    }

    await User.create({name, occupation, newsletter});

    res.redirect('/');
});

// CONECTION
conn.sync().then(() => {
    app.listen(3000);
}).catch((err) => {console.log(err)});