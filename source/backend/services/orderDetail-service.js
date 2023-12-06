
// import config from '../dbconfig';
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
  
    async OrderByID(id) {
    try {
      let pool = await sql.connect(config)
      let result = await pool.request().input('OrderID', sql.VarChar, id)
      .query(`
          SELECT
              O.OrderID,
              U.Name AS BuyerName,
              U.Address AS BuyerAddress,
              O.Statuss,
              P.ProductName,
              PD.Price AS ProductPrice,
              OD.Quantity AS Quantity,
              O.TotalPrice
          FROM
              orders AS O
          JOIN
              USERS AS U ON O.BuyerID = U.UserID
          JOIN
              orderdetails AS OD ON O.OrderID = OD.OrderID
          JOIN
              products AS P ON OD.ProductID = P.ProductID
          JOIN
              productdetails AS PD ON OD.ProductID = PD.ProductID AND OD.SizeID = PD.SizeID AND OD.ColorID = PD.ColorID
          WHERE
              O.OrderID = @OrderID
      `);

        return result;
    } catch (error) {
        throw error;
    }
  },

}