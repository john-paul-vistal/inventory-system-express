const Product = require('../models/product.model');

const path = require('path');
const { __express } = require('hbs');



//search_products
const get_product = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.send(err)
        }
        var cdate = new Date(product.created_at)
        var udate = new Date(product.updated_at)
        var created_at = cdate.getMonth() + 1 + '/' + cdate.getDate() + '/' + cdate.getFullYear() + '  ' + cdate.getHours() + ' : ' + cdate.getMinutes() + ' : ' + cdate.getSeconds();
        var updated_at = udate.getMonth() + 1 + '/' + udate.getDate() + '/' + udate.getFullYear() + '  ' + udate.getHours() + ' : ' + udate.getMinutes() + ' : ' + udate.getSeconds();
        res.render('product_view', {
            product: product,
            dateCreated: created_at,
            dateUpdated: updated_at
        });
    });
}

//save_products
const add_product = (req, res) => {

    let productToCreate = new Product({
        product_number: req.body.product_number,
        product_name: req.body.product_name,
        brand: req.body.brand,
        price: req.body.price,
        qty: req.body.qty,
        img: req.body.img,
        created_by: req.body.created_by
    });
    console.log(Date.now())
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
    get_product,
    add_product,
    update_product,
    delete_product
}