const expressRephrased = require('express');

const mongooseRephrased = require('mongoose');

const authRoutesRephrased = require('./routes/authRoutes');

const cookieParserRephrased = require('cookie-parser');

const { requireAuthRephrased, checkUserRephrased } = require('./middleware/authMiddleware');


const appRephrased = expressRephrased();


// middleware

appRephrased.use(expressRephrased.static('public'));

appRephrased.use(expressRephrased.json());

appRephrased.use(cookieParserRephrased());


// view engine

appRephrased.set('view engine', 'ejs');


// database connection

const dbURIRephrased = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';

mongooseRephrased.connect(dbURIRephrased, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

.then((result) => appRephrased.listen(3000))

.catch((err) => console.log(err));


// routes

appRephrased.get('*', checkUserRephrased);

appRephrased.get('/', (req, res) => res.render('home'));

appRephrased.get('/smoothies', requireAuthRephrased, (req, res) => res.render('smoothies'));

appRephrased.use(authRoutesRephrased);
