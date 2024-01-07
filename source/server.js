require('dotenv').config();
const express = require('express');
const {create} = require('express-handlebars');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const app = express();
const port = process.env.PORT || 5000;
const CustomError = require('./modules/customerr');


const hbs = create({
    extname: '.hbs',
    helpers: {
        add: (v1, v2) => (v1 + v2),
        eq: (v1, v2) => (v1 == v2)
    }
})

app.use(function (req, res, next) {
    console.log("Request received:", req.method, req.url);
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/image', express.static('./image'));
app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/', require('./routes_controller/index-r'));
app.use('/order', require('./routes_controller/order-r'));
app.use('/login', require('./routes_controller/login-r'));
app.use('/warehouse', require('./routes_controller/warehouse-r'));
app.use('/chat', require('./routes_controller/chatbox-r'));


app.get('/favicon.ico', (req, res) => {
    res.status(404).send();
});

app.use(function (req, res, next) {
    console.log("Middleware is working!");
    next();
});





app.use(function (err, req, res, next) {
    try {
      const statusCode = err instanceof CustomError ? err.statusCode : 500;
      res.status(statusCode).render('error', { 
          layout: null,
          code: statusCode,
          msg: 'Server error',
          description: err.message
      });
    } catch (error) {
      console.error('Error in error handling middleware:', error);
      res.status(500).render('error', { 
          layout: null,
          code: 500,
          msg: 'Server error',
          description: 'An internal server error occurred.'
      });
    }

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
      });
  });

app.listen(port, () => console.log(` app listening on port ${port}!`));