const express = require('express');

const Router = express.Router();

const productController = require('../controllers/productCotroller');






//get_products
Router.get('/products', productController.get_products);

//search_product
Router.get('/product/:id', productController.get_product);

//add_product
Router.post('/product', productController.add_product);

//update_product
Router.post('/product/:id', productController.update_product);

//delete_product 
Router.get('/product/delete/:id', productController.delete_product);

//call add form
Router.get('/add-product', productController.call_form);




module.exports = Router;