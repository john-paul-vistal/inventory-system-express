const Product = require('../models/product.model');

const path = require('path');
const { __express } = require('hbs');


//get_products
const get_products = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.send(err)
        }
        res.render('product', { products: products });
    })

}

//search_products
const get_product = (req, res) => {

    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.send(err)
        }
        res.render('product_view', {
            product: product,
            title: "Product Information",
            buttonTitle: "Update",
            buttonColor: "btn-warning",
            method: "put",
            action: "/product/{{product.id}}"
        });
    });

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

//save_products
const add_product = (req, res) => {

    let productToCreate = new Product({
        product_name: req.body.product_name,
        brand: req.body.brand,
        qty: req.body.qty
    });

    productToCreate.save((err, product) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/products')
    });
}

//update_products
const update_product = (req, res) => {

    let infoTOUpdate = req.body;

    Product.findByIdAndUpdate(req.body._id, infoTOUpdate, { new: true }, (err, updatedProduct) => {
        if (err) {
            res.send(err)
        }
        res.redirect('/products')
    });

}

//delete_products
const delete_product = (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err) {
            res.send(err)
        }
        res.redirect('/products')
    });
}



module.exports = {
    get_products,
    get_product,
    add_product,
    update_product,
    delete_product,
    call_form
}