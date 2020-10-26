const Product = require('../models/product.model');

const path = require('path');
const { __express } = require('hbs');


//call dashboard
const call_dashboard = (req, res) => {
    res.render('dashboard');
}

//call stock 
const call_stock = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.send(err)
        }
        res.render('stock', { products: products });
    })
}

//call sales 
const call_sales = (req, res) => {
    res.render('sales');
}

//call users 
const call_users = (req, res) => {
    res.render('users');
}

//call users 
const login = (req, res) => {
    res.render('login');
}



//call add_form
const call_form = (req, res) => {
    res.render('product_form', {
        title: "Add Product",
        buttonTitle: "Save",
        buttonColor: "btn-primary",
        method: "post",
        action: "/product"
    })
}



module.exports = {
    call_dashboard,
    call_form,
    call_stock,
    call_sales,
    call_users,
    login
}