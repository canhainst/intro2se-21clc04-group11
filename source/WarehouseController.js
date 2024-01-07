const express = require('express');
const router = express.Router();
const WarehouseModel = require('../models/WarehouseModel');

router.get('/all', async (req, res, next) => {
    try {

      const { search, filter, sort } = req.query;
  

      const Warehouse = await WarehouseModel.getAllProduct({ search, filter, sort });
  
      res.json(Warehouse);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.put('/exportProduct', async (req, res, next) => {
    try {

      const { productID } = req.query;
  

      const Warehouse = await WarehouseModel.exportProduct(productID);
  
      res.json(Warehouse);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  router.delete('/deleteProduct', async (req, res, next) => {
    try {
      const { productID } = req.query;
      const result = await WarehouseModel.deleteProduct(productID);
  
      if (result.success) {
        res.json({ success: true, message: 'Product deleted successfully' });
      } else {
        res.status(400).json({ success: false, message: 'Failed to delete product' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  


  router.put('/export/:ProductID', async (req, res) => {
    try {
        const ProductID = req.params.ProductID;
        console.log('ProductID:', ProductID);
        const newStatus = 'Active';
  
        const rowsAffected = await WarehouseModel.exportProduct(ProductID, newStatus);
  
        if (rowsAffected > 0) {
            res.status(200).json({ success: true, message: 'Product marked as export successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found or could not be export.' });
        }
    } catch (error) {
        console.error('Error in /complete:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

router.delete('/delete/:ProductID', async (req, res) => {
    try {
        const ProductID = req.params.ProductID;

        // Sử dụng hàm deleteProduct trong WarehouseModel
        const rowsAffected = await WarehouseModel.deleteProduct(ProductID);

        if (rowsAffected > 0) {
            res.status(200).json({ success: true, message: 'Product deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found or could not be deleted.' });
        }
    } catch (error) {
        console.error('Error in DELETE /products:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});



module.exports = router;
