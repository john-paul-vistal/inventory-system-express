const express = require('express');

const Router = express.Router();

const productController = require('../controllers/productCotroller');
const viewsController = require('../controllers/viewsController');




// PRODUCT ROUTES

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





//VIEWS ROUTES

//call add form
Router.get('/add-product', viewsController.call_form);

//call dashboard
Router.get('/dashboard', viewsController.call_dashboard);

//call stock
Router.get('/stocks', viewsController.call_stock);

//call stock
Router.get('/sales', viewsController.call_sales);

//call users
Router.get('/users', viewsController.call_users);

//call users
Router.get('/', viewsController.login);




module.exports = Router;