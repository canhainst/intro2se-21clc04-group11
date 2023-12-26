const sql = require("mssql");
const config = require("../dbconfig");
const tbName = "Products";

sql.on("error", (err) => {
  throw err;
});

module.exports = class Product {
  constructor(
    ProductName,
    Author,
    Descrip,
    Photo,
    CatID,
    PublishingCompany,
    PublishingYear,
    Quantity,
    PriceIn,
    PriceOut,
    CreateTime,
    Status
  ) {
    this.ProductName = ProductName;
    this.Author = Author;
    this.Descrip = Descrip;
    this.Photo = Photo;
    this.CatID = CatID;
    this.PublishingCompany = PublishingCompany;
    this.PublishingYear = PublishingYear;
    this.Quantity = Quantity;
    this.PriceIn = PriceIn;
    this.PriceOut = PriceOut;
    this.CreateTime = CreateTime;
    this.Status = Status;
  }
  static async getActiveBooks(Quantity) {
    try {
      let pool = await sql.connect(config);
      let rs = await pool.query(
        `SELECT TOP ${Quantity} * FROM products WHERE Status = 'active'`
      );
      // console.log(rs);
      await sql.close();
      return rs.recordset;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }
  static async getNewReleaseBooks(Quantity) {
    try {
      let pool = await sql.connect(config);
      let rs = await pool.query(
        `SELECT TOP ${Quantity} * FROM products ORDER BY PublishingYear DESC`
      );
      // console.log(rs);
      await sql.close();
      return rs.recordset;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }
  static async getFeaturedBook() {
    try {
      let pool = await sql.connect(config);
      let rs =
        await pool.query(`
          SELECT TOP 1 p.ProductID, p.ProductName, p.Descrip, p.Photo, SUM(od.Quantity) AS TotalQuantity
          FROM products p
          JOIN orderDetails od ON p.ProductID = od.ProductID
          GROUP BY p.ProductID, p.ProductName, p.Descrip, p.Photo
          ORDER BY TotalQuantity DESC
      `);
      //  console.log(rs);
      await sql.close();
      return rs.recordset[0];
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }
  static async getDeactiveBooks(Quantity) {
    try {
      let pool = await sql.connect(config);
      let rs = await pool.query(
        `SELECT TOP ${Quantity} * FROM products WHERE Status = 'Deactive'`
      );
      // console.log(rs);
      await sql.close();
      return rs.recordset;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }
  static async getStars(id) {
    try {
      let pool = await sql.connect(config);
      let rs = await pool.query(
        `SELECT ProductID, AVG(Rating) AS Rating
        FROM productFeedbacks
        WHERE ProductID = ${id}
        GROUP BY ProductID
        `
      );
        // console.log('rs: ',rs.recordset[0]);
      await sql.close();
      return (typeof rs.recordset[0] == 'undefined' ? 0 : Math.ceil(rs.recordset[0].Rating));
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }  

  static async getBook(ID) {
    try {
      let pool = await sql.connect(config);
      let rs = await pool.query(
        `SELECT * FROM products WHERE ProductID = ${ID}`
      );
      // console.log(rs);
      await sql.close();
      return rs.recordset[0];
    } catch (err) {
      console.error("Error:", 0);
      throw err;
    }
  }

  static async getQuantity(ProductID){
    try{
        let pool = await sql.connect(config);
        let rs = await pool.query(
            `SELECT c.Quantity FROM products c WHERE c.ProductID = ${ProductID}`
        );
        await sql.close();
        return rs.recordset[0];
    } catch (err) {
        console.error("Error:", 0);
        throw err;
    }
  }
};