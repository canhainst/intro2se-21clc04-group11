
import sql from 'mssql'

var config = {
    server: "localhost",
    port : 1433,
    database: "book_house", 
    user: 'sa',
    password: "123",
    options: {
      enableArithAbort : true, 
      trustServerCertificate: true,
    },
    connectionTimeout: 150000, 
    pool: 
    { max : 10, min : 0, idleTimeoutMillis : 30000, },
    
  };
  

export default {
    async AllOrder() {
        let pool = await sql.connect(config)
        let result = await pool.request().query('SELECT u.UserName AS BuyerName, o.Statuss, o.CreateTime, o.OrderID, o.TotalPrice, o.BuyerID FROM orders o JOIN users u ON o.BuyerID = u.UserID')
        return result

    },

}