const express = require('express');

const Router = express.Router();

const productController = require('../controllers/productCotroller');
const viewsController = require('../controllers/viewsController');
const userController = require('../controllers/userController');
const salesController = require('../controllers/salesController');


// PRODUCT ROUTES

//get all product
Router.get('/getAllProducts', productController.get_all_products);

//search_product
Router.get('/product/:id', productController.get_product);

//add_product
Router.post('/product', productController.add_product);

//update_product
Router.post('/product/:id', productController.update_product);

//delete_product 
Router.get('/product/delete/:id', productController.delete_product);



// USERS ROUTES

//search_product
Router.get('/user/:id', userController.get_user);

//add_product
Router.post('/user', userController.add_user);

//update_product
Router.post('/user/:id', userController.update_user);

//delete_product 
Router.get('/user/delete/:id', userController.delete_user);





//VIEWS ROUTES

//call add form
Router.get('/add-product', viewsController.call_form);

//call dashboard
Router.get('/dashboard', viewsController.call_dashboard);

//call_products
Router.get('/products', viewsController.call_products);

//call stock
Router.get('/stocks', viewsController.call_stock);

//call stock
Router.get('/sales', viewsController.call_sales);

//call users
Router.get('/users', viewsController.call_users);

//call login
Router.get('/', viewsController.login);

//call logout
Router.get('/logout', viewsController.logout);

//call users
Router.post('/login', viewsController.verify_login);

//call users
Router.get('/add-user', viewsController.adduser_form);

//call pos
Router.get('/point-of-sale', viewsController.point_of_sale);


//POS routes
//get all sales
Router.get('/getAllSales', salesController.get_all_sales);

//add_sales
Router.post('/sales', salesController.add_sales);



module.exports = Router;