require('dotenv').config();
const express = require('express');
const {create} = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;
const CustomError = require('./modules/customerr');

const hbs = create({
    extname: '.hbs',
    helpers: {
        add: (v1, v2) => (v1 + v2),
        eq: (v1, v2) => (v1 == v2)
    }
})


app.use('/image', express.static('./image'));
app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/', require('./routes_controller/index-r'));
app.use('/account', require('./routes_controller/account-r'));

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