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
      let rs = await pool.query(`select top ${Quantity} * from products where Status = 'active'`);
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
      let rs = await pool.query(`SELECT TOP ${Quantity} * FROM products ORDER BY PublishingYear DESC`);
      // console.log(rs);
      await sql.close();
      return rs.recordset;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }
  
};
