const sql = require('mssql');
const config = require('../dbconfig');


class WarehouseModel {

static async getAllProduct({ search, filter, sort }) {
    try {
    await sql.connect(config);
      let query = 'SELECT * FROM products';
  
      // Thêm điều kiện tìm kiếm nếu có
      if (search) {
        query += ` WHERE ProductName LIKE '%${search}%' OR Author LIKE '%${search}%'`;
      }
  
      // Thêm điều kiện lọc nếu có
      if (filter) {
        query += ` AND Category = '${filter}'`;
      }
  
      // Thêm điều kiện sắp xếp nếu có
      if (sort) {
        query += ` ORDER BY ${sort}`;
      }
  
      const result = await sql.query(query);
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await sql.close();
    }
  }
  
  
static async exportProduct(ProductID) {
    try {
        await sql.connect(config);


        const result = await sql.query`UPDATE products SET Status = 'Active' WHERE ProductID = ${ProductID}`;
        return result.rowsAffected;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await sql.close();
    }
}
static async deleteProduct(ProductID) {
    try {
        await sql.connect(config);

        const result = await sql.query`DELETE FROM products WHERE ProductID = ${ProductID}`;
        return result.rowsAffected;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await sql.close();
    }
}


  
}

module.exports = WarehouseModel;
