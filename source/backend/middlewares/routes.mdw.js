

import authWithRequiredPermission from "./auth.mdw.js";
import OrderRoute from '../routes/order-route.route';

export default function (app) {
  app.get('/', function (req, res) {
    res.render('Dashboard')
  })



  app.use('/Order', OrderRoute)



}