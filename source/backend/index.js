import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './routes/order-route.js';
import OrderDetailRoute from './routes/orderDetail-route.js';;
import cors from 'cors';

const app = express();

app.set('view engine', 'ejs');

// Cấu hình CORS
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Sử dụng các route

app.use('/api', orderRoutes);
app.use('/api', OrderDetailRoute);


// Middleware để xử lý Preflight Requests (OPTIONS)
app.options('*', cors(corsOptions));

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
