const Product = require('../models/product.model');

const path = require('path');
const { __express } = require('hbs');



//search_products
const get_product = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.send(err)
        }
        res.render('product_view', {
            name: userLogged,
            product: product
        });
    });
}

//save_products
const add_product = (req, res) => {
    var date = new Date(Date.now())
    var created_at = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' :: ' + date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds();
    var updated_at = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' :: ' + date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds();
    let productToCreate = new Product({
        product_number: req.body.product_number,
        product_name: req.body.product_name,
        brand: req.body.brand,
        price: req.body.price,
        qty: req.body.qty,
        img: req.body.img,
        created_at: created_at,
        updated_at: updated_at,
        created_by: req.body.created_by
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
    var date = new Date(Date.now())
    var updated_at = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' :: ' + date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds();

    let infoTOUpdate = req.body;
    infoTOUpdate.updated_at = updated_at;

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
    get_product,
    add_product,
    update_product,
    delete_product
}