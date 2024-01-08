require('dotenv').config();
const express = require('express');
const {create} = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;
const CustomError = require('./modules/customerr');
const secret = 'mysecretkey';

const hbs = create({
    extname: '.hbs',
    helpers: {
        add: (v1, v2) => (v1 + v2),
        sub: (v1, v2) => (v1 - v2),
        multi: (v1, v2) => (v1 * v2),
        div: (v1, v2) => (v1 / v2),
        eq: (v1, v2) => (v1 == v2),
        in: (x, v1, v2) => (x >= v1 && x <= v2),
        generateArr: (v) => Array.from({ length: v }, (_, index) => index), //sinh mảng 0 -> v-1
        generateArr1: (v, v2) => Array.from({ length: v }, (_, index) => {index, v2}),
    }
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use('/image', express.static('./image'));
app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cookieParser(secret));
app.use(express.urlencoded({extended: true}));
app.use(flash());
require('./modules/passport')(app);

app.use('/admin',require('./routes_controller/admin-r'));
app.use('/', require('./routes_controller/index-r'));
app.use('/account', require('./routes_controller/account-r'));
app.use('/products', require('./routes_controller/products-r'));
app.use('/Cart', require('./routes_controller/cart-r'));
app.use('/book', require('./routes_controller/book-r'));
app.use('/mypurchase', require('./routes_controller/mypurchase-r.js'));
app.use('/admin/warehouse', require('./routes_controller/admin-warehouse-r'));
app.use('/order', require('./routes_controller/order-r'));
app.use('/warehouse', require('./routes_controller/warehouse-r'));
app.use('/chat', require('./routes_controller/chatbox-r'));


app.get('favorite.ico', (req, res) => {
    res.status(404).send();
});

app.use(function ( req, res, next) {
    res.status(404).render('error', {
        code: 404,
        msg: 'Page not found.',
        description: "The page you're looking for doesn't exist."
    });
});

app.use(function (err, req, res, next) { 
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    res.status(statusCode).render('error', { 
        layout: null,
        code: statusCode,
        msg: 'Server error',
        description: err.message
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));