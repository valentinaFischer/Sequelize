const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');
const Adress = require('./models/Adress');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
    }),
);

app.use(express.json());

//ROUTES

app.get("/", async (req, res) => {

    const users = await User.findAll({raw: true});
    console.log(users);
    res.render('home', {users: users});
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

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ raw: true, where: { id: id } });

    res.render('user_view', { user })
});

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id;

    await User.destroy({ where: { id: id } });

    res.redirect('/')
});

app.get('/user/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({ include: Adress, where: { id: id } });

        res.render('user_edit', { user: user.get({ plain: true }) }); /* Para podermos acessar os dados corretamente
        na view, pois agora não temos mais o raw */
    } catch (error) {
        console.log(error);
    }
});

app.post('/users/update', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, { raw: true, where: { id: id } });
    res.redirect('/');
});

app.post('/adress/create', async (req, res) => {
    const UserId = req.body.UserId; 
    const street = req.body.street; 
    const number = req.body.number; 
    const city = req.body.city; 

    const adress = {
        UserId,
        street,
        number,
        city
    }

    await Adress.create(adress);

    res.redirect(`/user/edit/${UserId}`);
});

app.post('/adress/delete', async (req, res) => {
    const id = req.body.id;
    const UserId = req.body.UserId;

    await Adress.destroy({ where: { id: id } });
    res.redirect(`/user/edit/${UserId}`)
});

// CONECTION
conn
.sync()
//.sync({force: true}) // Para deletar tabela e criar novamente
.then(() => {
    app.listen(3000);
}).catch((err) => {console.log(err)});