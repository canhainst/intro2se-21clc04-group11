const sql = require("mssql");
const config = require("../dbconfig");
const tbName = "cartdetails";

sql.on("error", (err) => {
    throw err;
});

module.exports = class Cart{
    constructor(
        BuyerID,
        ProductID,
        Quantity
    ){
        this.BuyerID = BuyerID;
        this.ProductID = ProductID;
        this.Quantity = Quantity;
    }

    static async getCart(BuyerID){
        try{
            let pool = await sql.connect(config);
            let rs = await pool.query(
                `SELECT * FROM cartdetails WHERE BuyerID = ${BuyerID}`
            );
            await sql.close();
            return rs.recordset;
        } catch (err) {
            console.error("Error:", err);
            throw err;
        }
    }

    static async getCategory(CateID){
        try{
            let pool = await sql.connect(config);
            let rs = await pool.query(
                `SELECT c.CateName FROM category c WHERE CateID = ${CateID}`
            );
            await sql.close();
            return rs.recordset[0];
        } catch (err) {
            console.error("Error:", 0);
            throw err;
        }
    }

    static async UpdateData(CustomerID, ProductID, Quantity){
        try{
            let pool = await sql.connect(config);
            await pool.query(
                `UPDATE cartdetails SET Quantity = ${Quantity} WHERE BuyerID = ${CustomerID} AND ProductID = ${ProductID}`
            );
            await sql.close();
        } catch (err) {
            console.error("Error:", err);
            throw err;
        }
    }

    static async Delete(CustomerID, ProductID){
        try{
            let pool = await sql.connect(config);
            await pool.query(
                `DELETE FROM cartdetails WHERE BuyerID = ${CustomerID} AND ProductID = ${ProductID} `
            );
            await sql.close();
        } catch (err) {
            console.error("Error:", err);
            throw err;
        }
    }
}